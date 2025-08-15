export interface Product {
  id: number;
  documentId: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: Array<{
    url: string;
    name: string;
  }>;
  image_thumbnail: Array<{
    url: string;
    name: string;
  }>;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface ProductResponse {
  data: Product[] | Product;
  total: number;
}

// More specific types for different use cases
export interface ProductsListResponse {
  data: Product[];
  total: number;
}

export interface SingleProductResponse {
  data: Product;
  total: number;
}

export interface ProductCanLoadMore {
  value: boolean;
  count: number;
}

// TODO: it's the same as product int
export interface CartProduct {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  price: number;
  originalPrice?: number;
  image?: Array<{
    url: string;
    name: string;
  }>;
  image_thumbnail?: Array<{
    url: string;
    name: string;
  }>;
}

// Redux store types
export interface RootState {
  cart: CartProduct[];
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

export interface RegisterResponse {
  success: boolean;
  message: string;
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

export interface GetUsersResponse {
  success: boolean;
  users: User[];
}
