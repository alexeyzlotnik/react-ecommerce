import {
  HeroSection,
  ProductsSection,
  FeaturesSection,
} from "../components/sections";
import { StrapiProductService } from "../services/StrapiProductService";

const _numberToLoad: number = 4;
const featuredProductService = new StrapiProductService(_numberToLoad);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection service={featuredProductService} />
      <FeaturesSection />
    </>
  );
}
