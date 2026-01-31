-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- USERS TABLE (with goals)
-- =============================================
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  display_name text,
  water_goal_ml int default 2000,
  calorie_goal int default 2500,
  streak_count int default 0,
  last_login_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;
create policy "Users can view own data" on public.users for select using (auth.uid() = id);
create policy "Users can update own data" on public.users for update using (auth.uid() = id);
create policy "Users can insert own data" on public.users for insert with check (auth.uid() = id);

-- =============================================
-- STREAKS TABLE
-- =============================================
create table public.streaks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  start_date date not null default current_date,
  end_date date,
  is_active boolean default true,
  days_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.streaks enable row level security;
create policy "Users can view own streaks" on public.streaks for select using (auth.uid() = user_id);
create policy "Users can insert own streaks" on public.streaks for insert with check (auth.uid() = user_id);
create policy "Users can update own streaks" on public.streaks for update using (auth.uid() = user_id);
create policy "Users can delete own streaks" on public.streaks for delete using (auth.uid() = user_id);

-- =============================================
-- WATER ENTRIES TABLE (individual add/remove)
-- =============================================
create table public.water_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  date date default current_date not null,
  amount_ml int not null, -- positive = add, negative = remove
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.water_entries enable row level security;
create policy "Users can view own water" on public.water_entries for select using (auth.uid() = user_id);
create policy "Users can insert own water" on public.water_entries for insert with check (auth.uid() = user_id);
create policy "Users can delete own water" on public.water_entries for delete using (auth.uid() = user_id);

-- =============================================
-- DAILY LOGS TABLE (summary per day)
-- =============================================
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

-- =============================================
-- FOOD ENTRIES TABLE (history of scanned items)
-- =============================================
create table public.food_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  date date default current_date not null,
  image_url text,
  food_name text not null,
  calories int not null,
  protein int default 0,
  fat int default 0,
  carbs int default 0,
  recipe_suggestion text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.food_entries enable row level security;
create policy "Users can view own entries" on public.food_entries for select using (auth.uid() = user_id);
create policy "Users can insert own entries" on public.food_entries for insert with check (auth.uid() = user_id);
create policy "Users can delete own entries" on public.food_entries for delete using (auth.uid() = user_id);

-- =============================================
-- FUNCTION: Auto-create user profile on signup
-- =============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for auto-creating user profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
