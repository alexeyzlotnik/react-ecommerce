import { mockProducts } from "../data/data";
import {
  Product,
  ProductResponse,
  ProductCanLoadMore,
} from "@/lib/definitions";

export class ProductService {
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
    console.log("setOffset method", newVal);
    if (newVal < 0) return;

    this.offset = newVal;
  }

  private setLoadedCount(newVal: number): void {
    console.log("setLoadedCount method", newVal);
    if (newVal < 0) return;

    this.loadedCount = newVal;
  }

  getProducts(): ProductResponse {
    // call the endpoint here
    console.log("offset", this.offset);
    console.log("loadedCount", this.loadedCount);
    const data = mockProducts.slice(
      this.offset,
      this.offset + this.numberToLoad
    );
    // console.log(data)

    this.setOffset(this.offset + this.numberToLoad);
    this.setLoadedCount(this.loadedCount + data.length);

    return {
      data: data,
      total: mockProducts?.length,
    };
  }

  getProduct(id: number): Product | undefined {
    if (!id) throw new Error("no product found");

    return mockProducts.find(el => el.id === id);
  }

  canLoadMore(): ProductCanLoadMore {
    return {
      value: this.loadedCount < this.totalAvailable,
      count: this.totalAvailable - this.loadedCount,
    };
  }
}
