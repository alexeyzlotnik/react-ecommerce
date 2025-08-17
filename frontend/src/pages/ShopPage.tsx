import ProductList from "../components/features/product-list/ProductList";
import { StrapiProductService } from "../services/StrapiProductService";

const shopProductService = new StrapiProductService();

export default function ShopPage() {
  return (
    <>
      <ProductList service={shopProductService} limit={8} />
    </>
  );
}
