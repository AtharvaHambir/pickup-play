
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
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("Auth error:", authError?.message);
          return null;
        }

        const { data, error } = await supabase
          .from("users")
          .select("id, email, full_name, role, university_id, university_domain")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Failed to fetch user profile:", error.message);
          return null;
        }
        
        if (!data) {
            console.error("No user data found");
            return null;
        }

        // Ensure the role is correctly typed, defaulting to 'user' if it's missing.
        const finalData: CurrentUser = {
            ...data,
            role: data.role as UserRole || 'user',
        };

        return finalData;

      } catch (error) {
        console.error("Unexpected error in useUser:", error);
        return null;
      }
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
