# Lovable AI Prompts - Part 1: Authentication & User Dashboard

## Prompt 1: User Authentication System

```
Add user authentication to DocentDesk:

1. CREATE LOGIN/SIGNUP MODAL:
- Add a "Sign In" button to the navigation bar (replace the current User icon)
- Create a modal with two tabs: "Sign In" and "Sign Up"
- Sign In form: Email and Password fields
- Sign Up form: Name, Email, Password, Confirm Password
- Add "Sign in with Google" button with Google icon
- Add "Forgot Password?" link
- Style with glass morphism effect matching the site design

2. INTEGRATE SUPABASE AUTH:
- Use the existing Supabase client in src/integrations/supabase/client.ts
- Implement email/password authentication
- Add Google OAuth provider
- Store user session
- Add loading states and error messages
- Show success toast on successful login/signup

3. PROTECTED ROUTES:
- Create a ProtectedRoute component
- Redirect to login if user is not authenticated
- Add user avatar dropdown in navigation when logged in showing:
  - User name and email
  - "My Dashboard" link
  - "Settings" link  
  - "Sign Out" button

4. USER CONTEXT:
- Create a UserContext to manage auth state globally
- Provide user data across the app
- Handle session persistence

Use the existing gold/teal color scheme and match the glass card styling.
```

---

## Prompt 2: User Dashboard

```
Create a comprehensive user dashboard at /dashboard route:

1. DASHBOARD LAYOUT:
- Create sidebar navigation with icons:
  - Overview (home icon)
  - My Tickets (ticket icon)
  - My Collection (heart icon)
  - My Tours (map icon)
  - Feedback History (message icon)
  - Settings (settings icon)
- Main content area showing selected section
- Make it responsive (sidebar collapses on mobile)

2. OVERVIEW TAB:
- Welcome message with user name
- Stats cards showing:
  - Total visits
  - Saved artifacts
  - Upcoming tickets
  - Tours completed
- Recent activity timeline
- Quick actions: "Book New Ticket", "Start Virtual Tour", "View Collection"

3. MY TICKETS TAB:
- Display all user tickets (upcoming and past)
- Each ticket card shows:
  - Event name and date
  - Ticket type and quantity
  - QR code (large and scannable)
  - "Download PDF" button
  - "Add to Calendar" button
  - Status badge (Confirmed/Used/Expired)
- Filter by: All, Upcoming, Past
- Empty state: "No tickets yet. Book your first visit!"

4. MY COLLECTION TAB:
- Grid of saved/favorite artifacts
- Each artifact card clickable to view details
- "Remove from collection" button on hover
- Search and filter by category
- Empty state: "Start exploring and save your favorites"

5. MY TOURS TAB:
- List of completed virtual tours
- Show: Date, duration, artifacts viewed
- "Resume Tour" or "Start New Tour" buttons
- Tour statistics: Total time spent, artifacts discovered

6. FEEDBACK HISTORY TAB:
- List of all submitted feedback
- Show: Date, rating, comments preview
- Click to expand full feedback
- "Submit New Feedback" button

7. SETTINGS TAB:
- Profile settings: Name, Email, Avatar upload
- Preferences: Language, Notifications, Theme
- Privacy settings
- "Delete Account" button (with confirmation)

Use Supabase to fetch and store all user data. Style everything with the glass card design and gold/teal accents.
```
