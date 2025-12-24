import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth";
import { Loader } from "@/components";

export default function RestrictedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader className="h-screen" />;
  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
