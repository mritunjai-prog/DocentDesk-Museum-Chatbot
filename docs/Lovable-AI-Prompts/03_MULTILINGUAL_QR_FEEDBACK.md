# Lovable AI Prompts - Part 3: Multilingual, QR Scanning & Feedback

## Prompt 6: Multilingual Support System

```
Add comprehensive multilingual support to DocentDesk:

1. LANGUAGE SELECTOR IN NAVIGATION:
- Add language dropdown button to the top-right of navigation
- Display current language with flag icon
- Dropdown shows 15+ languages:
  - 🇬🇧 English
  - 🇪🇸 Spanish (Español)
  - 🇫🇷 French (Français)
  - 🇩🇪 German (Deutsch)
  - 🇮🇹 Italian (Italiano)
  - 🇵🇹 Portuguese (Português)
  - 🇮🇳 Hindi (हिंदी)
  - 🇨🇳 Chinese (中文)
  - 🇯🇵 Japanese (日本語)
  - 🇰🇷 Korean (한국어)
  - 🇸🇦 Arabic (العربية)
  - 🇷🇺 Russian (Русский)
  - 🇹🇷 Turkish (Türkçe)
  - 🇳🇱 Dutch (Nederlands)
  - 🇵🇱 Polish (Polski)

2. SETUP i18next:
- Install and configure react-i18next
- Create translation files in src/locales/ folder structure:
  ```
  src/locales/
    en/
      common.json
      navigation.json
      hero.json
      features.json
      events.json
      booking.json
    es/
      common.json
      ...
    (repeat for all languages)
  ```

3. TRANSLATE KEY SECTIONS:
Create translation keys for:
- Navigation menu items
- Hero section (headline, subtitle, CTAs)
- Features section
- Event listings
- Booking wizard
- User dashboard
- Footer
- Common UI elements (buttons, labels, messages)

Example translation structure for common.json:
```json
{
  "buttons": {
    "submit": "Submit",
    "cancel": "Cancel",
    "continue": "Continue",
    "back": "Back"
  },
  "messages": {
    "success": "Success!",
    "error": "An error occurred"
  }
}
```

4. RTL SUPPORT:
- Add RTL layout support for Arabic and Hebrew
- Flip layout direction when RTL language selected
- Adjust text alignment and icons
- Test with Arabic language selected

5. LANGUAGE PERSISTENCE:
- Save selected language to localStorage
- Auto-detect browser language on first visit
- Apply saved language on page load
- Update HTML lang attribute dynamically

6. CHATBOT MULTILINGUAL:
- Add language selector within chatbot interface
- Send user's language preference with chat messages
- Display bot responses in selected language
- Add translation indicator for translated content

7. VOICE INPUT LANGUAGES:
- Allow voice input in multiple languages
- Show supported languages for voice in settings
- Update speech recognition language based on selection

Implement the translations for at least English, Spanish, Hindi, and Chinese fully.
For other languages, create the structure with English fallbacks for now.
```

---

## Prompt 7: QR Code Scanner & Enhanced Artifacts

```
Add QR code scanning feature for on-site visitors:

1. QR SCANNER PAGE at /scan route:
- Add "Scan Artifact" button to navigation (when on mobile/tablet)
- Create full-screen scanner interface with:
  - Camera viewfinder with scanning frame overlay
  - Scanning animation (moving line or corners)
  - "Position QR code within frame" instruction
  - Toggle camera (front/back) button
  - Flashlight toggle button
  - Manual entry option: "Enter artifact code manually"

2. CAMERA INTEGRATION:
- Use html5-qrcode library for scanning
- Request camera permissions
- Handle permission denied state with helpful message
- Continuous scanning mode (scans automatically when QR in view)
- Vibration feedback on successful scan (mobile)
- Sound effect on scan (optional, with mute button)

3. MANUAL ENTRY ALTERNATIVE:
- Show modal with text input for artifact code
- Format: "ART-XXXXX" (e.g., ART-00123)
- Auto-format as user types
- "Look up" button to find artifact
- Helpful text: "Find the code below each exhibit"

4. UPLOAD QR CODE IMAGE:
- "Upload QR Code Photo" button
- File picker for images
- Process uploaded image to extract QR code
- Show preview of uploaded image
- Extract and decode QR code from image

5. ENHANCED ARTIFACT DETAIL PAGE at /artifact/:id:
Expand the existing artifact modal to a full page with:

HERO SECTION:
- Large artifact image gallery (carousel with thumbnails)
- Artifact name and category badge
- Save to collection heart button
- Share button
- 360° view button (if 3D model available)

DETAILS TABS:
Tab 1: OVERVIEW
- Origin and era
- Dimensions and materials
- Current location in museum
- Discovery story
- Significance

Tab 2: HISTORY
- Interactive timeline of the artifact
- Key historical events
- Previous ownership
- Restoration history
- References and citations

Tab 3: RELATED
- Similar artifacts in collection
- Related exhibitions
- Artifacts from same era/culture
- "You might also like" recommendations

Tab 4: MULTIMEDIA
- Audio description (play button with waveform)
- Video documentary (if available)
- 3D model viewer (Three.js)
- High-resolution images (zoomable)
- Virtual restoration visualization

INTERACTIVE FEATURES:
- "Ask AI about this artifact" button (opens chatbot with context)
- "Add to my tour" button (adds to custom tour path)
- "Compare with similar" feature
- Print-friendly version button

6. ADD QR CODES TO DATABASE:
- Update artifacts table in Supabase:
  - Add qr_code field (unique code)
  - Add 3d_model_url field
  - Add audio_description_url field
  - Add video_url field
  - Add timeline_data JSON field

Sample artifact QR codes:
- ART-00001: "Egyptian Pharaoh Statue"
- ART-00002: "Greek Amphora Vase"
- ART-00003: "Roman Coin Collection"
- etc.

7. SCAN STATISTICS:
- Track scanned artifacts per user
- Show "Recently Scanned" section in dashboard
- Badge system: "Scan 10 artifacts to unlock Explorer badge"
- Scan history with timestamps

Style the scanner with a modern UI, use gold for the scan frame, 
and add smooth transitions when navigating to artifact details.
```

---

## Prompt 8: Feedback & Rating System

```
Create a comprehensive feedback system:

1. FEEDBACK TRIGGER POINTS:
- After completing virtual tour: "How was your experience?"
- After event attendance: Email with feedback link
- From user dashboard: "Submit New Feedback" button
- From footer: "Share Feedback" link
- Pop-up after 3 minutes on site: "Help us improve!" (dismissible)

2. FEEDBACK FORM at /feedback route or as modal:

HEADER:
- "We Value Your Feedback" heading
- Subtext: "Help us improve your museum experience"
- Museum icon or illustration

RATING SECTION - Visual Star Ratings (1-5 stars):
- Overall Experience ⭐⭐⭐⭐⭐
- Staff Friendliness ⭐⭐⭐⭐⭐
- Cleanliness ⭐⭐⭐⭐⭐
- Exhibit Quality ⭐⭐⭐⭐⭐
- Ease of Navigation ⭐⭐⭐⭐⭐
- Value for Money ⭐⭐⭐⭐⭐

SLIDER RATINGS (0-10):
- How likely are you to recommend us? (NPS score)
  0 (Not likely) ────────○──── 10 (Very likely)
- Show emoji feedback: 😞 😐 😊 😄 🤩 based on score

OPEN FEEDBACK:
- "What did you like most?" (textarea)
  Placeholder: "Tell us what made your visit special..."
  
- "What can we improve?" (textarea)
  Placeholder: "Share your suggestions..."
  
- "Which exhibit was your favorite?" (dropdown)
  Options populated from artifacts database
  
- "How did you hear about us?" (dropdown)
  - Social Media
  - Search Engine
  - Friend/Family
  - Advertisement
  - School/University
  - Other

CONTACT (Optional):
- Email for follow-up (pre-filled if logged in)
- "I'd like to be contacted about my feedback" checkbox

SUBMIT:
- Large "Submit Feedback" button (gold)
- "Your feedback is anonymous" note
- Character counter on textareas (max 500 chars)

3. FEEDBACK CONFIRMATION:
- Success animation with thank you message
- "Thank you for helping us improve!" 
- Reward: "You've earned 50 points!" (gamification)
- Option to share feedback on social media
- "View other visitor reviews" link

4. FEEDBACK DASHBOARD (in user profile):
- List all submitted feedback
- Show: Date, overall rating, status
- Status badges: Submitted, Reviewed, Responded
- Expand to see full details
- Museum response (if admin replied)

5. PUBLIC REVIEWS PAGE at /reviews:
- Display aggregated ratings:
  - Overall rating (e.g., 4.8/5.0)
  - Total reviews count
  - Rating distribution bar chart
  
- Filter reviews:
  - Most Recent
  - Highest Rated
  - Lowest Rated
  - Verified Visitors only
  
- Review cards showing:
  - User name (or "Anonymous Visitor")
  - Star rating
  - Date of visit
  - Comment excerpt
  - "Read more" button
  - Helpful buttons: "Was this helpful? 👍 👎"

6. STORE IN SUPABASE:
- Create 'feedback' table:
  - id, user_id, visit_date, overall_rating, staff_rating, cleanliness_rating,
  - exhibits_rating, navigation_rating, value_rating, nps_score,
  - liked_most, improvements, favorite_exhibit, how_heard,
  - is_anonymous, contact_email, created_at, status, admin_response
  
7. ADMIN FEEDBACK DASHBOARD (basic view):
- Average ratings by category
- Recent feedback list
- Flagged feedback (low ratings)
- Sentiment analysis indicator
- Export to CSV button

Style with glass cards, use gold stars for ratings, add animations 
for star selection, and show real-time validation.
```
