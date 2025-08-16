import {
  ProductResponse,
  ProductsListResponse,
  SingleProductResponse,
  ProductCanLoadMore,
} from "@/lib/definitions";
import { IProductService } from "@/lib/interfaces";
import { strapi } from "@strapi/client";

interface FetchClientProps {
  type: "products" | `products/${string}`;
  method: "GET";
  query?: URLSearchParams;
}

export class StrapiProductService implements IProductService {
  private loadedCount: number;
  private totalAvailable: number;
  private numberToLoad: number;
  private offset: number;
  private STRAPI_BASE_URL: string;
  private STRAPI_API_TOKEN: string;

  constructor(numberToLoad?: number) {
    this.loadedCount = 0;
    this.totalAvailable = 0;
    this.numberToLoad = numberToLoad || 8;
    this.offset = 0;
    this.STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL || "";
    this.STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || "";

    // Validate environment variables
    if (!this.STRAPI_BASE_URL) {
      console.warn("VITE_STRAPI_BASE_URL is not set");
    }
    if (!this.STRAPI_API_TOKEN) {
      console.warn("VITE_STRAPI_API_TOKEN is not set");
    }
  }

  // Reset pagination state - useful when switching contexts
  public resetPagination(): void {
    this.offset = 0;
    this.loadedCount = 0;
    this.totalAvailable = 0;
  }

  // Get current pagination state for debugging
  public getPaginationState() {
    return {
      offset: this.offset,
      loadedCount: this.loadedCount,
      totalAvailable: this.totalAvailable,
      numberToLoad: this.numberToLoad,
    };
  }

  private setOffset(newVal: number): void {
    this.offset = newVal;
  }

  private setLoadedCount(newVal: number): void {
    this.loadedCount = newVal;
  }

  async fetchClient({
    type,
    method,
    query,
  }: FetchClientProps): Promise<ProductResponse | undefined> {
    if (!this.STRAPI_BASE_URL) {
      throw new Error("Strapi base URL is not configured");
    }

    const client = strapi({
      baseURL: this.STRAPI_BASE_URL,
      auth: this.STRAPI_API_TOKEN,
    });

    try {
      let url = `${type}`;
      if (query) {
        url += `?${query.toString()}`;
      }

      const data = await client.fetch(url, { method: method });
      const result = await data.json();

      if (!result) {
        throw new Error("Empty response from Strapi");
      }

      return {
        data: result?.data || [],
        total: result?.meta?.pagination?.total || 0,
      };
    } catch (error) {
      console.error(`Error happened while fetching ${type}:`, error);
      console.error(`URL: ${this.STRAPI_BASE_URL}/${type}`);
      console.error(`Query:`, query?.toString());
      throw error; // Re-throw to let calling code handle it
    }
  }

  async getProducts(filters?: {
    category?: string;
  }): Promise<ProductsListResponse | undefined> {
    try {
      const query = new URLSearchParams({
        "populate[image][fields][0]": "url",
        "populate[image][fields][1]": "name",
        "populate[image_thumbnail][fields][0]": "url",
        "populate[image_thumbnail][fields][1]": "name",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
        "pagination[start]": this.offset.toString(),
        "pagination[limit]": this.numberToLoad.toString(),
      });

      if (filters?.category) {
        query.set("filters[category][slug][$eq]", filters.category);
      }

      const products = await this.fetchClient({
        type: "products",
        method: "GET",
        query: query,
      });

      if (!products || !products.data) {
        console.warn("No products data received");
        return undefined;
      }

      if (Array.isArray(products?.data)) {
        if (products?.data?.length === 0) {
          console.log("Products array is empty");
          return undefined;
        }
      } else {
        console.warn("Products data is not an array:", typeof products.data);
        return undefined;
      }

      this.setOffset(this.offset + this.numberToLoad);
      if (Array.isArray(products?.data)) {
        this.setLoadedCount(this.loadedCount + (products?.data?.length || 0));
      }
      this.totalAvailable = products?.total || 0;

      return products as ProductsListResponse;
    } catch (error) {
      console.error("Error in getProducts:", error);
      throw error;
    }
  }

  async getProduct(id: string): Promise<SingleProductResponse | undefined> {
    if (!id) {
      throw new Error("Product ID is required");
    }

    try {
      const query = new URLSearchParams({
        "populate[image][fields][0]": "url",
        "populate[image][fields][1]": "name",
        "populate[image_thumbnail][fields][0]": "url",
        "populate[image_thumbnail][fields][1]": "name",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
      });

      const product = await this.fetchClient({
        type: `products/${id}`,
        method: "GET",
        query: query,
      });

      if (!product || !product.data) {
        console.warn(`No product data received for ID: ${id}`);
        return undefined;
      }

      // Ensure we have a single product, not an array
      if (Array.isArray(product.data)) {
        if (product.data.length === 0) {
          console.warn(`Product with ID ${id} not found`);
          return undefined;
        }
        // If it's an array, take the first item
        return {
          data: product.data[0],
          total: 1,
        } as SingleProductResponse;
      }

      return {
        data: product.data,
        total: 1,
      } as SingleProductResponse;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  async searchProducts({
    name,
  }: {
    name: string;
  }): Promise<ProductsListResponse | undefined> {
    try {
      const query = new URLSearchParams({
        "populate[image][fields][0]": "url",
        "populate[image][fields][1]": "name",
        "populate[image_thumbnail][fields][0]": "url",
        "populate[image_thumbnail][fields][1]": "name",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
        "pagination[limit]": "20", // Limit search results
      });

      if (!name || name.trim() === "") {
        return undefined;
      }

      // Use contains filter for partial matching instead of exact match
      query.set("filters[name][$containsi]", name.trim());

      const products = await this.fetchClient({
        type: "products",
        method: "GET",
        query: query,
      });

      if (!products || !products.data) {
        console.warn("No products data received");
        return undefined;
      }

      if (Array.isArray(products?.data)) {
        if (products?.data?.length === 0) {
          console.log("Products array is empty");
          return undefined;
        }
      } else {
        console.warn("Products data is not an array:", typeof products.data);
        return undefined;
      }
      return products as ProductsListResponse;
    } catch (error) {
      console.error("Error in searchProducts:", error);
      throw error;
    }
  }

  canLoadMore(): ProductCanLoadMore {
    return {
      value: this.loadedCount < this.totalAvailable,
      count: this.totalAvailable - this.loadedCount,
    };
  }
}
