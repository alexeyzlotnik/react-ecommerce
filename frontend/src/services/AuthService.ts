import {
  IAuthService,
  LoginResponse,
  VerifyTokenResponse,
} from "@/lib/interfaces";

export class AuthService implements IAuthService {
  private BASE_URL = "http://localhost:3000";

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
      const response = await fetch(
        `${this.BASE_URL}/auth/login`,
        requestOptions
      );
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
      const response = await fetch(
        `${this.BASE_URL}/auth/verify`,
        requestOptions
      );
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
      const response = await fetch(`${this.BASE_URL}/auth/logout`, {
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

  async register(): Promise<{ status: string } | undefined> {
    return Promise.resolve(undefined);
  }

  async resetPassword(): Promise<{ status: string } | undefined> {
    return Promise.resolve(undefined);
  }
}
