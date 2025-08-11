import ProductList from "../components/features/product-list/ProductList";
import { StrapiProductService } from "../services/StrapiProductService";
import { useParams } from "react-router";

const _numberToLoad: number = 4;
const productService = new StrapiProductService(_numberToLoad);

export default function CategoryPage() {
  const { category } = useParams();

  return <ProductList service={productService} category={category || null} />;
}
