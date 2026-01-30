-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users (public profile table extending auth.users)
-- We'll use a trigger to automatically create this when a new user signs up if we were doing full auth,
-- but for MVP we might just insert manually or via client if using anonymous auth.
-- For now, let's assume standard Supabase auth.

create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  streak_count int default 0,
  last_login_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;
create policy "Users can view own data" on public.users for select using (auth.uid() = id);
create policy "Users can update own data" on public.users for update using (auth.uid() = id);

-- Daily Logs (resets logic handled primarily by querying 'today', but we store history)
create table public.daily_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  date date default current_date not null,
  water_ml int default 0,
  calories_total int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

-- Enable RLS
alter table public.daily_logs enable row level security;
create policy "Users can view own logs" on public.daily_logs for select using (auth.uid() = user_id);
create policy "Users can insert own logs" on public.daily_logs for insert with check (auth.uid() = user_id);
create policy "Users can update own logs" on public.daily_logs for update using (auth.uid() = user_id);

-- Food Entries (history of scanned items)
create table public.food_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  image_url text, -- Supabase Storage URL
  food_name text not null,
  calories int not null,
  macros jsonb, -- e.g. {"protein": 20, "carbs": 30, "fat": 10}
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.food_entries enable row level security;
create policy "Users can view own entries" on public.food_entries for select using (auth.uid() = user_id);
create policy "Users can insert own entries" on public.food_entries for insert with check (auth.uid() = user_id);
