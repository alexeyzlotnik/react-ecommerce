import {
  HeroSection,
  ProductsSection,
  FeaturesSection,
} from "../components/sections";
import { StrapiProductService } from "../services/StrapiProductService";

const featuredProductService = new StrapiProductService();

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection service={featuredProductService} />
      <FeaturesSection />
    </>
  );
}
