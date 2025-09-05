"use client"

import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  __v: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  getUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("user");
    if (!token) return;
    
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, getUser: fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
