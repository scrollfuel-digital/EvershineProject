import tileProfileImg from '../assets/Untitleddesign/12.png';
import turboVentilatorsImg from '../assets/Untitleddesign/13.png';
import xlpeImg from '../assets/Untitleddesign/14.png';
import zPurlinImg from '../assets/Untitleddesign/15.png';
import { ANGLES_PRODUCTS } from './anglesData';
import { CHANNELS_PRODUCTS } from './channelsData';
import { BEAMS_COLUMNS_PRODUCTS } from './beamsColumnsData';

// Sample Product Catalog Items
export const SAMPLE_PRODUCTS = [
  ...ANGLES_PRODUCTS,
  ...CHANNELS_PRODUCTS,
  ...BEAMS_COLUMNS_PRODUCTS,

 
  {
    id: 13,
    title: 'Primary Mill Mild Steel Equal Angles 50x50x5mm',
    brand: 'Evershine',
    subBrand: 'Super',
    category: 'Angles',
    grade: 'IS 2062:2011',
    subGrade: 'E250A',
    specs: {
      thickness: '3 - 10 mm',
      length: '6000 - 12000 mm',
      width: '25x25 - 100x100 mm'
    },
    delivery: 'Delivery same day, next day',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 15,
    title: 'ISMB Heavy Structural Steel Beams & Universal Columns',
    brand: 'SAIL',
    subBrand: 'Vishwas+',
    category: 'Beams and Columns',
    grade: 'IS 2062:2011',
    subGrade: 'E350BR',
    specs: {
      thickness: '5.7 - 12.5 mm',
      length: '6000 - 12000 mm',
      width: '100 - 450 mm Depth'
    },
    delivery: 'Delivery in 2 - 4 days',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 16,
    title: 'Evershine Stainless Steel Wind Driven Turbo Ventilator 21"',
    brand: 'Evershine',
    subBrand: 'King',
    category: 'Coated Steel',
    subCategory: 'Turbo Ventilators',
    grade: 'BSK46',
    subGrade: 'E250A',
    specs: {
      thickness: '0.50 mm Vanes',
      length: '21 Inch Throat',
      width: 'Aluminium/SS Base'
    },
    delivery: 'Delivery same day, next day',
    img: turboVentilatorsImg
  },
  {
    id: 17,
    title: 'Evershine XLPE Chemically Cross-Linked Polyethylene Insulation',
    brand: 'Evershine',
    subBrand: 'All-Purpose',
    category: 'Coated Steel',
    subCategory: 'XLPE',
    grade: 'BSK46',
    subGrade: 'CR1',
    specs: {
      thickness: '6 - 25 mm Sheet',
      length: '20 Meters Roll',
      width: '1.2 Meters Width'
    },
    delivery: 'Delivery in 2 - 3 days',
    img: xlpeImg
  }
];

export { ANGLES_PRODUCTS, CHANNELS_PRODUCTS, BEAMS_COLUMNS_PRODUCTS };
