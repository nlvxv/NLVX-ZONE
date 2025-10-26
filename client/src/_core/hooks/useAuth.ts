import { useCallback, useMemo } from "react";

// Mock useAuth hook for a public, unauthenticated site
export function useAuth() {
  const logout = useCallback(async () => {
    console.log("Mock logout called: No authentication to perform.");
  }, []);

  const state = useMemo(() => {
    return {
      user: { id: "public", name: "Public User" }, // Mock user object
      loading: false,
      error: null,
      isAuthenticated: true,
    };
  }, []);

  return {
    ...state,
    refresh: () => console.log("Mock refresh called: No authentication to perform."),
    logout,
  };
}
