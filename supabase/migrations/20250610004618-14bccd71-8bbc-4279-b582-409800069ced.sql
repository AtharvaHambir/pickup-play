
-- Create universities table for reference
CREATE TABLE public.universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  primary_color TEXT DEFAULT '#dc2626',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert supported universities
INSERT INTO public.universities (domain, name, short_name, primary_color) VALUES
('neu.edu', 'Northeastern University', 'Northeastern', '#c8102e'),
('mit.edu', 'Massachusetts Institute of Technology', 'MIT', '#8a1538'),
('harvard.edu', 'Harvard University', 'Harvard', '#a51c30'),
('bu.edu', 'Boston University', 'Boston University', '#cc0000'),
('tufts.edu', 'Tufts University', 'Tufts', '#3e8dcc');

-- Create users table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  university_id UUID REFERENCES public.universities(id),
  university_domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create games table
CREATE TABLE public.games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  sport TEXT NOT NULL,
  location TEXT NOT NULL,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER DEFAULT 60, -- duration in minutes
  max_participants INTEGER DEFAULT 10,
  description TEXT,
  university_id UUID REFERENCES public.universities(id) NOT NULL,
  created_by UUID REFERENCES public.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create participants table
CREATE TABLE public.participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'joined' CHECK (status IN ('joined', 'left', 'pending')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(game_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for universities table (public read)
CREATE POLICY "Anyone can view universities" ON public.universities
  FOR SELECT USING (true);

-- RLS Policies for games table
CREATE POLICY "Users can view games from their university" ON public.games
  FOR SELECT USING (
    university_id = (SELECT university_id FROM public.users WHERE id = auth.uid())
  );

CREATE POLICY "Users can create games for their university" ON public.games
  FOR INSERT WITH CHECK (
    created_by = auth.uid() AND 
    university_id = (SELECT university_id FROM public.users WHERE id = auth.uid())
  );

CREATE POLICY "Users can update their own games" ON public.games
  FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own games" ON public.games
  FOR DELETE USING (created_by = auth.uid());

-- RLS Policies for participants table
CREATE POLICY "Users can view participants of games from their university" ON public.participants
  FOR SELECT USING (
    game_id IN (
      SELECT id FROM public.games 
      WHERE university_id = (SELECT university_id FROM public.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Users can join/leave games" ON public.participants
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    game_id IN (
      SELECT id FROM public.games 
      WHERE university_id = (SELECT university_id FROM public.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Users can update their own participation" ON public.participants
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own participation" ON public.participants
  FOR DELETE USING (user_id = auth.uid());

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_domain TEXT;
  user_university_id UUID;
BEGIN
  -- Extract domain from email
  user_domain := split_part(NEW.email, '@', 2);
  
  -- Get university ID based on domain
  SELECT id INTO user_university_id 
  FROM public.universities 
  WHERE domain = user_domain;
  
  -- Insert user profile
  INSERT INTO public.users (id, email, full_name, university_domain, university_id)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    user_domain,
    user_university_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
