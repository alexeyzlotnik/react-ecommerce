import "./app.css";
import ProductList from "../components/features/product-list/ProductList";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { StrapiProductService } from "../services/StrapiProductService";

const _numberToLoad: number = 4;
const productService = new StrapiProductService(_numberToLoad);

function App() {
  return (
    <>
      <DefaultLayout>
        <ProductList service={productService} />
      </DefaultLayout>
    </>
  );
}

export default App;
