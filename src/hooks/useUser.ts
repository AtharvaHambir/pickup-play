
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type UserRole = "global_admin" | "university_admin" | "user";

interface CurrentUser {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  university_id: string | null;
  university_domain: string | null;
}

export function useUser() {
  const query = useQuery<CurrentUser | null>({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<CurrentUser | null> => {
      // 1. Get the authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Authentication error:", authError?.message);
        return null;
      }

      // 2. First, try to fetch user profile with 'role' column
      const { data: userData, error: profileError } = await supabase
        .from("users")
        .select("id, email, full_name, role, university_id, university_domain")
        .eq("id", user.id)
        .single();
      
      // 3. If the query with 'role' column succeeds, return the data
      if (!profileError && userData) {
        return {
          id: userData.id,
          email: userData.email,
          full_name: userData.full_name,
          university_id: userData.university_id,
          university_domain: userData.university_domain,
          role: (userData.role as UserRole) || 'user'
        };
      }

      // 4. Handle the error case - fallback for missing 'role' column
      if (profileError?.message.includes('column "role" does not exist')) {
        console.warn("'role' column not found, attempting fallback query.");
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("users")
          .select("id, email, full_name, university_id, university_domain")
          .eq("id", user.id)
          .single();

        if (fallbackError || !fallbackData) {
          console.error("Fallback profile fetch failed:", fallbackError?.message);
          return null;
        }
        
        // Return fallback data with default 'user' role
        return {
          id: fallbackData.id,
          email: fallbackData.email,
          full_name: fallbackData.full_name,
          university_id: fallbackData.university_id,
          university_domain: fallbackData.university_domain,
          role: 'user' as UserRole
        };
      }

      // 5. For any other error, log and return null
      console.error("Failed to fetch user profile:", profileError?.message);
      return null;
    },
  });

  return {
    data: query.data,
    user: query.data,
    isLoading: query.isLoading,
    loading: query.isLoading,
    error: query.error,
  };
}
