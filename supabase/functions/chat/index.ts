import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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
      headers: corsHeaders 
    });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

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
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again in a moment.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "AI credits exhausted. Please add credits to continue.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
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
