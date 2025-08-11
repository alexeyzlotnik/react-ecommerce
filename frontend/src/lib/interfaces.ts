import {
  ProductCanLoadMore,
  ProductResponse,
  LoginResponse,
  VerifyTokenResponse,
} from "./definitions";

export interface IProductService {
  getProducts(filters?: {
    category?: string | null;
  }): Promise<ProductResponse | undefined>;
  getProduct(id: string): Promise<ProductResponse | undefined>;
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
  register(): Promise<{ status: string } | undefined>;
  resetPassword(): Promise<{ status: string } | undefined>;
}
