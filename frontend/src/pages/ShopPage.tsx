import ProductList from "../components/features/product-list/ProductList";
import { StrapiProductService } from "../services/StrapiProductService";

const _numberToLoad: number = 4;
const shopProductService = new StrapiProductService(_numberToLoad);

export default function ShopPage() {
  return (
    <>
      <ProductList service={shopProductService} />
    </>
  );
}
