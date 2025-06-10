
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface University {
  id: string;
  domain: string;
  name: string;
  short_name: string;
  primary_color: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  university_id: string | null;
  university_domain: string | null;
}

export const useUniversity = () => {
  const { user } = useAuth();

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data as UserProfile;
    },
    enabled: !!user
  });

  const { data: university, isLoading: universityLoading } = useQuery({
    queryKey: ['university', userProfile?.university_id],
    queryFn: async () => {
      if (!userProfile?.university_id) return null;
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('id', userProfile.university_id)
        .single();
      
      if (error) throw error;
      return data as University;
    },
    enabled: !!userProfile?.university_id
  });

  return {
    userProfile,
    university,
    isLoading: profileLoading || universityLoading
  };
};
