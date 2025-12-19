-- DocentDesk Comprehensive Database Schema
-- Phase 2-5 Implementation

-- ============================================
-- USER PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    preferred_language TEXT DEFAULT 'en',
    accessibility_settings JSONB DEFAULT '{}',
    notification_preferences JSONB DEFAULT '{}',
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
ON public.user_profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.user_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- ============================================
-- EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'Exhibition',
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    price DECIMAL(10, 2) DEFAULT 0,
    available_seats INTEGER DEFAULT 50,
    total_seats INTEGER DEFAULT 50,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'upcoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
ON public.events FOR SELECT
USING (true);

CREATE POLICY "Admins can manage events"
ON public.events FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert sample events
INSERT INTO public.events (title, description, category, start_date, end_date, duration_minutes, price, total_seats, available_seats, is_featured) VALUES
('Ancient Egypt Exhibition', 'Explore the mysteries of ancient Egypt with over 200 authentic artifacts including mummies, hieroglyphics, and golden treasures.', 'Exhibition', NOW() + INTERVAL '7 days', NOW() + INTERVAL '90 days', 120, 25.00, 100, 85, true),
('Renaissance Masters Tour', 'A guided tour through our Renaissance collection featuring works by Leonardo da Vinci, Michelangelo, and Raphael.', 'Tour', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days', 90, 30.00, 30, 22, true),
('Pottery Making Workshop', 'Hands-on workshop where you''ll learn ancient pottery techniques and create your own ceramic piece.', 'Workshop', NOW() + INTERVAL '10 days', NOW() + INTERVAL '10 days', 180, 45.00, 20, 15, false),
('Kids Discovery Day', 'Interactive family event with scavenger hunts, storytelling, and hands-on activities for children ages 5-12.', 'Kids Program', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days', 240, 0.00, 50, 42, false),
('Night at the Museum', 'After-hours exclusive tour with special lighting, live music, and complimentary refreshments.', 'Special Event', NOW() + INTERVAL '14 days', NOW() + INTERVAL '14 days', 180, 50.00, 40, 28, true),
('Greek Mythology Exhibition', 'Discover the gods, heroes, and legends of ancient Greece through sculptures, pottery, and interactive displays.', 'Exhibition', NOW() + INTERVAL '2 days', NOW() + INTERVAL '60 days', 90, 25.00, 80, 65, false);

-- ============================================
-- TICKETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    ticket_type TEXT NOT NULL DEFAULT 'Adult',
    quantity INTEGER DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    qr_code TEXT,
    status TEXT DEFAULT 'confirmed',
    booking_reference TEXT UNIQUE,
    visitor_name TEXT,
    visitor_email TEXT,
    visitor_phone TEXT,
    add_ons JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tickets"
ON public.tickets FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tickets"
ON public.tickets FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets"
ON public.tickets FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- USER COLLECTIONS (Saved Artifacts)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    artifact_id UUID REFERENCES public.artifacts(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, artifact_id)
);

ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own collection"
ON public.user_collections FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- VIRTUAL TOUR SESSIONS
-- ============================================
CREATE TABLE IF NOT EXISTS public.tour_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    artifacts_viewed INTEGER DEFAULT 0,
    artifacts_viewed_ids UUID[],
    tour_path JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.tour_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tours"
ON public.tour_sessions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tours"
ON public.tour_sessions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FEEDBACK TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    visit_date DATE,
    overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
    staff_rating INTEGER CHECK (staff_rating >= 1 AND staff_rating <= 5),
    cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    exhibits_rating INTEGER CHECK (exhibits_rating >= 1 AND exhibits_rating <= 5),
    navigation_rating INTEGER CHECK (navigation_rating >= 1 AND navigation_rating <= 5),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own feedback"
ON public.feedback FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback"
ON public.feedback FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- CROWD DATA TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.crowd_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_name TEXT NOT NULL,
    floor INTEGER DEFAULT 1,
    current_occupancy INTEGER DEFAULT 0,
    capacity INTEGER DEFAULT 100,
    wait_time_minutes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'quiet',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.crowd_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Crowd data is viewable by everyone"
ON public.crowd_data FOR SELECT
USING (true);

CREATE POLICY "Admins can manage crowd data"
ON public.crowd_data FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert sample crowd data
INSERT INTO public.crowd_data (zone_name, floor, current_occupancy, capacity, wait_time_minutes, status) VALUES
('Ancient Egypt Gallery', 1, 15, 50, 0, 'quiet'),
('Renaissance Wing', 1, 35, 50, 5, 'moderate'),
('Modern Art Section', 2, 42, 50, 8, 'busy'),
('Sculpture Garden', 1, 8, 40, 0, 'quiet'),
('Special Exhibitions Hall', 2, 48, 60, 15, 'busy'),
('Café & Rest Area', 1, 22, 80, 3, 'quiet'),
('Museum Shop', 1, 18, 30, 2, 'moderate'),
('Main Entrance', 1, 12, 100, 2, 'quiet');

-- ============================================
-- BADGES & ACHIEVEMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT NOT NULL,
    icon TEXT,
    rarity TEXT DEFAULT 'common',
    points_required INTEGER DEFAULT 0,
    requirement_type TEXT,
    requirement_value INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges are viewable by everyone"
ON public.badges FOR SELECT
USING (true);

-- Insert sample badges
INSERT INTO public.badges (name, description, category, icon, rarity, points_required, requirement_type, requirement_value) VALUES
('First Timer', 'Welcome! Complete your first visit', 'Visit', '🎫', 'common', 100, 'visits', 1),
('Art Enthusiast', 'View 10 art artifacts', 'Explorer', '🎨', 'common', 50, 'art_views', 10),
('History Buff', 'View 10 history artifacts', 'Explorer', '🏺', 'common', 50, 'history_views', 10),
('Regular Visitor', 'Visit the museum 5 times', 'Visit', '🔄', 'rare', 250, 'visits', 5),
('Curator', 'Save 20 artifacts to your collection', 'Explorer', '⭐', 'rare', 200, 'saved_artifacts', 20),
('VIP Patron', 'Visit the museum 10 times', 'Visit', '💎', 'epic', 500, 'visits', 10),
('Night Owl', 'Attend a night event', 'Engagement', '🌙', 'rare', 150, 'night_events', 1),
('Social Butterfly', 'Share 10 experiences', 'Engagement', '📱', 'common', 100, 'shares', 10);

CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
ON public.user_badges FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- ============================================
-- LEADERBOARD VIEW
-- ============================================
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
    up.id,
    up.full_name,
    up.avatar_url,
    up.points,
    up.level,
    COUNT(DISTINCT ub.badge_id) as badges_earned,
    RANK() OVER (ORDER BY up.points DESC) as rank
FROM public.user_profiles up
LEFT JOIN public.user_badges ub ON up.id = ub.user_id
GROUP BY up.id, up.full_name, up.avatar_url, up.points, up.level
ORDER BY up.points DESC;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON public.tickets
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate booking reference
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS TEXT AS $$
BEGIN
    RETURN 'BK' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
END;
$$ LANGUAGE plpgsql;

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to award points
CREATE OR REPLACE FUNCTION public.award_points(user_uuid UUID, points_to_add INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE public.user_profiles
    SET points = points + points_to_add
    WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and award badges
CREATE OR REPLACE FUNCTION public.check_and_award_badges(user_uuid UUID)
RETURNS void AS $$
BEGIN
    -- This is a placeholder - implement specific badge logic as needed
    -- Example: Award "First Timer" badge on first visit
    NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
