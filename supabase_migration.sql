-- =============================================
-- MIGRATION: Add new columns and tables to existing schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Add new columns to users table (if not exist)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='display_name') THEN
        ALTER TABLE public.users ADD COLUMN display_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='water_goal_ml') THEN
        ALTER TABLE public.users ADD COLUMN water_goal_ml int DEFAULT 2000;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='calorie_goal') THEN
        ALTER TABLE public.users ADD COLUMN calorie_goal int DEFAULT 2500;
    END IF;
END $$;

-- 2. Create streaks table
CREATE TABLE IF NOT EXISTS public.streaks (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) NOT NULL,
  start_date date NOT NULL DEFAULT current_date,
  end_date date,
  is_active boolean DEFAULT true,
  days_count int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for streaks
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own streaks" ON public.streaks;
DROP POLICY IF EXISTS "Users can insert own streaks" ON public.streaks;
DROP POLICY IF EXISTS "Users can update own streaks" ON public.streaks;
DROP POLICY IF EXISTS "Users can delete own streaks" ON public.streaks;
CREATE POLICY "Users can view own streaks" ON public.streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON public.streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON public.streaks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own streaks" ON public.streaks FOR DELETE USING (auth.uid() = user_id);

-- 3. Create water_entries table
CREATE TABLE IF NOT EXISTS public.water_entries (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) NOT NULL,
  date date DEFAULT current_date NOT NULL,
  amount_ml int NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for water_entries
ALTER TABLE public.water_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own water" ON public.water_entries;
DROP POLICY IF EXISTS "Users can insert own water" ON public.water_entries;
DROP POLICY IF EXISTS "Users can delete own water" ON public.water_entries;
CREATE POLICY "Users can view own water" ON public.water_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own water" ON public.water_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own water" ON public.water_entries FOR DELETE USING (auth.uid() = user_id);

-- 4. Add new columns to food_entries (if exist) or create table
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='food_entries') THEN
        -- Add missing columns
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='food_entries' AND column_name='date') THEN
            ALTER TABLE public.food_entries ADD COLUMN date date DEFAULT current_date;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='food_entries' AND column_name='protein') THEN
            ALTER TABLE public.food_entries ADD COLUMN protein int DEFAULT 0;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='food_entries' AND column_name='fat') THEN
            ALTER TABLE public.food_entries ADD COLUMN fat int DEFAULT 0;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='food_entries' AND column_name='carbs') THEN
            ALTER TABLE public.food_entries ADD COLUMN carbs int DEFAULT 0;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='food_entries' AND column_name='recipe_suggestion') THEN
            ALTER TABLE public.food_entries ADD COLUMN recipe_suggestion text;
        END IF;
    ELSE
        -- Create table if not exists
        CREATE TABLE public.food_entries (
          id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id uuid REFERENCES public.users(id) NOT NULL,
          date date DEFAULT current_date NOT NULL,
          image_url text,
          food_name text NOT NULL,
          calories int NOT NULL,
          protein int DEFAULT 0,
          fat int DEFAULT 0,
          carbs int DEFAULT 0,
          recipe_suggestion text,
          created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
        );
    END IF;
END $$;

-- Enable RLS for food_entries
ALTER TABLE public.food_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own entries" ON public.food_entries;
DROP POLICY IF EXISTS "Users can insert own entries" ON public.food_entries;
DROP POLICY IF EXISTS "Users can delete own entries" ON public.food_entries;
CREATE POLICY "Users can view own entries" ON public.food_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own entries" ON public.food_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own entries" ON public.food_entries FOR DELETE USING (auth.uid() = user_id);

-- 5. Add insert policy to users if missing
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
CREATE POLICY "Users can insert own data" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Done!
SELECT 'Migration complete!' as status;
