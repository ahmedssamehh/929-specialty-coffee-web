import Hero from "@/components/hero/Hero";
import BrandValues from "@/components/home/BrandValues";
import LocationsSection from "@/components/home/LocationsSection";
import SignatureDrinks from "@/components/home/SignatureDrinks";
import Subscription from "@/components/subscription/Subscription";
import InstagramSection from "@/components/home/InstagramSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandValues />
      <LocationsSection />
      <SignatureDrinks />
      <Subscription />
      <InstagramSection />
    </>
  );
}
