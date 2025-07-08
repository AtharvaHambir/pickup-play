
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUniversity } from './useUniversity';

export interface Field {
  id: string;
  location_name: string;
  capacity: number;
  schedule: any;
  university_id: string;
  created_at: string;
  updated_at: string;
}

export const useFields = () => {
  const { university } = useUniversity();

  return useQuery({
    queryKey: ['fields', university?.id],
    queryFn: async () => {
      if (!university?.id) return [];

      const { data, error } = await supabase
        .from('fields')
        .select('*')
        .eq('university_id', university.id);

      if (error) throw error;
      return data as Field[];
    },
    enabled: !!university?.id,
  });
};
