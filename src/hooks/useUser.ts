
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

      // 2. Fetch the user's profile, including the 'role' column
      const { data: userData, error: profileError } = await supabase
        .from("users")
        .select("id, email, full_name, role, university_id, university_domain")
        .eq("id", user.id)
        .single();
      
      // 3. IMMEDIATELY handle the error case
      if (profileError) {
        // Fallback specifically for when the 'role' column is missing
        if (profileError.message.includes('column "role" does not exist')) {
            console.warn("'role' column not found, attempting fallback query.");
            const { data: fallbackData, error: fallbackError } = await supabase
              .from("users")
              .select("id, email, full_name, university_id, university_domain")
              .eq("id", user.id)
              .single();

            // If the fallback also fails or finds no user, exit
            if (fallbackError || !fallbackData) {
                console.error("Fallback profile fetch failed:", fallbackError?.message);
                return null;
            }
            
            // If fallback succeeds, construct the user object explicitly
            return {
              id: fallbackData.id,
              email: fallbackData.email,
              full_name: fallbackData.full_name,
              university_id: fallbackData.university_id,
              university_domain: fallbackData.university_domain,
              role: 'user' as UserRole
            };
        }
        
        // For any other type of profile error, log it and exit
        console.error("Failed to fetch user profile:", profileError.message);
        return null;
      }

      // 4. Handle the case where the query succeeded but found no user data
      if (!userData) {
        console.error("No user profile data found for the authenticated user.");
        return null;
      }
      
      // 5. If we get here, the query was successful and data exists.
      // Construct the return object explicitly to avoid spread issues
      return {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        university_id: userData.university_id,
        university_domain: userData.university_domain,
        role: (userData.role as UserRole) || 'user'
      };
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
