
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
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Authentication error:", authError?.message);
        return null;
      }

      // 2. Fetch the user's profile from the 'users' table.
      // We cast the result to `any` to bypass the outdated type definitions,
      // as our database now has a 'role' column that the types file doesn't know about.
      const { data, error } = (await supabase
        .from("users")
        .select("id, email, full_name, role, university_id, university_domain")
        .eq("id", user.id)
        .single()) as { data: any; error: any };

      // 3. Handle any errors or if no data is returned
      if (error || !data) {
        console.error("Error fetching user profile:", error?.message);
        return null;
      }

      // 4. If the query is successful, construct the CurrentUser object.
      // This is now safe because we've already checked for errors.
      const currentUser: CurrentUser = {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        university_id: data.university_id,
        university_domain: data.university_domain,
        role: (data.role as UserRole) || "user", // Safely assign the role, defaulting to 'user'
      };

      return currentUser;
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
