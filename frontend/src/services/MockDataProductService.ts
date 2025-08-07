import { mockProducts } from "../data/data";
import {
  Product,
  ProductResponse,
  ProductCanLoadMore,
} from "@/lib/definitions";

import { IProductService } from "@/lib/interfaces";

export class MockDataProductService implements IProductService {
  private loadedCount: number;
  private totalAvailable: number;
  private numberToLoad: number;
  private offset: number;

  constructor(numberToLoad: number) {
    this.loadedCount = 0;
    this.totalAvailable = mockProducts.length ?? 0;
    this.numberToLoad = numberToLoad ?? 4;
    this.offset = 0;
  }

  private setOffset(newVal: number): void {
    // console.log("setOffset method", newVal);
    if (newVal < 0) return;

    this.offset = newVal;
  }

  private setLoadedCount(newVal: number): void {
    // console.log("setLoadedCount method", newVal);
    if (newVal < 0) return;

    this.loadedCount = newVal;
  }

  async getProducts(): Promise<ProductResponse | undefined> {
    const data = await new Promise<Product[]>(resolve => {
      setTimeout(() => {
        resolve(
          mockProducts.slice(this.offset, this.offset + this.numberToLoad)
        );
      }, 300);
    });
    // console.log(data)

    this.setOffset(this.offset + this.numberToLoad);
    this.setLoadedCount(this.loadedCount + data.length);

    return {
      data: data,
      total: mockProducts?.length,
    };
  }

  async getProduct(id: number): Promise<Product | undefined> {
    if (!id) throw new Error("no product found");

    try {
      const data = await new Promise<Product | undefined>((resolve, reject) => {
        setTimeout(() => {
          const product = mockProducts.find(el => el.id === id);

          if (product) {
            resolve(product);
          } else {
            reject(new Error(`Product with id ${id} not found`));
          }
        }, 300);
      });

      return data;
    } catch (error) {
      console.log(`Error fetching product: ${id}`, error);
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
