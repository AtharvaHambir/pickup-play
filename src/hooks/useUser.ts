
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
      // 1) Authenticated user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Authentication error:", authError?.message);
        return null;
      }

      // 2) Try to fetch with 'role' included (cast to any to avoid schema-type mismatch)
      const {
        data: userDataWithRole,
        error: profileError,
      }: { data: any; error: any } = await (supabase as any)
        .from("users")
        .select("id, email, full_name, role, university_id, university_domain")
        .eq("id", user.id)
        .single();

      // 3) If error, attempt fallback without 'role'
      if (profileError) {
        console.error("Failed to fetch user profile:", profileError?.message);

        // Fallback when the 'role' column does not exist in the DB
        if (
          typeof profileError?.message === "string" &&
          profileError.message.includes('column "role" does not exist')
        ) {
          const {
            data: fallbackData,
            error: fallbackError,
          } = await supabase
            .from("users")
            .select("id, email, full_name, university_id, university_domain")
            .eq("id", user.id)
            .single();

          if (fallbackError || !fallbackData) {
            console.error(
              "Fallback profile fetch failed:",
              fallbackError?.message
            );
            return null;
          }

          const finalData: CurrentUser = {
            id: fallbackData.id,
            email: fallbackData.email,
            full_name: fallbackData.full_name ?? null,
            university_id: fallbackData.university_id ?? null,
            university_domain: fallbackData.university_domain ?? null,
            role: "user", // default role
          };

          return finalData;
        }

        // Any other error: return null
        return null;
      }

      // 4) Validate data
      if (!userDataWithRole || typeof userDataWithRole !== "object") {
        console.error("No user profile data found.");
        return null;
      }

      // 5) Construct response explicitly (avoid spreading non-object types)
      const finalData: CurrentUser = {
        id: userDataWithRole.id,
        email: userDataWithRole.email,
        full_name: userDataWithRole.full_name ?? null,
        university_id: userDataWithRole.university_id ?? null,
        university_domain: userDataWithRole.university_domain ?? null,
        role: (userDataWithRole.role as UserRole) || "user",
      };

      return finalData;
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
