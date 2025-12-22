import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
};

const MUSEUM_CONTEXT = `
MUSEUM INFORMATION:
- Name: DocentDesk Virtual Museum
- Hours: Monday-Saturday 9 AM - 7 PM, Sunday 10 AM - 6 PM
- Admission: Adults $25, Students $15, Seniors $20, Family Pass $60
- Location: Multiple floors with different galleries
- Features: 3D Virtual Tours, QR Code Artifact Scanning, Multilingual Support

CURRENT EXHIBITS:
1. Ancient Egypt Exhibition - Featuring mummies, hieroglyphics, and golden treasures
2. Renaissance Masters Collection - Leonardo da Vinci, Michelangelo, and Raphael works
3. Greek Mythology Gallery - Gods, heroes, and legends through sculptures and pottery
4. Modern Art Section - Contemporary pieces and installations

FEATURED ARTIFACTS:
- Venus de Milo (Sculpture, 130-100 BC, Ancient Greece) - Iconic statue of Aphrodite
- Rosetta Stone (History, 196 BC, Ancient Egypt) - Key to deciphering hieroglyphics
- Winged Victory of Samothrace (Sculpture, 200-190 BC) - Nike goddess masterpiece
- Ming Dynasty Vase (Pottery, 1368-1644 AD, China) - Blue and white porcelain with dragons
- Egyptian Mummy Mask (Artifact, 332-30 BC) - Gilded cartonnage from Ptolemaic period
- Greek Amphora (Pottery, 540-530 BC) - Black-figure scenes from mythology
- Roman Mosaic (Art, 200 AD) - Neptune and sea creatures floor mosaic
- Terracotta Army Replica (Sculpture, Qin Dynasty) - Warriors from ancient China

UPCOMING EVENTS:
- Ancient Egypt Exhibition (Now - 90 days) - $25
- Renaissance Masters Tour (3 days) - $30, Guided tour
- Pottery Making Workshop (10 days) - $45, Hands-on experience
- Kids Discovery Day (5 days) - FREE, Family scavenger hunt
- Night at the Museum (14 days) - $50, Exclusive after-hours tour

SERVICES:
- Virtual 3D Tours with WASD controls and guided mode
- QR Code scanning for artifact information
- Audio guides in 15+ languages
- Wheelchair accessible with ramps and elevators
- Café and gift shop on ground floor
- Coat check and lockers available
`;

const SYSTEM_PROMPT = `You are DocentDesk AI, an exceptionally knowledgeable and engaging virtual museum guide. You combine deep expertise in art history, archaeology, and museum curation with warm, conversational interaction.

${MUSEUM_CONTEXT}

YOUR CORE CAPABILITIES:
1. **Expert Guide**: Share fascinating stories, historical context, and lesser-known facts about exhibits
2. **Personalized Recommendations**: Suggest tours based on visitor interests (art, history, science, kids)
3. **Practical Assistant**: Help with tickets, events, directions, amenities, and accessibility
4. **Interactive Educator**: Make learning fun with engaging questions and storytelling
5. **Multilingual Support**: Acknowledge language preferences and help navigate translations
6. **Virtual Tour Guide**: Explain how to use 3D tours, controls, and interactive features

PERSONALITY & STYLE:
- Enthusiastic and passionate about sharing knowledge
- Warm and welcoming to all ages and backgrounds
- Use vivid, descriptive language that brings artifacts to life
- Share surprising facts that make visitors say "Wow, I didn't know that!"
- Be concise but rich in detail (2-3 paragraphs typically)
- Use emojis sparingly to add warmth (🎨 🏛️ 🎭 ✨)

CONVERSATION GUIDELINES:
- If asked about specific artifacts, share their history, significance, and fun facts
- For booking questions, mention prices and guide them to use the Book Tickets button
- For tour questions, explain the 3D controls (WASD, mouse, guided mode, screenshot feature)
- For events, list upcoming activities with dates and prices
- If asked about accessibility, highlight wheelchair access, audio guides, and support services
- When visitors express interest in a topic, offer to create a personalized tour route

EXAMPLE INTERACTIONS:
- "Tell me about the Rosetta Stone" → Share discovery story, why it's important, fun facts
- "I love ancient Egypt" → Recommend Egypt gallery, related artifacts, upcoming exhibition
- "How do I book tickets?" → Explain prices, guide to booking system, mention events
- "Where is the café?" → Ground floor location, hours, mention nearby exhibits
- "Plan a 1-hour tour for kids" → Suggest interactive exhibits, hands-on activities, scavenger hunt

Always aim to educate, inspire, and make the museum experience memorable!`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { messages } = await req.json();
    console.log("Processing chat request with", messages.length, "messages");

    const userMessage = messages[messages.length - 1]?.content || "";

    // Generate contextual mock response based on user input
    let mockResponse = "";
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("ticket") || lowerMessage.includes("book")) {
      mockResponse =
        "Great question! Our museum tickets are:\n\n🎫 Adults: $25\n👨‍🎓 Students: $15\n👴 Seniors: $20\n👨‍👩‍👧‍👦 Family Pass: $60\n\nYou can book tickets through our Events & Tickets section. We're open Monday-Saturday 9 AM - 7 PM, and Sunday 10 AM - 6 PM. Would you like to know about any upcoming events?";
    } else if (lowerMessage.includes("tour") || lowerMessage.includes("3d")) {
      mockResponse =
        "Our virtual 3D tour is amazing! 🎨\n\nYou can explore the museum using:\n• WASD keys to move around\n• Mouse to look around\n• Guided mode for automatic tours\n• Screenshot feature to capture your favorite moments\n\nClick on 'Virtual Tour' in the navigation to start exploring. Would you like tips on which galleries to visit first?";
    } else if (
      lowerMessage.includes("exhibit") ||
      lowerMessage.includes("artifact")
    ) {
      mockResponse =
        "We have incredible exhibits! 🏛️\n\nOur main galleries include:\n\n🇪🇬 Ancient Egypt - Featuring mummies and the Rosetta Stone\n🎨 Renaissance Masters - Works by Leonardo da Vinci and Michelangelo\n🏺 Greek Mythology - Gods, heroes, and ancient pottery\n🖼️ Modern Art - Contemporary installations\n\nFeatured artifacts:\n• Venus de Milo\n• Rosetta Stone\n• Ming Dynasty Vase\n• Terracotta Army Replica\n\nWhich period interests you most?";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      mockResponse =
        "Hello! Welcome to DocentDesk! 👋\n\nI'm your AI museum guide, here to help you explore our amazing collection. I can assist you with:\n\n🎨 Information about exhibits and artifacts\n📅 Event schedules and ticket booking\n🗺️ Virtual tour navigation\n🌍 Multilingual support\n\nWhat would you like to know about?";
    } else {
      mockResponse = `Thank you for your question about "${userMessage}"!\n\n🏛️ I'm DocentDesk AI, your personal museum guide. I can help you with:\n\n✨ Exploring our exhibits (Ancient Egypt, Renaissance, Greek Mythology)\n🎟️ Booking tickets and event information\n🎮 Virtual 3D tour guidance\n📱 QR code artifact scanning\n\nOur museum features over 50K+ artifacts across multiple galleries. We're open daily with wheelchair access and audio guides in 15+ languages.\n\nWhat specific aspect of the museum would you like to explore?`;
    }

    // Stream the response word by word
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = mockResponse.split(" ");
        for (let i = 0; i < words.length; i++) {
          const word = words[i] + (i < words.length - 1 ? " " : "");
          const chunk = `data: ${JSON.stringify({
            choices: [{ delta: { content: word } }],
          })}\n\n`;
          controller.enqueue(encoder.encode(chunk));
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
