
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ("global_admin" | "university_admin")[];
}

export default function AdminProtectedRoute({ children, allowedRoles }: AdminProtectedRouteProps) {
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || !allowedRoles.includes(user.role as "global_admin" | "university_admin"))) {
      navigate("/unauthorized");
    }
  }, [user, isLoading, allowedRoles, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role as "global_admin" | "university_admin")) {
    return null;
  }

  return <>{children}</>;
}
