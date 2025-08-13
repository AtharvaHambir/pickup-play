
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
      // 1. Get the authenticated user from Supabase auth
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Authentication error:", authError?.message);
        return null;
      }

      // 2. Fetch the user's profile from the 'users' table
      const { data: userData, error: profileError } = await supabase
        .from("users")
        .select("id, email, full_name, role, university_id, university_domain")
        .eq("id", user.id)
        .single();

      // 3. Handle profile query errors FIRST
      if (profileError) {
        console.error("Failed to fetch user profile:", profileError.message);
        // Fallback for when the 'role' column doesn't exist
        if (profileError.message.includes('column "role" does not exist')) {
            const { data: fallbackData, error: fallbackError } = await supabase
              .from("users")
              .select("id, email, full_name, university_id, university_domain")
              .eq("id", user.id)
              .single();

            if (fallbackError || !fallbackData) {
                console.error("Fallback profile fetch failed:", fallbackError?.message);
                return null;
            }
            // Return user data with a default 'user' role
            return { ...fallbackData, role: 'user' };
        }
        // For any other profile error, return null
        return null;
      }

      // 4. Handle case where no data is returned
      if (!userData) {
        console.error("No user profile data found for the authenticated user.");
        return null;
      }
      
      // 5. Success: return the user data with a correctly typed role
      return {
        ...userData,
        role: (userData.role as UserRole) || 'user', // Default to 'user' if role is null
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
