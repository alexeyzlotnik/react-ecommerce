export interface Product {
  id: number;
  name: string;
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
  data: Product[];
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
