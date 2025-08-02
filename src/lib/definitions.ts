export interface Product {
  id: number;
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
  category: "sunglasses" | "eyeglasses" | "reading-glasses";
  frameType: "full-rim" | "half-rim" | "rimless";
  frameShape:
    | "rectangular"
    | "round"
    | "square"
    | "cat-eye"
    | "aviator"
    | "wayfarer";
  frameMaterial: "plastic" | "metal" | "titanium" | "acetate";
  lensColor: string;
  lensType: "single-vision" | "bifocal" | "progressive" | "transition";
  size: "small" | "medium" | "large";
  gender: "men" | "women" | "unisex";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  features: string[];
}

export interface ProductResponse {
  data: Product[];
  total: number;
}

export interface ProductCanLoadMore {
  value: boolean;
  count: number;
}

export interface CartProduct {
  id: number;
  name: string;
  brand: string;
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
