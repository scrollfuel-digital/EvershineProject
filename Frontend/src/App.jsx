import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Floating Buttons
import WhatsAppButton from "./components/home/WhatsappButton";
import CallButton from "./components/home/CallButton";
import Home from "./pages/Homepage/Home";
import Categories from "./pages/catergoriespage/Categories";
import Airbubbleinsulation from "./pages/productpage/Airbubbleinsulation";
import AllCategories from "./pages/catergoriespage/AllCategories";
import ProductList from "./pages/productpage/ProductList";
import ProductDetails from "./pages/productpage/ProductDetails";
import Products from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product-details" element={<Products />} />
        <Route path="/category/:categoryName" element={<Products />} />
        <Route path="/product/:id" element={<Products />} />

        {/* Category Routes rendering Product Details design */}
        <Route path="/deck-sheet" element={<Products />} />
        <Route path="/gi-angle" element={<Products />} />
        <Route path="/baregalvalume-profile-sheet" element={<Products />} />
        <Route path="/alumium-profile-sheet" element={<Products />} />
        <Route path="/crimping-profile-sheet" element={<Products />} />
        <Route path="/gc-sheet" element={<Products />} />
        <Route path="/lovres" element={<Products />} />
        <Route path="/multiwall-sheet" element={<Products />} />
        <Route path="/peb-structure" element={<Products />} />
        <Route path="/poly-sheet" element={<Products />} />
        <Route path="/ppgl-ppgi" element={<Products />} />
        <Route path="/puff-panel" element={<Products />} />
        <Route path="/standing-seam" element={<Products />} />

        {/* Specialty Pages */}
        <Route path="/air-bubble-insulation" element={<Airbubbleinsulation />} />
        <Route path="/all-categories" element={<AllCategories />} />
      </Routes>

      <Footer />

      {/* Floating Buttons */}
      <CallButton />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;