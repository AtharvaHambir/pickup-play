
-- Phase 1: Database Schema Reversion
-- Drop all tables and policies that were added today

-- Drop RLS policies first
DROP POLICY IF EXISTS "Users can view fields from their university" ON public.fields;
DROP POLICY IF EXISTS "Team creators can delete their teams" ON public.teams;
DROP POLICY IF EXISTS "Team creators can update their teams" ON public.teams;
DROP POLICY IF EXISTS "Users can create teams for their university" ON public.teams;
DROP POLICY IF EXISTS "Users can view teams from their university" ON public.teams;
DROP POLICY IF EXISTS "Team leaders can manage team members" ON public.team_members;
DROP POLICY IF EXISTS "Users can join teams from their university" ON public.team_members;
DROP POLICY IF EXISTS "Users can view team members from their university" ON public.team_members;

-- Drop tables in correct order (child tables first)
DROP TABLE IF EXISTS public.team_members;
DROP TABLE IF EXISTS public.teams;
DROP TABLE IF EXISTS public.fields;

-- Remove any columns that were added to existing tables
ALTER TABLE public.users DROP COLUMN IF EXISTS is_team_leader;
ALTER TABLE public.games DROP COLUMN IF EXISTS team_id;
ALTER TABLE public.games DROP COLUMN IF EXISTS is_private;
ALTER TABLE public.games DROP COLUMN IF EXISTS field_id;
