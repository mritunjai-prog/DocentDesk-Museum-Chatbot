-- Create role enum for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles table for staff/admin management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Artifacts/Exhibits table
CREATE TABLE public.artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'Art',
    era TEXT,
    origin TEXT,
    image_url TEXT,
    model_url TEXT,
    position_x FLOAT DEFAULT 0,
    position_y FLOAT DEFAULT 0,
    position_z FLOAT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.artifacts ENABLE ROW LEVEL SECURITY;

-- Everyone can view artifacts
CREATE POLICY "Artifacts are viewable by everyone"
ON public.artifacts
FOR SELECT
USING (true);

-- Only admins can manage artifacts
CREATE POLICY "Admins can manage artifacts"
ON public.artifacts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert sample artifacts
INSERT INTO public.artifacts (name, description, category, era, origin, position_x, position_y, position_z, is_featured) VALUES
('Venus de Milo', 'Ancient Greek sculpture depicting the goddess Aphrodite. One of the most famous works of ancient Greek sculpture.', 'Sculpture', '130-100 BC', 'Ancient Greece', -4, 1.5, -3, true),
('The Rosetta Stone', 'A granodiorite stele inscribed with three versions of a decree issued in Memphis, Egypt.', 'History', '196 BC', 'Ancient Egypt', 0, 1.5, -5, true),
('Winged Victory of Samothrace', 'A masterpiece of Greek sculpture from the Hellenistic period, depicting the goddess Nike.', 'Sculpture', '200-190 BC', 'Ancient Greece', 4, 2, -3, true),
('Egyptian Mummy Mask', 'A gilded mummy mask from the Ptolemaic period, made of cartonnage covered in gold leaf.', 'Artifact', '332-30 BC', 'Ancient Egypt', -3, 1.2, 0, false),
('Greek Amphora', 'A black-figure amphora depicting scenes from Greek mythology.', 'Pottery', '540-530 BC', 'Ancient Greece', 3, 1, 0, false),
('Mesopotamian Tablet', 'A cuneiform tablet containing ancient Sumerian texts about trade and commerce.', 'History', '2100 BC', 'Mesopotamia', 0, 1, 3, false),
('Roman Mosaic', 'An intricate floor mosaic depicting Neptune and sea creatures.', 'Art', '200 AD', 'Roman Empire', -2, 0.5, 4, true),
('Ming Dynasty Vase', 'A blue and white porcelain vase from the Ming Dynasty featuring dragon motifs.', 'Pottery', '1368-1644 AD', 'China', 2, 1.3, 4, false);