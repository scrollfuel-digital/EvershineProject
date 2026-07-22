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
import About from "./pages/Aboutpage/About";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryName" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Category Pages */}
        <Route
          path="/air-bubble-insulation"
          element={<Airbubbleinsulation />}
        />
        <Route path="/all-categories" element={<AllCategories />} />
        {/* <Route path="/:slug" element={<CategoryPage />} /> */}
      </Routes>

      <Footer />

      {/* Floating Buttons */}
      <CallButton />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;