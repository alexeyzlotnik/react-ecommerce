// import { mockProducts } from "../data/data";
import { strapi } from "@strapi/client";
import { IProductService } from "@/lib/interfaces";

import {
  Product,
  ProductResponse,
  ProductCanLoadMore,
} from "@/lib/definitions";

interface FetchClientProps {
  type: "products" | "product";
  method: "GET";
}

export class StrapiProductService implements IProductService {
  private loadedCount: number;
  private totalAvailable: number;
  private numberToLoad: number;
  private offset: number;
  private STRAPI_BASE_URL: string;
  private STRAPI_API_TOKEN: string;

  constructor(numberToLoad: number) {
    this.loadedCount = 0;
    this.totalAvailable = 0; // Will be set after first API call
    this.numberToLoad = numberToLoad ?? 4;
    this.offset = 0;
    this.STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL || "";
    this.STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || "";
  }

  private setOffset(newVal: number): void {
    if (newVal < 0) return;
    this.offset = newVal;
  }

  private setLoadedCount(newVal: number): void {
    if (newVal < 0) return;
    this.loadedCount = newVal;
  }

  async fetchClient({
    type,
    method,
  }: FetchClientProps): Promise<ProductResponse | undefined> {
    const client = strapi({
      baseURL: this.STRAPI_BASE_URL,
      auth: this.STRAPI_API_TOKEN,
    });

    try {
      // Build the URL with query parameters according to Strapi docs
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

      const url = `${type}?${query.toString()}`;
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

  async getProducts(): Promise<ProductResponse | undefined> {
    const products = await this.fetchClient({
      type: "products",
      method: "GET",
    });

    if (products?.data?.length === 0) return undefined;

    this.setOffset(this.offset + this.numberToLoad);
    this.setLoadedCount(this.loadedCount + (products?.data?.length || 0));

    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    try {
      const product = await this.fetchClient({
        type: "product",
        method: "GET",
      });
      return product?.data?.find((p: Product) => p.id === id);
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
