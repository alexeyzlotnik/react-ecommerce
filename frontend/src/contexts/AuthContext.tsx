import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthService } from "../services/AuthService";
import {
  LoginResponse,
  RegisterResponse,
  VerifyTokenResponse,
} from "../lib/definitions";

interface User {
  id: number;
  email: string;
  name: string;
}

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  users: User[]; // Add users list
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (payload: RegisterProps) => Promise<RegisterResponse>;
  logout: () => void;
  verifyToken: () => Promise<void>;
  loadUsers: () => Promise<void>; // Add function to load users
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]); // Add users state
  const [isLoading, setIsLoading] = useState(true);
  const authService = new AuthService();

  // Load users from backend and save to localStorage
  const loadUsers = async () => {
    try {
      const response = await authService.getUsers();
      if (response.success) {
        setUsers(response.users);
        // Save to localStorage
        localStorage.setItem("users", JSON.stringify(response.users));
      }
    } catch (error) {
      console.error("Failed to load users:", error);
      // Try to load from localStorage as fallback
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        try {
          setUsers(JSON.parse(storedUsers));
        } catch (parseError) {
          console.error("Error parsing stored users:", parseError);
        }
      }
    }
  };

  const verifyToken = async () => {
    try {
      // Server-side verification only
      const response: VerifyTokenResponse = await authService.verifyToken();

      if (response.valid && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
        authService.logout(); // Clear invalid token
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      setUser(null);
      authService.logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const response = await authService.login({ email, password });

      if (response.success && response.user) {
        setUser(response.user);
      }

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (
    payload: RegisterProps
  ): Promise<RegisterResponse> => {
    console.log("register");
    try {
      const response = await authService.register(payload);

      if (response.success && response.user) {
        // Add new user to users list and update localStorage
        const newUser = response.user;
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }

      return response;
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local state
      setUser(null);
    }
  };

  // Check authentication status on app load
  useEffect(() => {
    const initializeApp = async () => {
      // Load users first
      await loadUsers();
      // Then verify token
      await verifyToken();
    };

    initializeApp();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    users, // Add users to context
    login,
    logout,
    register,
    verifyToken,
    loadUsers, // Add loadUsers to context
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
