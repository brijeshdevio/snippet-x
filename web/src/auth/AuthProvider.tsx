import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { getProfile } from "@/services/user.service";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { globalError } from "@/utils";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async function () {
      try {
        const response = await getProfile();
        if (response?.user) {
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (error: unknown) {
        globalError(error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const value = { user, isAuthenticated, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
