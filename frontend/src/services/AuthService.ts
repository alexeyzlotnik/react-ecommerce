import { IAuthService } from "@/lib/interfaces";
import { LoginResponse, VerifyTokenResponse } from "@/lib/definitions";

export class AuthService implements IAuthService {
  private BASE_URL = "http://localhost:3001/api/auth";

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include" as RequestCredentials,
    };

    try {
      const response = await fetch(`${this.BASE_URL}/login`, requestOptions);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async verifyToken(): Promise<VerifyTokenResponse> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include" as RequestCredentials,
    };

    try {
      const response = await fetch(`${this.BASE_URL}/verify`, requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Token verification error:", error);
      return { valid: false, message: "Token verification failed" };
    }
  }

  getToken(): string | null {
    // Always return null - we don't need client-side token access
    return null;
  }

  isTokenExpired(): boolean {
    // Always return false - rely on server validation
    return false;
  }

  async logout(): Promise<void> {
    try {
      // Call backend logout endpoint to invalidate token
      const response = await fetch(`${this.BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async register({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
      credentials: "include" as RequestCredentials,
    };

    try {
      const response = await fetch(`${this.BASE_URL}/register`, requestOptions);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  async resetPassword(): Promise<{ status: string } | undefined> {
    return Promise.resolve(undefined);
  }

  async getUsers(): Promise<{ success: boolean; users: any[] }> {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include" as RequestCredentials,
    };

    try {
      const response = await fetch(`${this.BASE_URL}/users`, requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get users error:", error);
      throw error;
    }
  }
}
