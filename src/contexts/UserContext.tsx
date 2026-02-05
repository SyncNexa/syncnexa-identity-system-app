"use client";
import React, { createContext, useContext, useState } from "react";
import { API_ROUTES } from "@/routes/paths";
import useFetch from "@/hooks/useFetch";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => console.log("Use inside of UserProvider"),
  updateUser: () => console.log("Use inside of UserProvider"),
  loading: false,
  error: null,
  refetch: async () => console.log("Use inside of UserProvider"),
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, error, refetch } = useFetch<User>(API_ROUTES.USER_ME);
  const [user, setUser] = useState<User | null>(data);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  // Sync user state with fetched data
  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
