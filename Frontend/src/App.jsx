import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Airbubbleinsulation from "./pages/Airbubbleinsulation";
import CategoryPage from "./pages/CategoryPage";
import AllCategories from "./pages/AllCategories";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Floating Buttons
import WhatsAppButton from "./components/home/WhatsappButton";
import CallButton from "./components/home/CallButton";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryName" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Category Pages */}
        <Route
          path="/air-bubble-insulation"
          element={<Airbubbleinsulation />}
        />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/:slug" element={<CategoryPage />} />
      </Routes>

      <Footer />

      {/* Floating Buttons */}
      <CallButton />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;