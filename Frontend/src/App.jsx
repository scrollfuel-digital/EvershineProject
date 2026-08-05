import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Floating Buttons
import WhatsAppButton from "./components/home/WhatsappButton";
import CallButton from "./components/home/CallButton";

// Pages
import Home from "./pages/Homepage/Home";
import Categories from "./pages/catergoriespage/Categories";
import AllCategories from "./pages/catergoriespage/AllCategories";
import Products from "./pages/Products";

// Dedicated Product Pages in productpage folder
import AccessoriesPage from "./pages/productpage/AccessoriesPage";
import Airbubbleinsulation from "./pages/productpage/Airbubbleinsulation";
import AluminiumProfileSheetPage from "./pages/productpage/AluminiumProfileSheetPage";
import BaregalvalumeProfileSheetPage from "./pages/productpage/BaregalvalumeProfileSheetPage";
import CrimpingProfileSheetPage from "./pages/productpage/CrimpingProfileSheetPage";
import DeckSheetPage from "./pages/productpage/DeckSheetPage";
import GCSheetPage from "./pages/productpage/GCSheetPage";
import GIAnglePage from "./pages/productpage/GIAnglePage";
import LouvresPage from "./pages/productpage/LouvresPage";
import MultiwallSheetPage from "./pages/productpage/MultiwallSheetPage";
import PEBStructurePage from "./pages/productpage/PEBStructurePage";
import PolySheetPage from "./pages/productpage/PolySheetPage";
import PPGLPPGIPage from "./pages/productpage/PPGLPPGIPage";
import PuffPanelPage from "./pages/productpage/PuffPanelPage";
import StandingSeamPage from "./pages/productpage/StandingSeamPage";
import TileProfilePage from "./pages/productpage/TileProfilePage";
import TurboVentilatorsPage from "./pages/productpage/TurboVentilatorsPage";
import XLPEPage from "./pages/productpage/XLPEPage";
import ZPurlinCPurlinPage from "./pages/productpage/ZPurlinCPurlinPage";

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

        {/* Dynamic Nested Hierarchical Product Routes */}
        <Route path="/allproduct/mildsteel/:slug" element={<Products />} />
        <Route path="/allproduct/:category/:slug" element={<Products />} />

        {/* Dedicated Hierarchical Category Routes */}
        <Route path="/allproduct/mildsteel/accessories" element={<AccessoriesPage />} />
        <Route path="/allproduct/mildsteel/air-bubble-insulation" element={<Airbubbleinsulation />} />
        <Route path="/allproduct/mildsteel/alumium-profile-sheet" element={<AluminiumProfileSheetPage />} />
        <Route path="/allproduct/mildsteel/baregalvalume-profile-sheet" element={<BaregalvalumeProfileSheetPage />} />
        <Route path="/allproduct/mildsteel/crimping-profile-sheet" element={<CrimpingProfileSheetPage />} />
        <Route path="/allproduct/mildsteel/deck-sheet" element={<DeckSheetPage />} />
        <Route path="/allproduct/mildsteel/gc-sheet" element={<GCSheetPage />} />
        <Route path="/allproduct/mildsteel/gi-angle" element={<GIAnglePage />} />
        <Route path="/allproduct/mildsteel/lovres" element={<LouvresPage />} />
        <Route path="/allproduct/mildsteel/multiwall-sheet" element={<MultiwallSheetPage />} />
        <Route path="/allproduct/mildsteel/peb-structure" element={<PEBStructurePage />} />
        <Route path="/allproduct/mildsteel/poly-sheet" element={<PolySheetPage />} />
        <Route path="/allproduct/mildsteel/ppgl-ppgi" element={<PPGLPPGIPage />} />
        <Route path="/allproduct/mildsteel/puff-panel" element={<PuffPanelPage />} />
        <Route path="/allproduct/mildsteel/standing-seam" element={<StandingSeamPage />} />
        <Route path="/allproduct/mildsteel/tile-profile" element={<TileProfilePage />} />
        <Route path="/allproduct/mildsteel/turbo-ventilators" element={<TurboVentilatorsPage />} />
        <Route path="/allproduct/mildsteel/xlpe" element={<XLPEPage />} />
        <Route path="/allproduct/mildsteel/z-purlin-cpurlin" element={<ZPurlinCPurlinPage />} />

        {/* Legacy Root Category Routes */}
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/air-bubble-insulation" element={<Airbubbleinsulation />} />
        <Route path="/alumium-profile-sheet" element={<AluminiumProfileSheetPage />} />
        <Route path="/baregalvalume-profile-sheet" element={<BaregalvalumeProfileSheetPage />} />
        <Route path="/crimping-profile-sheet" element={<CrimpingProfileSheetPage />} />
        <Route path="/deck-sheet" element={<DeckSheetPage />} />
        <Route path="/gc-sheet" element={<GCSheetPage />} />
        <Route path="/gi-angle" element={<GIAnglePage />} />
        <Route path="/lovres" element={<LouvresPage />} />
        <Route path="/multiwall-sheet" element={<MultiwallSheetPage />} />
        <Route path="/peb-structure" element={<PEBStructurePage />} />
        <Route path="/poly-sheet" element={<PolySheetPage />} />
        <Route path="/ppgl-ppgi" element={<PPGLPPGIPage />} />
        <Route path="/puff-panel" element={<PuffPanelPage />} />
        <Route path="/standing-seam" element={<StandingSeamPage />} />
        <Route path="/tile-profile" element={<TileProfilePage />} />
        <Route path="/turbo-ventilators" element={<TurboVentilatorsPage />} />
        <Route path="/xlpe" element={<XLPEPage />} />
        <Route path="/z-purlin-cpurlin" element={<ZPurlinCPurlinPage />} />

        {/* Specialty Pages */}
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