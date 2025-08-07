import { ProductCanLoadMore, Product, ProductResponse } from "./definitions";

export interface IProductService {
  getProducts(): Promise<ProductResponse | undefined>;
  getProduct(id: number): Promise<Product | undefined>;
  canLoadMore(): ProductCanLoadMore;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export interface VerifyTokenResponse {
  valid: boolean;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  message?: string;
}

export interface IAuthService {
  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse>;
  verifyToken(): Promise<VerifyTokenResponse>;
  logout(): Promise<void>;
  register(): Promise<{ status: string } | undefined>;
  resetPassword(): Promise<{ status: string } | undefined>;
}
