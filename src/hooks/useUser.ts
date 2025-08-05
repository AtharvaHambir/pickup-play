
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type UserRole = "global_admin" | "university_admin" | "user";

interface CurrentUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  university_id: string | null;
  university_domain: string | null;
}

export function useUser() {
  return useQuery<CurrentUser | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const {
        data: {
          user,
        },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) return null;

      const { data, error } = await supabase
        .from("users")
        .select("id, email, full_name, role, university_id, university_domain")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch user profile:", error.message);
        return null;
      }

      return data as CurrentUser;
    },
  });
}
