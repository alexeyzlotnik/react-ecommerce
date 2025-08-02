import { ProductCanLoadMore, Product, ProductResponse } from "./definitions";

export interface IProductService {
  getProducts(): Promise<ProductResponse | undefined>;
  getProduct(id: number): Promise<Product | undefined>;
  canLoadMore(): ProductCanLoadMore;
}
