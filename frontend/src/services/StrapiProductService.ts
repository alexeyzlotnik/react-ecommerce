import {
  ProductResponse,
  SingleProductResponse,
  ProductCanLoadMore,
  Product,
} from "@/lib/definitions";
import { IProductService } from "@/lib/interfaces";
import { strapi } from "@strapi/client";

interface FetchClientProps {
  type: "products" | `products/${string}`;
  method: "GET";
  query?: URLSearchParams;
}

export class StrapiProductService implements IProductService {
  private STRAPI_BASE_URL: string;
  private STRAPI_API_TOKEN: string;

  constructor() {
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

  async fetchClient({ type, method, query }: FetchClientProps): Promise<{
    data: unknown[];
    total: number;
  }> {
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
    offset?: number;
    limit?: number;
  }): Promise<ProductResponse> {
    try {
      const offset = filters?.offset || 0;
      const limit = filters?.limit || 4;

      const query = new URLSearchParams({
        "populate[image][fields][0]": "url",
        "populate[image][fields][1]": "name",
        "populate[image_thumbnail][fields][0]": "url",
        "populate[image_thumbnail][fields][1]": "name",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
        "pagination[start]": offset.toString(),
        "pagination[limit]": limit.toString(),
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
        return {
          data: [],
          pagination: {
            offset,
            limit,
            total: 0,
            hasMore: false,
            nextOffset: offset,
          },
        };
      }

      if (Array.isArray(products?.data)) {
        if (products?.data?.length === 0) {
          console.log("Products array is empty");
          return {
            data: [],
            pagination: {
              offset,
              limit,
              total: products.total || 0,
              hasMore: false,
              nextOffset: offset,
            },
          };
        }
      } else {
        console.warn("Products data is not an array:", typeof products.data);
        return {
          data: [],
          pagination: {
            offset,
            limit,
            total: 0,
            hasMore: false,
            nextOffset: offset,
          },
        };
      }

      const total = products?.total || 0;
      const nextOffset = offset + limit;
      const hasMore = nextOffset < total;

      return {
        data: products.data as Product[],
        pagination: {
          offset,
          limit,
          total,
          hasMore,
          nextOffset,
        },
      };
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
  }): Promise<ProductResponse | undefined> {
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

      // Return with pagination info
      return {
        data: products.data as Product[],
        pagination: {
          offset: 0,
          limit: 20,
          total: products.total || 0,
          hasMore: false,
          nextOffset: 0,
        },
      };
    } catch (error) {
      console.error("Error in searchProducts:", error);
      throw error;
    }
  }

  // This method is no longer needed since pagination info comes with the response
  // But keeping it for backward compatibility - you can remove it later
  canLoadMore(): ProductCanLoadMore {
    // This should not be used anymore - pagination info comes from getProducts response
    console.warn(
      "canLoadMore() is deprecated. Use pagination info from getProducts response instead."
    );
    return {
      value: false,
      count: 0,
    };
  }
}
