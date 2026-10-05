import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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
import Blogs from "./pages/Blogspage/Blogs";

// Dedicated Product Pages in productpage folder
import AccessoriesPage from "./pages/productpage/MoreProducts/AccessoriesPage";
import Airbubbleinsulation from "./pages/productpage/MoreProducts/Airbubbleinsulation";
import AluminiumProfileSheetPage from "./pages/productpage/MoreProducts/AluminiumProfileSheetPage";
import BaregalvalumeProfileSheetPage from "./pages/productpage/MoreProducts/BaregalvalumeProfileSheetPage";
import CrimpingProfileSheetPage from "./pages/productpage/MoreProducts/CrimpingProfileSheetPage";
import DeckSheetPage from "./pages/productpage/MoreProducts/DeckSheetPage";
import GCSheetPage from "./pages/productpage/MoreProducts/GCSheetPage";
import GIAnglePage from "./pages/productpage/MoreProducts/GIAnglePage";
import LouvresPage from "./pages/productpage/MoreProducts/LouvresPage";
import MultiwallSheetPage from "./pages/productpage/MoreProducts/MultiwallSheetPage";
import PEBStructurePage from "./pages/productpage/MoreProducts/PEBStructurePage";
import PolySheetPage from "./pages/productpage/MoreProducts/PolySheetPage";
import PPGLPPGIPage from "./pages/productpage/MoreProducts/PPGLPPGIPage";
import PuffPanelPage from "./pages/productpage/MoreProducts/PuffPanelPage";
import StandingSeamPage from "./pages/productpage/MoreProducts/StandingSeamPage";
import TileProfilePage from "./pages/productpage/MoreProducts/TileProfilePage";
import TurboVentilatorsPage from "./pages/productpage/MoreProducts/TurboVentilatorsPage";
import XLPEPage from "./pages/productpage/MoreProducts/XLPEPage";
import ZPurlinCPurlinPage from "./pages/productpage/MoreProducts/ZPurlinCPurlinPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product-details" element={<Products />} />
        <Route path="/category/:categoryName" element={<Products />} />
        <Route path="/product/:id" element={<Products />} />

        {/* Dedicated Hierarchical Category Routes */}
        <Route path="/allproduct/mildsteel/accessories" element={<AccessoriesPage />} />
        <Route path="/allproduct/mildsteel/air-bubble-insulation" element={<Airbubbleinsulation />} />
        <Route path="/allproduct/mildsteel/alumium-profile-sheet" element={<AluminiumProfileSheetPage />} />
        <Route path="/allproduct/mildsteel/aluminium-profile-sheet" element={<AluminiumProfileSheetPage />} />
        <Route path="/allproduct/mildsteel/baregalvalume-profile-sheet" element={<BaregalvalumeProfileSheetPage />} />
        <Route path="/allproduct/mildsteel/crimping-profile-sheet" element={<CrimpingProfileSheetPage />} />
        <Route path="/allproduct/mildsteel/deck-sheet" element={<DeckSheetPage />} />
        <Route path="/allproduct/mildsteel/gc-sheet" element={<GCSheetPage />} />
        <Route path="/allproduct/mildsteel/gi-angle" element={<GIAnglePage />} />
        <Route path="/allproduct/mildsteel/lovres" element={<LouvresPage />} />
        <Route path="/allproduct/mildsteel/louvres" element={<LouvresPage />} />
        <Route path="/allproduct/mildsteel/louvers" element={<LouvresPage />} />
        <Route path="/allproduct/mildsteel/multiwall-sheet" element={<MultiwallSheetPage />} />
        <Route path="/allproduct/mildsteel/peb-structure" element={<PEBStructurePage />} />
        <Route path="/allproduct/mildsteel/poly-sheet" element={<PolySheetPage />} />
        <Route path="/allproduct/mildsteel/ppgl-ppgi" element={<PPGLPPGIPage />} />
        <Route path="/allproduct/mildsteel/ppgl-ppgi-profile-sheet" element={<PPGLPPGIPage />} />
        <Route path="/allproduct/mildsteel/puff-panel" element={<PuffPanelPage />} />
        <Route path="/allproduct/mildsteel/puff-panel-sheet" element={<PuffPanelPage />} />
        <Route path="/allproduct/mildsteel/standing-seam" element={<StandingSeamPage />} />
        <Route path="/allproduct/mildsteel/standing-seam-roofing" element={<StandingSeamPage />} />
        <Route path="/allproduct/mildsteel/tile-profile" element={<TileProfilePage />} />
        <Route path="/allproduct/mildsteel/tile-profile-sheet" element={<TileProfilePage />} />
        <Route path="/allproduct/mildsteel/turbo-ventilators" element={<TurboVentilatorsPage />} />
        <Route path="/allproduct/mildsteel/xlpe" element={<XLPEPage />} />
        <Route path="/allproduct/mildsteel/xlpe-foam-insulation" element={<XLPEPage />} />
        <Route path="/allproduct/mildsteel/z-purlin-cpurlin" element={<ZPurlinCPurlinPage />} />
        <Route path="/allproduct/mildsteel/z-c-purlin" element={<ZPurlinCPurlinPage />} />

        {/* Root Alias Routes */}
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/air-bubble-insulation" element={<Airbubbleinsulation />} />
        <Route path="/alumium-profile-sheet" element={<AluminiumProfileSheetPage />} />
        <Route path="/aluminium-profile-sheet" element={<AluminiumProfileSheetPage />} />
        <Route path="/baregalvalume-profile-sheet" element={<BaregalvalumeProfileSheetPage />} />
        <Route path="/crimping-profile-sheet" element={<CrimpingProfileSheetPage />} />
        <Route path="/crimping" element={<CrimpingProfileSheetPage />} />
        <Route path="/deck-sheet" element={<DeckSheetPage />} />
        <Route path="/gc-sheet" element={<GCSheetPage />} />
        <Route path="/gi-angle" element={<GIAnglePage />} />
        <Route path="/lovres" element={<LouvresPage />} />
        <Route path="/louvres" element={<LouvresPage />} />
        <Route path="/louvers" element={<LouvresPage />} />
        <Route path="/multiwall-sheet" element={<MultiwallSheetPage />} />
        <Route path="/multi-wall-sheets" element={<MultiwallSheetPage />} />
        <Route path="/peb-structure" element={<PEBStructurePage />} />
        <Route path="/poly-sheet" element={<PolySheetPage />} />
        <Route path="/polycarbonate-sheets" element={<PolySheetPage />} />
        <Route path="/ppgl-ppgi" element={<PPGLPPGIPage />} />
        <Route path="/puff-panel" element={<PuffPanelPage />} />
        <Route path="/puff-panal" element={<PuffPanelPage />} />
        <Route path="/standing-seam" element={<StandingSeamPage />} />
        <Route path="/tile-profile" element={<TileProfilePage />} />
        <Route path="/turbo-ventilators" element={<TurboVentilatorsPage />} />
        <Route path="/xlpe" element={<XLPEPage />} />
        <Route path="/z-purlin-cpurlin" element={<ZPurlinCPurlinPage />} />
        <Route path="/carrugated-sheets" element={<AluminiumProfileSheetPage />} />
        <Route path="/corrugated-sheets" element={<AluminiumProfileSheetPage />} />
        <Route path="/trapezodial-sheets" element={<AluminiumProfileSheetPage />} />
        <Route path="/trapezoidal-sheets" element={<AluminiumProfileSheetPage />} />

        {/* Dynamic Nested Hierarchical Product Routes (Wildcard Fallbacks) */}
        <Route path="/allproduct/mildsteel" element={<Products />} />
        <Route path="/allproduct/mildsteel/:slug" element={<Products />} />
        <Route path="/allproduct/:category" element={<Products />} />
        <Route path="/allproduct/:category/:slug" element={<Products />} />

        {/* Specialty Pages & Catch-All Fallback */}
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/allcategories" element={<AllCategories />} />
        <Route path="*" element={<Products />} />
      </Routes>

      <Footer />

      {/* Floating Buttons */}
      <CallButton />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;