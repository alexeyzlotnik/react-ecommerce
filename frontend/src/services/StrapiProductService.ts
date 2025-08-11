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

      return {
        data: result?.data || [],
        total: result?.meta?.pagination?.total || 0,
      };
    } catch (error) {
      console.error(`Error happened while fetching ${type}`, error);
      return undefined;
    }
  }

  async getProducts(filters?: {
    category?: string;
  }): Promise<ProductsListResponse | undefined> {
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

    if (Array.isArray(products?.data)) {
      if (products?.data?.length === 0) return undefined;
    } else {
      return undefined;
    }

    this.setOffset(this.offset + this.numberToLoad);
    if (Array.isArray(products?.data)) {
      this.setLoadedCount(this.loadedCount + (products?.data?.length || 0));
    }
    this.totalAvailable = products?.total || 0;

    return products as ProductsListResponse;
  }

  async getProduct(id: string): Promise<SingleProductResponse | undefined> {
    try {
      const query = new URLSearchParams({
        "populate[image][fields][0]": "url",
        "populate[image][fields][1]": "name",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
      });

      const product = await this.fetchClient({
        type: `products/${id}`,
        method: "GET",
        query: query,
      });

      console.log(product);
      return (product as SingleProductResponse) ?? undefined;
    } catch (error) {
      console.log("Error fetching product:", error);
      return undefined;
    }
  }

  canLoadMore(): ProductCanLoadMore {
    return {
      value: this.loadedCount < this.totalAvailable,
      count: this.totalAvailable - this.loadedCount,
    };
  }
}
