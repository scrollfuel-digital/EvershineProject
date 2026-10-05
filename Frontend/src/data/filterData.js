// Steel & Material Grades matching Evershine Catalog (TMT & Cement standards removed)
export const GRADES_LIST = [
  'IS 513:2016',
  '15961_2012',
  'IS 15965:2012',
  '15965_2012',
  'IS 15965_2012',
  'IS 513:2017',
  'IS 11513:2017',
  'IS 7887:1992',
  'IS 3502:2004',
  'IS 3502:2009',
  'IS 15914:2011',
  '1079:2016',
  '277:2018',
  'IS 277:2018',
  '277 : 2018',
  'SAPH440',
  'SAE',
  'SS 4012A',
  'G3134:1991',
  'IS 5986:2017',
  'BSK46',
  'IS 2062:2011',
  '2062:2011',
  'IS 1079:2017',
  'EN 10025:2019',
  'EN 10025',
  'IS 10748:2004',
  'IS 15961:2012',
  'ASME SA 516',
  'EN 10149-2:2013',
  'ASTM A283M',
  'EN 10149',
  'ASTM A653',
  'ASTM A792',
  'JIS G3302:1998',
  'JIS G3444:1991',
  'IS 10748:2011',
  'JIS G3302:2019',
  'JIS G 3302: 2019',
  'J403:2014',
  'J403_2014',
  'IS 10111:2005',
  '10111:2005',
  'IS 10149-2:2005',
  '10149:2:2005',
  '10149_2_2005',
  'EN 10149-2:2005',
  'IS 1079:2016',
  '5986:2017',
  '1079:2017',
  'SS:4012A',
  'HSLA 340'
];

// Sub-brands for Steel & Roofing (TMT and Cement items removed)
export const SUB_BRANDS_LIST = [
  'Colouron+',
  'Silveron+',
  'Silveron',
  'Pragati+',
  'Indradhanush',
  'Asian',
  'Vishwas+',
  'Zincalume'
];

// Brands for Steel & Roofing with EVERSHINE at the top (Cement and TMT brands removed)
export const BRANDS_LIST = [
  'Evershine',
  'JSW',
  'JSW Steel',
  'TATA',
  'SAIL',
  'AMNS',
  'JSPL',
  'posco',
  'Nippon',
  'JFE',
  'APL Apollo',
  'VSP',
  'NMDC',
  'ET',
  'JSOL',
  'Urjaa Metalics',
  'One Helix',
  'NAMCO'
];

// Sub-grades matching Steel catalog (TMT Fe 500/550/600 removed)
export const SUB_GRADES_LIST = [
  'YS 350',
  'GP 250',
  'E450BR',
  'YS 550',
  'E410BR',
  'E300A',
  'E350BR',
  'CR0',
  'CR2',
  'CR1',
  'CR4',
  'CR3',
  'GR70',
  'E250BR',
  'E250A',
  'DD11',
  'YS_250',
  'YS 250',
  'GP250',
  'BSK46',
  'E250BR Chequered',
  'E350A',
  'E350C',
  'E34',
  'GP300',
  'GP',
  'HR2',
  'YS 300',
  'E450A',
  'YS_550',
  'E410A',
  'E250A Chequered',
  'CS Type B',
  'HSLA 340',
  'GPED',
  'GPD',
  'GPIF',
  'GPL',
  'GPH',
  'SGC440',
  'G550',
  '550 MPA',
  'GP350',
  'HRGI 250',
  'HRGI_250',
  'HRGI 550',
  'HRGI_550',
  'GP550',
  'GP 345 MPA',
  'GP345 MPA',
  'GR1',
  'GR2',
  'GR2 chequered',
  'GR3',
  'ISH600LA',
  'HR3',
  'SAPH 440',
  'SPFH590',
  'S600MC',
  'S355J2',
  'S355J2+N',
  'STK ST52',
  'ST52',
  'HS 345',
  'E300BR',
  'SAE 1042',
  'C-55',
  'S355MC',
  'S420MC',
  'SAE 1055',
  'Grade D',
  'ISH440R',
  'ISH410S',
  'SAE 1020',
  'ISH590R',
  'S315MC',
  'S355J2+N',
  'HR4',
  'S550MC',
  'SAPH590',
  'SAPH 590',
  'S500MC',
  'HS 345'
];

// Category filter hierarchy: Mild Steel, Structural Steel, and Roofing & Cladding (No TMT / Cement)
export const CATEGORY_GROUPS = [
  {
    groupName: 'Mild Steel',
    items: [
      'Colour coated',
      'MS Hot rolled',
      'Coated Steel',
      'MS Cold rolled',
    ]
  },
  {
    groupName: 'Structural Steel',
    items: [
      'Angles',
      'Channels',
    ]
  },
  {
    groupName: 'Roofing & Cladding',
    items: [
      'Profile Sheets',
      'Deck Sheet',
      'Tile Profile',
      'PUF Panels',
      'Polycarbonate Sheet',
      'Turbo Ventilators',
      'Z Purlin - Cpurlin'
    ]
  }
];

// MS Hot Rolled Sub-categories
export const MS_HOT_ROLLED_SUB_CATEGORIES = [
  'Hot rolled sheets',
  'Hot rolled coils',
  'HRPO coils',
  'HRPO sheets'
];

// Colour Coated Sub-categories
export const COLOUR_COATED_SUB_CATEGORIES = [
  'Pre-painted galvalume sheets',
  'Pre-painted galvalume coils',
  'Galvanized coils',
  'Galvanized sheets',
];

// Coated Steel Sub-categories
export const COATED_STEEL_SUB_CATEGORIES = [
  'Galvalume coils',
  'Galvalume sheets',

];

// MS Cold Rolled Sub-categories
export const MS_COLD_ROLLED_SUB_CATEGORIES = [
  'Cold rolled sheets',
  'Cold rolled coils'
];

// Predefined category-specific filters
export const CATEGORY_SPECIFIC_FILTERS = {
  'colour coated': {
    grades: [
      '15961_2012',
      'ASTM A792',
      'IS 15965:2012',
      '15965_2012',
      'IS 15965_2012',
      'IS 15961:2012'
    ],
    subGrades: [
      'YS_250',
      'YS_550',
      'YS 250',
      'YS 350',
      'YS 550',
      'CS Type B',
      'YS 300'
    ]
  },
  'pre-painted galvalume sheets': {
    grades: [
      'IS 15965:2012',
      '15965_2012',
      'IS 15965_2012'
    ],
    subGrades: [
      'YS_550',
      'YS 350',
      'YS 550',
      'YS 300'
    ]
  },
  'pre-painted galvalume coils': {
    grades: [
      '15961_2012',
      'ASTM A792',
      'IS 15965:2012'
    ],
    subGrades: [
      'YS_250',
      'YS_550',
      'YS 250',
      'YS 350',
      'YS 550',
      'CS Type B',
      'YS 300'
    ]
  },
  'galvalume coils': {
    grades: [
      'IS 15961:2012',
      'IS 15965:2012'
    ],
    subBrands: [
      'Silveron+',
      'Silveron',
      'Vishwas+'
    ],
    brands: [
      'JSW Steel'
    ],
    subGrades: [
      'YS 350',
      'YS 550',
      'YS 300'
    ]
  },
  'galvalume sheets': {
    grades: [
      'IS 15961:2012',
      '15961_2012'
    ],
    subBrands: [
      'Silveron+',
      'Silveron',
      'Zincalume'
    ],
    brands: [
      'JSW Steel',
      'TATA',
      'JSW'
    ],
    subGrades: [
      '550 MPA',
      'YS_550',
      'YS 250',
      'G550',
      'YS 350',
      'YS 550',
      'YS 300'
    ]
  },
  'cold rolled coils': {
    grades: [
      'HSLA 340',
      'IS 513:2016',
      'IS 513:2017'
    ],
    subBrands: []
  },
  'galvanized coils': {
    grades: [
      '277:2018',
      'IS 277:2018',
      'ASTM A653',
      '277 : 2018',
      'JIS G3302:1998'
    ],
    subGrades: [
      'GP 345 MPA',
      'GPL',
      'GP300',
      'GPIF',
      'GP 250',
      'GP350',
      'SGC440',
      'GP',
      'GP250',
      'GPED',
      'GP550',
      'HRGI_550',
      'HRGI_250',
      'GPD',
      'GPH'
    ]
  },
  'galvanized sheets': {
    grades: [
      '277:2018',
      'IS 277:2018'
    ],
    subGrades: [
      'HRGI_250',
      'GP300',
      'GPIF',
      'GP350',
      'GP',
      'GP250',
      'GP550',
      'GPD'
    ]
  },
  'hot rolled sheets': {
    grades: [
      'IS 3502:2004',
      'IS 3502:2009',
      'EN 10025',
      'IS 15914:2011',
      'ASME SA 516',
      'JIS G3444:1991',
      'IS 5986:2017',
      'BSK46',
      'IS 2062:2011',
      'IS 1079:2017',
      'IS 10748:2004',
      'EN 10149',
      'IS 10748:2011'
    ],
    subGrades: [
      'S355J2',
      'HS 345',
      'GR70',
      'GR2',
      'GR1',
      'S600MC',
      'GR3',
      'HR2',
      'ISH600LA',
      'E250BR',
      'BSK46',
      'E250BR Chequered',
      'ST52',
      'E250A Chequered',
      'E250A',
      'E350A',
      'E350BR',
      'E350C'
    ]
  },
  'hot rolled coils': {
    grades: [
      'IS 5986:2017',
      'BSK46',
      'IS 2062:2011',
      'IS 3502:2009',
      'IS 1079:2017',
      'IS 15914:2011',
      'ASME SA 516',
      'IS 10748:2004',
      '2062:2011'
    ],
    subGrades: [
      'HS 345',
      'GR70',
      'GR2',
      'GR2 chequered',
      'GR1',
      'HR2',
      'ISH600LA',
      'E250BR',
      'BSK46',
      'S355J2+N',
      'E250BR Chequered',
      'E250A Chequered',
      'E250A',
      'E350BR',
      'E350A',
      'E350C'
    ]
  },
  'hrpo coils': {
    grades: [
      '5986:2017',
      '1079:2017',
      'G3134:1991',
      '1079:2016',
      'IS 513:2017',
      'IS 11513:2017',
      'J403:2014',
      '10149:2:2005',
      'EN 10149-2:2013',
      'ASTM A283M',
      'IS 5986:2017',
      'SAPH440',
      'IS 2062:2011',
      'JIS G 3302: 2019',
      'SAE',
      '10149_2_2005',
      'IS 1079:2017',
      'SS:4012A',
      'IS 10748:2004',
      'J403_2014',
      'EN 10149',
      '10111:2005'
    ],
    subGrades: [
      'CR2',
      'S420MC',
      'CR3',
      'GR2',
      'ISH410S',
      'SAE 1055',
      'E34',
      'HR3',
      'SAE 1020',
      'SAE 1042',
      'SGC440',
      'HR2',
      'SPFH590',
      'S315MC',
      'Grade D',
      'C-55',
      'S550MC',
      'ISH440R',
      'E250A',
      'S500MC',
      'E350A',
      'ISH590R',
      'DD11',
      'S355MC'
    ],
    brands: [
      'JSW Steel',
      'JSOL',
      'JSPL',
      'TATA',
      'JSW'
    ]
  },
  'hrpo sheets': {
    grades: [
      '5986:2017',
      '1079:2017',
      'G3134:1991',
      '1079:2016',
      'IS 11513:2017',
      '10149:2:2005',
      'EN 10149-2:2013',
      'IS 5986:2017',
      'SAPH440',
      'BSK46',
      'IS 2062:2011',
      'IS 1079:2017',
      '10149_2_2005',
      'SS:4012A',
      'IS 10748:2004',
      '10111:2005'
    ],
    subGrades: [
      'CR2',
      'GR2',
      'ISH410S',
      'E34',
      'HR3',
      'HR2',
      'SPFH590',
      'HR4',
      'S315MC',
      'SAPH 590',
      'S550MC',
      'E250A',
      'E350A',
      'ISH590R',
      'DD11',
      'S355MC'
    ]
  }
};
