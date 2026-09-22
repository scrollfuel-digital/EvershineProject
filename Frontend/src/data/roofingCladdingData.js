// Roofing & Cladding Dataset for Evershine Project
import jswSilveronImg from '../assets/bare_galvalume/jsw_silveron_sheet.png';
import jswGreenImg from '../assets/ppgl_profile/jsw_green_colouron.jpg';
import royalBlueImg from '../assets/ppgl_profile/royal_blue_ppgl_stack.jpg';
import alumTrapezoidalImg from '../assets/aluminium_profile/alum_trapezoidal_stack.jpg';
import crimpBlueCurvedImg from '../assets/crimping_profile/crimp_blue_curved.png';
import charcoalPanelImg from '../assets/standing_seam/standing_seam_charcoal_panel.jpg';
import compositeSlabImg from '../assets/deck_sheets/deck_composite_slab.png';
import dimpleProfileImg from '../assets/deck_sheets/deck_dimple_profile.jpg';
import deckFactoryStackImg from '../assets/deck_sheets/deck_factory_stack.jpg';
import tileRedJswTrustImg from '../assets/tile_profile/tile_red_jsw_trust.jpg';
import tileRedStepProfileImg from '../assets/tile_profile/tile_red_step_profile.jpg';
import tileRedMetallicImg from '../assets/tile_profile/tile_red_metallic_sheet.jpg';
import puffDoubleSkinCadImg from '../assets/puff_panels/puff_double_skin_cad.jpg';
import puffExploded3dImg from '../assets/puff_panels/puff_3d_exploded.png';
import puffStandingSeamCoreImg from '../assets/puff_panels/puff_standing_seam_core.jpg';
import polyClearCorrugatedImg from '../assets/poly_sheet/poly_clear_corrugated.jpg';
import polyTranslucentWaveImg from '../assets/poly_sheet/poly_translucent_wave.jpg';
import polyBlueTrapezoidalImg from '../assets/poly_sheet/poly_blue_trapezoidal.jpg';
import multiwallSectionImg from '../assets/multiwall_sheets/multiwall_profile_section.png';
import turboSs430StudioImg from '../assets/turbo_ventilators/turbo_ss430_studio.jpg';
import turboRoofMountedImg from '../assets/turbo_ventilators/turbo_roof_mounted.png';
import turboPolyBaseImg from '../assets/turbo_ventilators/turbo_poly_base.jpg';
import louverBlueStackImg from '../assets/louvres/louver_blue_stack.png';
import czPurlinCad3dImg from '../assets/z_c_purlin/cz_purlin_cad_3d.png';
import czPurlinFactoryStackImg from '../assets/z_c_purlin/cz_purlin_factory_stack.jpg';
import czPurlinRedPrimerImg from '../assets/z_c_purlin/cz_purlin_red_primer.jpg';

export const ROOFING_CLADDING_PRODUCTS = [
  // ==========================================
  // 1. Profile Sheets (6 cards)
  // ==========================================
  {
    id: 1001,
    title: 'JSW Silveron+ Bare Galvalume Hi-Tensile Profile Sheets',
    brand: 'JSW Steel',
    category: 'Profile Sheets',
    subCategory: 'Profile Sheets',
    group: 'Roofing & Cladding',
    grade: 'ASTM A792',
    subGrade: '550 MPA',
    specs: {
      thickness: '0.47 - 0.80 mm',
      width: '1060 mm (1000mm Cover)',
      length: '2400 - 7300 mm (8 - 24 ft)'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: jswSilveronImg
  },
  {
    id: 1002,
    title: 'JSW Colouron+ PPGL Insignia Green Trapezoidal Profile Sheets',
    brand: 'JSW Steel',
    category: 'Profile Sheets',
    subCategory: 'Profile Sheets',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '0.35 - 0.60 mm',
      width: '1090 mm (1020mm Cover)',
      length: '2400 - 7300 mm (8 - 24 ft)'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: jswGreenImg
  },
  {
    id: 1003,
    title: 'TATA Durashine Pre-Painted Galvalume Royal Blue Profile Sheets',
    brand: 'TATA',
    category: 'Profile Sheets',
    subCategory: 'Profile Sheets',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '0.45 - 0.60 mm',
      width: '1090 mm (1020mm Cover)',
      length: '2400 - 7300 mm (8 - 24 ft)'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: royalBlueImg
  },
  {
    id: 1004,
    title: 'Evershine Industrial High-Strength Aluminium Trapezoidal Profile Sheets',
    brand: 'Evershine',
    category: 'Profile Sheets',
    subCategory: 'Profile Sheets',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 300',
    specs: {
      thickness: '0.40 - 1.20 mm',
      width: '1050 mm',
      length: '2400 - 7300 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: alumTrapezoidalImg
  },
  {
    id: 1005,
    title: 'Evershine Curved Crimping Architectural Profile Roofing Sheets',
    brand: 'Evershine',
    category: 'Profile Sheets',
    subCategory: 'Profile Sheets',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '0.45 - 0.80 mm',
      width: '1060 mm',
      length: 'Custom Curved Radius'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: crimpBlueCurvedImg
  },
  {
    id: 1006,
    title: 'Evershine Standing Seam 400 Concealed Double-Lock Profile Sheets',
    brand: 'Evershine',
    category: 'Profile Sheets',
    subCategory: 'Profile Sheets',
    group: 'Roofing & Cladding',
    grade: 'ASTM A792',
    subGrade: '550 MPA',
    specs: {
      thickness: '0.50 - 0.70 mm',
      width: '400 mm Effective Width',
      length: 'Up to 30000 mm (Site Rolled)'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: charcoalPanelImg
  },

  // ==========================================
  // 2. Deck Sheet (4 cards)
  // ==========================================
  {
    id: 1007,
    title: 'JSW Steel Composite Floor Deck Sheet 51mm Rib Profile',
    brand: 'JSW Steel',
    category: 'Deck Sheet',
    subCategory: 'Deck Sheet',
    group: 'Roofing & Cladding',
    grade: 'IS 277:2018',
    subGrade: 'GP350',
    specs: {
      thickness: '0.80 - 1.60 mm',
      width: '960 mm (910mm Cover)',
      length: '2000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: compositeSlabImg
  },
  {
    id: 1008,
    title: 'Evershine High-Tensile Dimpled Structural Metal Decking Sheet',
    brand: 'Evershine',
    category: 'Deck Sheet',
    subCategory: 'Deck Sheet',
    group: 'Roofing & Cladding',
    grade: 'IS 277:2018',
    subGrade: 'GP350',
    specs: {
      thickness: '0.80 - 1.20 mm',
      width: '990 mm (950mm Cover)',
      length: '2000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: dimpleProfileImg
  },
  {
    id: 1009,
    title: 'TATA Steel Galvanized Composite Floor Decking Sheets 75mm Profile',
    brand: 'TATA',
    category: 'Deck Sheet',
    subCategory: 'Deck Sheet',
    group: 'Roofing & Cladding',
    grade: 'IS 277:2018',
    subGrade: 'GP350',
    specs: {
      thickness: '1.00 - 1.60 mm',
      width: '900 mm (840mm Cover)',
      length: '2000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: deckFactoryStackImg
  },
  {
    id: 1010,
    title: 'Evershine Bare Galvalume Interlocking Slab Floor Decking Sheets',
    brand: 'Evershine',
    category: 'Deck Sheet',
    subCategory: 'Deck Sheet',
    group: 'Roofing & Cladding',
    grade: 'ASTM A792',
    subGrade: '550 MPA',
    specs: {
      thickness: '0.80 - 1.25 mm',
      width: '914 mm',
      length: '2000 - 10000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: compositeSlabImg
  },

  // ==========================================
  // 3. Tile Profile (4 cards)
  // ==========================================
  {
    id: 1011,
    title: 'JSW Steel Colouron+ Terracotta Red Tile Profile Roofing Sheets',
    brand: 'JSW Steel',
    category: 'Tile Profile',
    subCategory: 'Tile Profile',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '0.45 - 0.60 mm',
      width: '1060 mm (1000mm Cover)',
      length: '1500 - 6000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: tileRedJswTrustImg
  },
  {
    id: 1012,
    title: 'Evershine Royal Heritage Step Tile Metal Roofing Sheets 0.50mm',
    brand: 'Evershine',
    category: 'Tile Profile',
    subCategory: 'Tile Profile',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '0.45 - 0.55 mm',
      width: '1060 mm',
      length: '1500 - 6000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: tileRedStepProfileImg
  },
  {
    id: 1013,
    title: 'TATA Bluescope Shakthi Mangalore Style Clay Tile Profile Sheets',
    brand: 'TATA',
    category: 'Tile Profile',
    subCategory: 'Tile Profile',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '0.45 - 0.60 mm',
      width: '1060 mm (1000mm Cover)',
      length: '1800 - 6000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: tileRedMetallicImg
  },
  {
    id: 1014,
    title: 'Evershine Metallic Ruby Red Spanish Wave Tile Profile Sheets',
    brand: 'Evershine',
    category: 'Tile Profile',
    subCategory: 'Tile Profile',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '0.50 - 0.60 mm',
      width: '1060 mm',
      length: '2000 - 6000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: tileRedJswTrustImg
  },

  // ==========================================
  // 4. PUF Panels (4 cards)
  // ==========================================
  {
    id: 1015,
    title: 'Evershine Double-Skin Insulated PUF Roof Panels 50mm High-Rib',
    brand: 'Evershine',
    category: 'PUF Panels',
    subCategory: 'PUF Panels',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '30 - 100 mm Core',
      width: '1000 mm Cover Width',
      length: '2000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: puffDoubleSkinCadImg
  },
  {
    id: 1016,
    title: 'Evershine Cold Storage High-Density PUF Wall Panels 100mm',
    brand: 'Evershine',
    category: 'PUF Panels',
    subCategory: 'PUF Panels',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '80 - 150 mm Core',
      width: '1000 mm (Tongue & Groove)',
      length: '2000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: puffExploded3dImg
  },
  {
    id: 1017,
    title: 'JSW Steel Cleanroom Insulated PUF Acoustic & Thermal Wall Panels',
    brand: 'JSW Steel',
    category: 'PUF Panels',
    subCategory: 'PUF Panels',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '40 - 80 mm Core',
      width: '1000 mm Effective',
      length: '2000 - 10000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: puffStandingSeamCoreImg
  },
  {
    id: 1018,
    title: 'Evershine Fire-Retardant PIR / PUF Architectural Wall Cladding Panels',
    brand: 'Evershine',
    category: 'PUF Panels',
    subCategory: 'PUF Panels',
    group: 'Roofing & Cladding',
    grade: 'IS 15965:2012',
    subGrade: 'YS 550',
    specs: {
      thickness: '50 - 120 mm Core',
      width: '1000 mm Effective',
      length: '2000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: puffDoubleSkinCadImg
  },

  // ==========================================
  // 5. Polycarbonate Sheet (4 cards)
  // ==========================================
  {
    id: 1019,
    title: 'Evershine Clear Corrugated UV-Coated Polycarbonate Skylight Sheet',
    brand: 'Evershine',
    category: 'Polycarbonate Sheet',
    subCategory: 'Polycarbonate Sheet',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 250',
    specs: {
      thickness: '1.2 - 3.0 mm',
      width: '1060 mm Profile Matching',
      length: '2400 - 6000 mm (8 - 20 ft)'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: polyClearCorrugatedImg
  },
  {
    id: 1020,
    title: 'Evershine Translucent White Diffused Wave Polycarbonate Daylighting Sheet',
    brand: 'Evershine',
    category: 'Polycarbonate Sheet',
    subCategory: 'Polycarbonate Sheet',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 250',
    specs: {
      thickness: '1.5 - 2.5 mm',
      width: '1060 mm',
      length: '2400 - 6000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: polyTranslucentWaveImg
  },
  {
    id: 1021,
    title: 'Evershine Sky Blue Trapezoidal Profile Polycarbonate Industrial Sheet',
    brand: 'Evershine',
    category: 'Polycarbonate Sheet',
    subCategory: 'Polycarbonate Sheet',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 250',
    specs: {
      thickness: '1.5 - 3.0 mm',
      width: '1090 mm',
      length: '2400 - 7300 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: polyBlueTrapezoidalImg
  },
  {
    id: 1022,
    title: 'Evershine Multiwall Twin-Wall Thermal Insulated Polycarbonate Sheets',
    brand: 'Evershine',
    category: 'Polycarbonate Sheet',
    subCategory: 'Polycarbonate Sheet',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 250',
    specs: {
      thickness: '4.0 - 10.0 mm',
      width: '1220 - 2100 mm',
      length: '5800 - 11800 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: multiwallSectionImg
  },

  // ==========================================
  // 6. Turbo Ventilators (4 cards)
  // ==========================================
  {
    id: 1023,
    title: 'Evershine Stainless Steel SS 430 Industrial Roof Turbo Ventilator 24"',
    brand: 'Evershine',
    category: 'Turbo Ventilators',
    subCategory: 'Turbo Ventilators',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 250',
    specs: {
      diameter: '24" Throat (600 mm)',
      thickness: '0.50 mm SS Vanes'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: turboSs430StudioImg
  },
  {
    id: 1024,
    title: 'Evershine Heavy-Duty Aluminium Roof Air Turbine Ventilator 21"',
    brand: 'Evershine',
    category: 'Turbo Ventilators',
    subCategory: 'Turbo Ventilators',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 250',
    specs: {
      diameter: '21" Throat (530 mm)',
      thickness: '0.60 mm Aluminium Vanes'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: turboRoofMountedImg
  },
  {
    id: 1025,
    title: 'Evershine Translucent Polycarbonate Base Plate with Turbo Ventilator Set',
    brand: 'Evershine',
    category: 'Turbo Ventilators',
    subCategory: 'Turbo Ventilators',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 250',
    specs: {
      diameter: '21" / 24" Matching Base',
      length: '2000 mm Profile Base'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: turboPolyBaseImg
  },
  {
    id: 1026,
    title: 'Evershine Continuous Industrial Aerofoil Wall Louver Ventilation System',
    brand: 'Evershine',
    category: 'Turbo Ventilators',
    subCategory: 'Turbo Ventilators',
    group: 'Roofing & Cladding',
    grade: 'IS 7887:1992',
    subGrade: 'YS 250',
    specs: {
      width: '1000 - 3000 mm Custom',
      thickness: '0.50 - 0.80 mm Louver Blades'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: louverBlueStackImg
  },

  // ==========================================
  // 7. Z Purlin - Cpurlin (4 cards)
  // ==========================================
  {
    id: 1027,
    title: 'JSW Steel Pre-Galvanized Cold Formed Z Purlin High-Tensile 200mm',
    brand: 'JSW Steel',
    category: 'Z Purlin - Cpurlin',
    subCategory: 'Z Purlin - Cpurlin',
    group: 'Roofing & Cladding',
    grade: 'IS 277:2018',
    subGrade: 'GP350',
    specs: {
      webDepth: '200 mm',
      flangeWidth: '60 mm',
      thickness: '1.5 - 2.5 mm',
      length: '3000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: czPurlinCad3dImg
  },
  {
    id: 1028,
    title: 'Evershine Pre-Galvanized Structural C Purlin Section 150x50x2mm',
    brand: 'Evershine',
    category: 'Z Purlin - Cpurlin',
    subCategory: 'Z Purlin - Cpurlin',
    group: 'Roofing & Cladding',
    grade: 'IS 277:2018',
    subGrade: 'GP350',
    specs: {
      webDepth: '150 mm',
      flangeWidth: '50 mm',
      thickness: '1.5 - 3.0 mm',
      length: '3000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: czPurlinFactoryStackImg
  },
  {
    id: 1029,
    title: 'TATA Structura Red Oxide Primer Coated Heavy Duty Z Purlins 250mm',
    brand: 'TATA',
    category: 'Z Purlin - Cpurlin',
    subCategory: 'Z Purlin - Cpurlin',
    group: 'Roofing & Cladding',
    grade: 'IS 2062:2011',
    subGrade: 'E250A',
    specs: {
      webDepth: '250 mm',
      flangeWidth: '65 mm',
      thickness: '2.0 - 3.0 mm',
      length: '4000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: czPurlinRedPrimerImg
  },
  {
    id: 1030,
    title: 'Evershine Punched Overlap High-Strength Z Purlins for PEB Buildings',
    brand: 'Evershine',
    category: 'Z Purlin - Cpurlin',
    subCategory: 'Z Purlin - Cpurlin',
    group: 'Roofing & Cladding',
    grade: 'IS 277:2018',
    subGrade: 'GP350',
    specs: {
      webDepth: '175 mm',
      flangeWidth: '55 mm',
      thickness: '1.8 - 2.5 mm',
      length: '3000 - 12000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: czPurlinCad3dImg
  }
];
