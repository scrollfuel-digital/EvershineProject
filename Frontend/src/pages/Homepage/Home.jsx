import React from "react";

// Home Page Section Components
import Hero from "./Home/Hero";
import BrandShowcase from "./Home/BrandShowcase";
import CategoryShowcase from "./Home/CategoryShowcase";
import ProductSlider from "./Home/ProductSlider";
import FromOurCustomers from "./Home/FromOurCustomers";
import QuickQuoteCalculator from "./Home/QuickQuoteCalculator";


const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. Dynamic Dual-Column Hero with Synchronized Material Spotlight */}
      <Hero />

      {/* 2. Interactive Category Catalog Matrix with Sector Tabs (Full Product Matrix) */}
      <CategoryShowcase />

      {/* 3. Official Brand Partners & Direct Mill Sourcing Network */}
      <BrandShowcase />

      {/* 4. Streamlined Material Specification Slider */}
      <ProductSlider />

      {/* 5. Customer Video Spotlight & Verified Testimonials */}
      <FromOurCustomers />

      {/* 6. Interactive B2B Steel Requirement & Price Calculator */}
      <QuickQuoteCalculator />
    </div>
  );
};

export default Home;