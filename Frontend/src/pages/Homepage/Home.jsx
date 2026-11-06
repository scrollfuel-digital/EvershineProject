import React from "react";

// Home Page Section Components
import Hero from "./Home/Hero";
import BrandShowcase from "./Home/BrandShowcase";
import CategoryProducts from "./Home/CategoryProducts";
import RecentBlogs from "./Home/RecentBlogs";
import FromOurCustomers from "./Home/FromOurCustomers";

const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. Dynamic Dual-Column Hero with Synchronized Material Spotlight */}
      <Hero />

      {/* 2. Official Brand Partners & Direct Mill Sourcing Network */}
      <BrandShowcase />

      {/* 3. Category Associated Products Showcase */}
      <CategoryProducts />

      {/* 4. Recent Blogs Showcase */}
      <RecentBlogs />

      {/* 5. Customer Video Spotlight & Verified Testimonials */}
      <FromOurCustomers />
    </div>
  );
};

export default Home;