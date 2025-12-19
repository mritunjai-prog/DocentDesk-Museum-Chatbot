# Lovable AI Prompts - Part 4: Crowd Management, Social Sharing & Advanced Features

## Prompt 9: Real-Time Crowd Management System

```
Add live crowd management features to help visitors avoid crowds:

1. CROWD STATUS WIDGET (Homepage & Dashboard):
- Real-time occupancy card showing:
  - Circular progress indicator (0-100%)
  - Color-coded based on capacity:
    🟢 0-40%: "Quiet - Great time to visit!"
    🟡 41-70%: "Moderate - Good flow"
    🟠 71-85%: "Busy - Expect crowds"
    🔴 86-100%: "Very Crowded - Consider visiting later"
  - Current visitor count vs. capacity
  - Last updated timestamp (e.g., "Updated 2 min ago")
  - "View Details" link

2. CROWD HEATMAP PAGE at /crowds:
- Museum floor plan visualization
- Color-coded zones showing density:
  - Dark blue: Empty/Very quiet
  - Green: Low crowd
  - Yellow: Moderate
  - Orange: Busy
  - Red: Very crowded
  
- Interactive floor selector (if multi-floor):
  - Ground Floor
  - First Floor
  - Second Floor
  - Special Exhibitions Hall

- Zone details on hover:
  - Zone name (e.g., "Ancient Egypt Gallery")
  - Current occupancy
  - Estimated wait time
  - Best alternative if crowded

3. RECOMMENDED ROUTES:
- "Smart Route Planner" section:
  - "Avoid Crowds Route" button
  - "Express Tour (1 hour)" button
  - "Full Experience (3 hours)" button
  
- Show suggested path on floor plan
- Highlight less crowded areas
- Estimated time for each zone
- "Start Navigation" button (integrates with virtual tour)

4. BEST TIME TO VISIT:
- Weekly heat map chart (like GitHub contributions):
  - 7 days x 12 hours grid
  - Color intensity shows typical crowd levels
  - Hover shows average visitor count
  - Highlight current time/day

- "Predicted Crowd Levels" for next 7 days:
  - Bar chart showing expected busy times
  - Events that might increase crowds
  - Weather impact indicator
  - Holiday/weekend warnings

5. CROWD ALERTS & NOTIFICATIONS:
- Bell icon with notification badge in navbar
- Notification types:
  - "Gallery 3 is now less crowded!"
  - "Your favorite exhibit has low traffic now"
  - "Peak time alert: Museum filling up fast"
  
- Notification preferences in Settings:
  - Enable push notifications
  - Email alerts
  - SMS alerts (premium feature)
  - Quiet hours (no notifications during these times)

6. LIVE WAITING TIMES:
- Display for popular attractions:
  - Entrance queue: ~5 minutes
  - Gift Shop: ~3 minutes
  - Café: ~10 minutes
  - Special Exhibition: ~15 minutes
  
- Update in real-time using WebSocket or polling
- "Reserve Time Slot" button for special exhibitions

7. CROWD ANALYTICS (For logged-in users):
- "Your Visit Statistics":
  - Best times you've visited
  - Least crowded days you experienced
  - Average time spent per visit
  - Recommendation: "Visit Tuesdays at 2 PM for best experience"

8. INTEGRATION & DATA:
- Mock real-time data with random fluctuations for demo
- Use Supabase real-time subscriptions for live updates
- Create 'crowd_data' table:
  - id, zone_name, floor, current_occupancy, capacity, 
  - wait_time, timestamp, updated_at
  
- Simulate data updates every 2-5 minutes
- Add smooth transitions for changing numbers/colors

9. MOBILE-SPECIFIC FEATURES:
- "Notify me when less crowded" button
- Vibration alert when entering crowded zone
- Quick access from mobile home screen (PWA)

Style with color-coded visualizations, use gold for recommended routes,
and add pulsing animations for real-time updates.
```

---

## Prompt 10: Social Media Sharing Integration

```
Add comprehensive social media sharing features:

1. SHARE BUTTON PLACEMENT:
- Navigation bar: "Share" icon button
- Artifact detail pages: Share button below title
- After virtual tour completion: "Share your tour"
- After event booking: "Share your plans"
- User collection page: "Share my collection"
- Feedback submission: "Share your review"

2. SHARE MODAL COMPONENT:
Create a beautiful share modal with:

HEADER:
- "Share Your Experience" title
- Close button

SOCIAL PLATFORMS (Large clickable buttons):
- 📘 Facebook
- 📸 Instagram (story & post options)
- 🐦 Twitter/X
- 💼 LinkedIn
- 📱 WhatsApp
- 💬 Messenger
- 📧 Email
- 🔗 Copy Link

3. CONTEXT-AWARE SHARING:

For ARTIFACTS:
- Pre-populated message:
  "Just discovered the amazing {Artifact Name} at DocentDesk Museum! 
  Learn more about this {era} artifact: {URL}"
- Include artifact image
- Relevant hashtags: #Museum #History #{ArtifactCategory}
- Museum location tag

For EVENTS:
- Message: "I'm attending {Event Name} at DocentDesk Museum on {Date}! 
  Join me: {URL}"
- Event thumbnail image
- Countdown: "Only X days left to book!"
- Hashtags: #MuseumEvents #Culture

For VIRTUAL TOURS:
- Message: "Just completed an amazing 3D virtual tour of DocentDesk Museum! 
  Explored {X} artifacts in {Y} minutes. Try it yourself: {URL}"
- Tour screenshot/thumbnail
- Stats: Artifacts viewed, time spent
- Hashtags: #VirtualTour #MuseumFromHome

For COLLECTIONS:
- Message: "Check out my favorite artifacts from DocentDesk Museum! 
  View my collection: {URL}"
- Collage of saved artifacts (max 4 images)
- Collection count: "{X} artifacts in collection"

4. CUSTOM MESSAGE EDITOR:
- Editable text area with pre-populated content
- Character counter (platform-specific limits)
- Hashtag suggestions (clickable chips to add)
- Emoji picker button
- Preview how post will look

5. IMAGE CUSTOMIZATION:
- Option to add museum watermark
- Filter selection (sepia, B&W, vintage, etc.)
- Add text overlay
- Choose from multiple image crops/layouts
- "Download image" option

6. SHARE TRACKING:
- Track share counts per artifact/event/page
- Show "Shared X times" badge on popular items
- Leaderboard: "Most shared artifacts this month"
- User dashboard: "You've shared X times"

7. FACEBOOK INTEGRATION:
- Use Facebook Share Dialog API
- Include Open Graph meta tags in pages:
  ```html
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="..." />
  <meta property="og:url" content="..." />
  ```
- Test with Facebook Sharing Debugger

8. TWITTER/X INTEGRATION:
- Twitter Web Intent URL
- Respect 280 character limit
- Include image attachment
- Suggest relevant hashtags
- @mention museum account

9. INSTAGRAM SHARING:
- "Open in Instagram" (mobile only)
- Copy caption and download image
- Instagram story template
- Swipe up link (for verified accounts)

10. WHATSAPP SHARING:
- Direct WhatsApp link with pre-filled message
- Works on mobile and desktop (WhatsApp Web)
- Group sharing option

11. EMAIL SHARING:
- Beautiful HTML email template
- Subject line customization
- Recipient input (multiple emails)
- Personal message field
- "Send" button
- Preview email before sending

12. COPY LINK FEATURE:
- One-click copy to clipboard
- Short URL generation
- Success toast: "Link copied!"
- Share analytics tracking parameter in URL

13. NATIVE SHARING (Mobile):
- Use Web Share API on supported devices
- Falls back to modal on desktop
- Share to any app installed on device

14. SOCIAL MEDIA FEED WIDGET:
- Display Instagram feed on homepage
- Show posts tagged with #DocentDeskMuseum
- Real-time Twitter feed
- User-generated content showcase

15. SHARE INCENTIVES:
- "Share and get 10% off your next ticket!"
- Referral tracking
- Leaderboard for most shares
- Monthly prize for top sharers

Store share events in Supabase 'shares' table:
- id, user_id, content_type, content_id, platform, shared_at

Style the modal with glass effect, use platform brand colors for buttons,
and add animations when sharing is successful.
```

---

## Prompt 11: Advanced Chatbot Features

```
Enhance the existing AI chatbot with advanced capabilities:

1. CHATBOT IMPROVEMENTS:

VISUAL ENHANCEMENTS:
- Add avatar/profile picture for the bot (museum docent character)
- Typing indicator with bouncing dots
- Message timestamps (show/hide toggle)
- Read receipts
- Smooth scroll to latest message
- Message reactions (👍 👎 ❤️)

2. QUICK ACTIONS MENU:
Expand quick action buttons:
- 🎫 Book Tickets
- 🗺️ Virtual Tour  
- 📸 Scan Artifact
- ℹ️ Museum Info
- 🎉 Events Calendar
- 💬 Share Experience
- 📝 Give Feedback
- 🔍 Search Artifacts
- 🕐 Opening Hours
- 📍 Directions
- 🎨 Today's Highlights
- 👥 Group Tours

3. RICH MESSAGE TYPES:

CAROUSEL CARDS:
- Swipeable artifact cards
- Event suggestions
- Exhibit highlights
- Each card with image, title, description, CTA button

IMAGE MESSAGES:
- Bot can send artifact images
- Maps and directions
- QR codes
- Infographics

AUDIO MESSAGES:
- Play audio descriptions
- Voice responses from bot
- Museum soundscapes

VIDEO MESSAGES:
- Short artifact videos
- Virtual tour previews
- How-to guides

INTERACTIVE BUTTONS:
- Multiple choice options
- Quick reply chips
- Yes/No buttons
- Action buttons

FORMS IN CHAT:
- Collect visitor info inline
- Date picker for visits
- Ticket booking within chat

4. CONVERSATION FLOWS:

WELCOME FLOW:
Bot: "Welcome to DocentDesk! 👋 I'm your AI museum guide. 
      How can I help you today?"
Buttons: "Plan My Visit" | "Explore Virtually" | "Learn About Exhibits"

TICKET BOOKING FLOW:
User: "Book tickets"
Bot: "Great! Which event interests you?"
[Shows event carousel]
User: [Selects event]
Bot: "How many tickets?"
[Shows ticket type buttons]
... continue booking in chat

ARTIFACT INFO FLOW:
User: "Tell me about Egyptian artifacts"
Bot: "We have 127 Egyptian artifacts! Here are the highlights:"
[Shows artifact carousel]
User: [Clicks artifact]
Bot: [Shows detailed info with image]
"Would you like to add this to your collection?"
Buttons: "Save" | "Share" | "View in 3D"

5. CONTEXTUAL AWARENESS:
- Remember user's previous questions in session
- Reference earlier conversation
- Personalize based on user profile:
  - "Welcome back, {Name}!"
  - "Based on your last visit..."
  - "You might like these new exhibits..."

6. SMART SUGGESTIONS:
- Proactive recommendations:
  - "It's less crowded now in Gallery 3"
  - "New exhibition opening tomorrow!"
  - "You've been browsing sculpture - here are similar items"

7. VOICE CONVERSATION MODE:
- "Voice Mode" toggle button
- Continuous voice conversation
- Visual waveform during speaking
- Push-to-talk or automatic speech detection
- Language selection for voice
- Voice gender preference (male/female/neutral)

8. MULTILINGUAL CHAT:
- Auto-detect input language
- Respond in same language
- "Translate to English" button on messages
- Language switcher within chat

9. CHAT HISTORY:
- Save conversation history (logged-in users)
- "Previous Conversations" section
- Search chat history
- Export conversation
- Clear history option

10. OFFLINE SUPPORT:
- "I'm currently offline" indicator
- Queue messages to send when online
- Basic FAQ responses work offline
- Cached content

11. TYPING INDICATORS:
- Show when bot is "thinking"
- Different indicators for different actions:
  - "Searching artifacts..."
  - "Finding available dates..."
  - "Processing your request..."

12. ERROR HANDLING:
- Graceful error messages
- "I didn't understand that. Could you rephrase?"
- Suggestions for valid queries
- Fallback to human support

13. FEEDBACK IN CHAT:
- 👍 👎 buttons on each bot message
- "Was this helpful?" prompt
- Collect feedback on responses

14. INTEGRATION POINTS:
- Connect to Supabase Edge Function for chat API
- Use sample responses for demo
- Later integrate with OpenAI, Anthropic, or Gemini
- Store chat history in 'chat_messages' table

15. ACCESSIBILITY:
- Keyboard navigation (Tab, Enter)
- Screen reader support
- High contrast mode
- Adjustable text size
- Focus indicators

Style with smooth animations, use gold for user messages, 
teal for bot messages, and add delightful micro-interactions.
```
