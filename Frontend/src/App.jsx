import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Authentication & Protected Routes
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

// Cart Context & Components
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/cart/CartDrawer";
import CartToast from "./components/cart/CartToast";
import CartPage from "./pages/Cart/CartPage";

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
import BlogDetails from "./pages/Blogspage/BlogDetails";
import PolicyPage from "./pages/Policypage/PolicyPage";

function AppContent() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const isAuth =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/forgotpassword") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/resetpassword");
  const hideLayout = isAdmin || isAuth;

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Admin Portal Routes (Restricted strictly to ROLE_ADMIN) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path=":section/:subSection" element={<AdminContent />} />
          <Route path=":section" element={<AdminContent />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Public Application Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product-details" element={<Products />} />
        <Route path="/category/:categoryName" element={<Products />} />

        {/* Policy Routes */}
        <Route path="/policy/:slug" element={<PolicyPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/policies/:slug" element={<PolicyPage />} />
        <Route path="/policies" element={<PolicyPage />} />

        {/* Dynamic Hierarchical Product Routes */}
        <Route path="/allproduct/mildsteel" element={<Products />} />
        <Route path="/allproduct/mildsteel/:slug" element={<Products />} />
        <Route path="/allproduct/:category" element={<Products />} />
        <Route path="/allproduct/:category/:slug" element={<Products />} />

        {/* Specialty Pages & Catch-All Fallback */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/allcategories" element={<AllCategories />} />
        <Route path="*" element={<Products />} />
      </Routes>

      {/* Slide-over Enquiry Cart Drawer & Bottom Toast Notification */}
      <CartDrawer />
      <CartToast />

      {!hideLayout && (
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
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <AppContent />
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
