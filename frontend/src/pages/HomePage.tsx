import ProductList from "../components/features/product-list/ProductList";
import { StrapiProductService } from "../services/StrapiProductService";
// import { MockDataProductService } from "../services/MockDataProductServi,ce"

const _numberToLoad: number = 8;
const productService = new StrapiProductService(_numberToLoad);

export default function HomePage() {
  return <ProductList service={productService} />;
}
