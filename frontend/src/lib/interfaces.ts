import {
  ProductCanLoadMore,
  ProductResponse,
  LoginResponse,
  RegisterResponse,
  VerifyTokenResponse,
  SingleProductResponse,
} from "./definitions";

export interface IProductService {
  getProducts(filters?: {
    category?: string | null;
    offset?: number;
    limit?: number;
  }): Promise<ProductResponse>;
  getProduct(id: string): Promise<SingleProductResponse | undefined>;
  searchProducts({
    name,
  }: {
    name: string;
  }): Promise<ProductResponse | undefined>;
  canLoadMore(): ProductCanLoadMore;
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
  register({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<RegisterResponse>;
  getUsers(): Promise<{ success: boolean; users: unknown[] }>; // Add this method
  resetPassword(): Promise<{ status: string } | undefined>;
}
