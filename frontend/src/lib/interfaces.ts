import {
  ProductCanLoadMore,
  ProductResponse,
  LoginResponse,
  RegisterResponse,
  VerifyTokenResponse,
  ProductsListResponse,
} from "./definitions";

export interface IProductService {
  getProducts(filters?: {
    category?: string | null;
  }): Promise<ProductResponse | undefined>;
  getProduct(id: string): Promise<ProductResponse | undefined>;
  searchProducts({
    name,
  }: {
    name: string;
  }): Promise<ProductsListResponse | undefined>;
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
  getUsers(): Promise<{ success: boolean; users: any[] }>; // Add this method
  resetPassword(): Promise<{ status: string } | undefined>;
}
