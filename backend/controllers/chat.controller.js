import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import OpenAI from "openai";
import Tour from "../models/Tour.model.js";
import Artifact from "../models/Artifact.model.js";

// Initialize OpenAI only if API key is provided
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// System prompt for museum docent AI
const SYSTEM_PROMPT = `You are a knowledgeable and friendly museum docent assistant for DocentDesk Museum, specializing in ancient Egyptian artifacts and history. Your role is to:

1. Provide detailed, engaging information about Egyptian artifacts, their historical context, and cultural significance
2. Answer questions about the museum's collection, exhibitions, and events
3. Guide visitors through virtual tours with enthusiasm and expertise
4. Share fascinating stories and lesser-known facts about ancient Egypt
5. Be conversational, warm, and educational
6. If you don't know something specific about an artifact, provide general historical context
7. Encourage visitors to explore more artifacts and attend events
8. Keep responses concise but informative (2-3 paragraphs max)

Remember: You represent DocentDesk Museum and should maintain a professional yet approachable tone.`;

// @desc    Send message to AI chatbot
// @route   POST /api/chat/message
// @access  Private
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { message, tourId, artifactId, conversationHistory } = req.body;

  if (!message) {
    return next(new ErrorResponse("Please provide a message", 400));
  }

  // Check if OpenAI is configured
  if (!openai) {
    return next(
      new ErrorResponse(
        "AI chatbot is not configured. Please set OPENAI_API_KEY in environment variables.",
        503
      )
    );
  }

  try {
    // Build context from artifact if provided
    let contextInfo = "";
    if (artifactId) {
      const artifact = await Artifact.findById(artifactId);
      if (artifact) {
        contextInfo = `\n\nCurrent Artifact Context:
Title: ${artifact.title}
Description: ${artifact.description}
Category: ${artifact.category}
Era: ${artifact.era}
Origin: ${artifact.origin}
${
  artifact.yearDiscovered ? `Year Discovered: ${artifact.yearDiscovered}` : ""
}`;
      }
    }

    // Build messages array for OpenAI
    const messages = [
      {
        role: "system",
        content: SYSTEM_PROMPT + contextInfo,
      },
    ];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.slice(-10).forEach((msg) => {
        messages.push({
          role: msg.role || "user",
          content: msg.content,
        });
      });
    }

    // Add current message
    messages.push({
      role: "user",
      content: message,
    });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    const aiResponse = completion.choices[0].message.content;

    // Save chat message to tour if tourId provided
    if (tourId) {
      const tour = await Tour.findById(tourId);
      if (tour && tour.user.toString() === req.user.id) {
        tour.chatMessages.push({
          message,
          response: aiResponse,
          timestamp: Date.now(),
        });
        tour.interactionCount += 1;
        await tour.save();
      }
    }

    res.status(200).json({
      success: true,
      data: {
        message,
        response: aiResponse,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error.response?.status === 401) {
      return next(new ErrorResponse("OpenAI API key is invalid", 500));
    }

    if (error.response?.status === 429) {
      return next(
        new ErrorResponse(
          "OpenAI API rate limit exceeded. Please try again later.",
          429
        )
      );
    }

    return next(new ErrorResponse("Failed to get AI response", 500));
  }
});

// @desc    Get chat history for a tour
// @route   GET /api/chat/history/:tourId
// @access  Private
export const getChatHistory = asyncHandler(async (req, res, next) => {
  const { tourId } = req.params;

  const tour = await Tour.findById(tourId);

  if (!tour) {
    return next(new ErrorResponse("Tour not found", 404));
  }

  // Make sure user is tour owner
  if (tour.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse("Not authorized to access this chat history", 403)
    );
  }

  res.status(200).json({
    success: true,
    count: tour.chatMessages.length,
    data: tour.chatMessages,
  });
});

// @desc    Stream chat response (for voice/real-time chat)
// @route   POST /api/chat
// @access  Public
export const streamChat = asyncHandler(async (req, res, next) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return next(new ErrorResponse("Please provide messages array", 400));
  }

  // Use Lovable AI Gateway (same as Supabase function)
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;

  if (!LOVABLE_API_KEY) {
    return next(
      new ErrorResponse(
        "AI service is not configured. Please set LOVABLE_API_KEY in environment variables.",
        503
      )
    );
  }

  try {
    // Call Lovable AI Gateway
    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: messages,
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return next(
          new ErrorResponse(
            "Rate limit exceeded. Please try again in a moment.",
            429
          )
        );
      }
      if (response.status === 402) {
        return next(
          new ErrorResponse(
            "AI credits exhausted. Please add credits to continue.",
            402
          )
        );
      }

      return next(new ErrorResponse("Failed to get AI response", 500));
    }

    // Set streaming headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Stream the response
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      return next(new ErrorResponse("No response body", 500));
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error("Stream chat error:", error);
    return next(
      new ErrorResponse(
        error instanceof Error ? error.message : "Failed to stream chat",
        500
      )
    );
  }
});
