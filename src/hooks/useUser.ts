
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

      // 3. Handle errors or cases where no profile is found
      if (profileError) {
        // This handles cases like the 'role' column not existing, but gracefully.
        console.error("Failed to fetch user profile:", profileError.message);
        // Attempt a fallback fetch without the role if that was the issue
        if (profileError.message.includes('column "role" does not exist')) {
            const { data: fallbackData, error: fallbackError } = await supabase
              .from("users")
              .select("id, email, full_name, university_id, university_domain")
              .eq("id", user.id)
              .single();

            if (fallbackError || !fallbackData) {
                console.error("Fallback fetch failed:", fallbackError?.message);
                return null;
            }
            return { ...fallbackData, role: 'user' as UserRole }; // Default role to 'user'
        }
        return null;
      }

      if (!userData) {
        console.error("No user profile data found for the authenticated user.");
        return null;
      }
      
      // 4. Ensure the role is correctly typed and return the user data
      return {
        ...userData,
        role: (userData.role as UserRole) || 'user', // Default to 'user' if role is null/undefined
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
