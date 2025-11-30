import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth";

export default function RestrictedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
