-- =============================================
-- MIGRATION V2: Avatar, Onboarding, Profile Fields
-- =============================================

-- Add avatar_url to users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Add onboarding fields
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS age INT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS weight_kg NUMERIC(5,1);
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS height_cm NUMERIC(5,1);
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS activity_level TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS goal TEXT;

-- =============================================
-- Supabase Storage bucket for avatars
-- =============================================
-- Run this in Supabase Dashboard > Storage > Create bucket:
-- Bucket name: avatars
-- Public: true
-- File size limit: 2MB
-- Allowed MIME types: image/png, image/jpeg, image/webp
