import React from "react";
import ScrollReveal from "../../components/ui/ScrollReveal";

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
      <ScrollReveal duration={1200} distance={40}>
        <BrandShowcase />
      </ScrollReveal>

      {/* 3. Category Associated Products Showcase */}
      <ScrollReveal duration={1200} distance={40}>
        <CategoryProducts />
      </ScrollReveal>

      {/* 4. Recent Blogs Showcase */}
      <ScrollReveal duration={1200} distance={40}>
        <RecentBlogs />
      </ScrollReveal>

      {/* 5. Customer Video Spotlight & Verified Testimonials */}
      <ScrollReveal duration={1200} distance={40}>
        <FromOurCustomers />
      </ScrollReveal>
    </div>
  );
};

export default Home;