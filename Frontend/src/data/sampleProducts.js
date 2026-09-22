import tileProfileImg from '../assets/Untitleddesign/12.png';
import turboVentilatorsImg from '../assets/Untitleddesign/13.png';
import xlpeImg from '../assets/Untitleddesign/14.png';
import zPurlinImg from '../assets/Untitleddesign/15.png';
import { ANGLES_PRODUCTS } from './anglesData';
import { CHANNELS_PRODUCTS } from './channelsData';
import { BEAMS_COLUMNS_PRODUCTS } from './beamsColumnsData';
import { COLOUR_COATED_PRODUCTS } from './colourCoatedData';
import { MS_COLD_ROLLED_PRODUCTS } from './msColdRolledData';

// Sample Product Catalog Items
export const SAMPLE_PRODUCTS = [
  ...ANGLES_PRODUCTS,
  ...CHANNELS_PRODUCTS,
  ...BEAMS_COLUMNS_PRODUCTS,
  ...COLOUR_COATED_PRODUCTS,
  ...MS_COLD_ROLLED_PRODUCTS,

 
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
];

export { ANGLES_PRODUCTS, CHANNELS_PRODUCTS, BEAMS_COLUMNS_PRODUCTS, COLOUR_COATED_PRODUCTS, MS_COLD_ROLLED_PRODUCTS };
