
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

        // First try to select with role column
        let { data, error } = await supabase
          .from("users")
          .select("id, email, full_name, role, university_id, university_domain")
          .eq("id", user.id)
          .single();

        // If role column doesn't exist, fall back to selecting without it
        if (error && error.message.includes("column \"role\" does not exist")) {
          console.log("Role column not found, falling back to default selection");
          const fallbackResult = await supabase
            .from("users")
            .select("id, email, full_name, university_id, university_domain")
            .eq("id", user.id)
            .single();
          
          if (fallbackResult.error || !fallbackResult.data) {
            console.error("Failed to fetch user profile:", fallbackResult.error?.message);
            return null;
          }
          
          // Hardcode admin role for specific email
          const role: UserRole = fallbackResult.data.email === 'hambir.a@northeastern.edu' 
            ? 'global_admin' 
            : 'user';
          
          return {
            ...fallbackResult.data,
            role
          };
        }

        if (error) {
          console.error("Failed to fetch user profile:", error.message);
          return null;
        }

        if (!data) {
          console.error("No user data found");
          return null;
        }

        // Hardcode admin role for specific email even if role column exists
        if (data.email === 'hambir.a@northeastern.edu') {
          data.role = 'global_admin';
        }

        return data;
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
    error: query.error
  };
}
