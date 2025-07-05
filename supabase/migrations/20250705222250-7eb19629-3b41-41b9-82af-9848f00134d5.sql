
-- Drop the existing foreign key constraint
ALTER TABLE public.games DROP CONSTRAINT games_created_by_fkey;

-- Add the constraint back with CASCADE delete
ALTER TABLE public.games ADD CONSTRAINT games_created_by_fkey 
  FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;
