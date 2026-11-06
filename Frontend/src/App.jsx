import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Admin Panel
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminContent from "./pages/Admin/AdminContent";
import { FilterProvider } from "./context/FilterContext";

// ScrollToTop Helper Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Floating Buttons
import WhatsAppButton from "./components/layout/WhatsappButton";
import CallButton from "./components/layout/CallButton";

// Pages
import Home from "./pages/Homepage/Home";
import About from "./pages/Aboutpage/About";
import Contact from "./pages/Contactpage/Contact";
import Categories from "./pages/catergoriespage/Categories";
import AllCategories from "./pages/catergoriespage/AllCategories";
import Products from "./pages/Products";
import ProductDetails from "./pages/productpage/ProductDetails";
import Blogs from "./pages/Blogspage/Blogs";

function AppContent() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Admin Portal Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path=":section/:subSection" element={<AdminContent />} />
          <Route path=":section" element={<AdminContent />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product-details" element={<Products />} />
        <Route path="/category/:categoryName" element={<Products />} />

        {/* Dynamic Hierarchical Product Routes */}
        <Route path="/allproduct/mildsteel" element={<Products />} />
        <Route path="/allproduct/mildsteel/:slug" element={<Products />} />
        <Route path="/allproduct/:category" element={<Products />} />
        <Route path="/allproduct/:category/:slug" element={<Products />} />

        {/* Specialty Pages & Catch-All Fallback */}
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/allcategories" element={<AllCategories />} />
        <Route path="*" element={<Products />} />
      </Routes>

      {!isAdmin && (
        <>
          <Footer />
          {/* Floating Buttons */}
          <CallButton />
          <WhatsAppButton />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <AppContent />
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;
