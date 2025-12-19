# Lovable AI Prompts - Part 2: Events & Ticket Booking System

## Prompt 3: Events Calendar & Listing

```
Create an events page at /events route:

1. EVENTS HEADER:
- Hero section with "Museum Events & Exhibitions"
- Subtitle: "Book your tickets and plan your visit"
- Search bar to find events by name
- Filter buttons: All Events, Exhibitions, Workshops, Special Tours, Kids Programs

2. CALENDAR VIEW:
- Monthly calendar grid (use react-day-picker or similar)
- Highlight dates with events (gold dots)
- Click on date to filter events
- Month navigation arrows
- "Today" button to jump to current date
- Show current month and year prominently

3. EVENT CARDS GRID:
- Display events in a responsive grid (2-3 columns)
- Each card shows:
  - Event thumbnail image (use placeholder for now)
  - Event title and category badge
  - Date, time, and duration
  - Price (or "Free")
  - Availability status: "Available" (green), "Limited Seats" (orange), "Sold Out" (red)
  - Short description (2 lines max)
  - "Book Now" button (primary) or "Sold Out" (disabled)
- Hover effect: slight scale and shadow increase

4. EVENT FILTERS & SORTING:
- Category filters (multi-select)
- Price range slider
- Date range picker
- Sort by: Date (asc/desc), Price (low/high), Popularity
- "Clear All Filters" button

5. SAMPLE EVENTS DATA:
Create 8-10 sample events:
- "Ancient Egypt Exhibition" - $25, Art category
- "Renaissance Masters Tour" - $30, Art category  
- "Pottery Making Workshop" - $45, Workshop category
- "Kids Discovery Day" - Free, Kids category
- "Night at the Museum" - $50, Special Tours category
- "Greek Mythology Exhibition" - $25, History category
- "3D Sculpture Tour" - $20, Art category
- "Family Fun Weekend" - $60, Kids category

Store events in Supabase 'events' table with fields:
- id, title, description, category, date, time, duration, price, available_seats, total_seats, image_url, is_featured

Use the glass card design with gold accents for featured events.
```

---

## Prompt 4: Ticket Booking Wizard (Part 1)

```
Create a multi-step ticket booking wizard at /booking/:eventId route:

1. BOOKING WIZARD LAYOUT:
- Progress stepper at top showing 5 steps:
  Step 1: Select Tickets
  Step 2: Add-ons
  Step 3: Your Details
  Step 4: Payment
  Step 5: Confirmation
- Current step highlighted in gold
- Completed steps have checkmarks
- "Back" and "Continue" buttons at bottom
- Event summary card on the right sidebar showing:
  - Event name, date, time
  - Selected tickets summary
  - Price breakdown
  - Total amount (prominent)

2. STEP 1 - SELECT TICKETS:
- Display event details at top (image, title, date, time)
- Ticket type cards:
  
  ADULT TICKET - $25
  - Full museum access
  - Quantity selector (+ and - buttons)
  
  STUDENT TICKET - $15
  - Valid student ID required
  - Quantity selector
  
  SENIOR TICKET - $20
  - Age 65+
  - Quantity selector
  
  FAMILY PASS - $60
  - 2 Adults + 2 Children
  - Quantity selector
  
  CHILD TICKET - $10
  - Age 5-12, under 5 free
  - Quantity selector

- Each ticket card shows: Type, Price, Description, Quantity selector
- Total tickets and amount displayed prominently
- "Continue" button disabled until at least 1 ticket selected
- Validate against available_seats

3. STEP 2 - ADD-ONS (Optional):
- Optional add-ons as checkboxes:
  
  □ Audio Guide - $5 per person
  - Available in 15+ languages
  - Detailed commentary on exhibits
  
  □ Special Exhibition Access - $10 per ticket
  - Limited time exhibitions
  - Exclusive artifacts
  
  □ Photography Pass - $15
  - Professional photography allowed
  - No flash restrictions
  
  □ Guided Tour - $20 per person
  - Expert guide included
  - 90-minute tour

- Each add-on shows price and description
- Total updates automatically when selections change
- "Skip Add-ons" link
- Updated price breakdown in sidebar

Style with glass cards, use gold for selected items, teal for hover states.
```

---

## Prompt 5: Ticket Booking Wizard (Part 2)

```
Continue the ticket booking wizard with remaining steps:

4. STEP 3 - YOUR DETAILS:
- Form to collect visitor information:
  
  CONTACT INFORMATION:
  - Full Name* (text input)
  - Email Address* (email input with validation)
  - Phone Number* (phone input with country code selector)
  - Country (dropdown with flags)
  
  VISITOR DETAILS:
  - Visit Date* (date picker, must be valid event date)
  - Special Requirements (textarea):
    - Accessibility needs
    - Dietary restrictions
    - Other requests
  
  EMERGENCY CONTACT (optional but recommended):
  - Name (text input)
  - Phone Number (phone input)

- All required fields marked with *
- Real-time validation with error messages
- "Save for future bookings" checkbox
- For logged-in users, pre-fill from profile
- Terms and conditions checkbox:
  "I agree to the terms and conditions and cancellation policy"

5. STEP 4 - PAYMENT:
- Payment method tabs: Credit Card, Debit Card, UPI (for India)
- Credit/Debit Card form:
  
  PAYMENT DETAILS:
  - Card Number (16 digits with auto-spacing)
  - Card type auto-detection (Visa, Mastercard, Amex icons)
  - Cardholder Name (text input)
  - Expiry Date (MM/YY format)
  - CVV (3-4 digits with tooltip explaining what CVV is)
  
  BILLING ADDRESS:
  - Same as visitor address checkbox
  - Street Address
  - City, State/Province
  - Postal Code, Country
  
  SECURITY:
  - "Your payment is secure" message with lock icon
  - PCI-DSS compliant badge
  - SSL encrypted badge
  - Accepted cards logos (Visa, Mastercard, Amex, Discover)

- For UPI: Show UPI ID input and QR code placeholder
- "Save payment method" checkbox (for logged-in users)
- Total amount displayed prominently
- "Complete Booking" button (gold, glowing effect)

6. STEP 5 - CONFIRMATION:
- Success animation (checkmark animation)
- "Booking Confirmed!" heading
- Booking details card:
  - Booking ID (unique reference number)
  - Event name, date, time
  - Number of tickets
  - Ticket types breakdown
  - Add-ons selected
  - Total amount paid
  - Payment method
  
- QR CODE:
  - Large, scannable QR code containing booking ID
  - "This is your entry pass" message
  - Generate unique QR code using 'qrcode' library
  
- ACTION BUTTONS:
  - "Download PDF Ticket" (primary button)
  - "Add to Calendar" (button with calendar icon)
  - "Email Ticket" (automatically sent, but option to resend)
  - "Share" (social media share buttons)
  - "Back to Events" (secondary button)
  - "Start Virtual Tour" (to explore before visit)

- Confirmation email automatically sent
- Add ticket to user's "My Tickets" in dashboard

INTEGRATION:
- Save booking to Supabase 'tickets' table:
  - id, user_id, event_id, booking_reference, ticket_types (JSON), addons (JSON), 
  - total_amount, payment_status, qr_code, visitor_details (JSON), created_at
- Update event's available_seats
- Trigger confirmation email via Supabase Edge Function

Style the entire wizard with glass morphism, smooth transitions between steps, 
and use gold for CTAs and success states. Add subtle animations for step transitions.
```
