// arcade
import arcade1 from '../assets/commercial/arcade/arcade1.jpg';
import arcade2 from '../assets/commercial/arcade/arcade2.jpg';
import arcade3 from '../assets/commercial/arcade/arcade3.jpg';
import arcade4 from '../assets/commercial/arcade/arcade4.jpg';
import arcade5 from '../assets/commercial/arcade/arcade5.jpg';

// business-centre
import businesscentre1 from '../assets/commercial/business-centre/bc1.jpg';
import businesscentre2 from '../assets/commercial/business-centre/bc2.jpg';
import businesscentre3 from '../assets/commercial/business-centre/bc3.jpg';
import businesscentre4 from '../assets/commercial/business-centre/bc4.jpg';
import businesscentre5 from '../assets/commercial/business-centre/bc5.jpg';

// business-park
import businesspark1 from '../assets/commercial/business-park/bp1.jpg';
import businesspark2 from '../assets/commercial/business-park/bp2.jpg';
import businesspark3 from '../assets/commercial/business-park/bp3.jpg';
import businesspark4 from '../assets/commercial/business-park/bp4.jpg';
import businesspark5 from '../assets/commercial/business-park/bp5.jpg';

// city-centre
import citycentre1 from '../assets/commercial/city-centre/cc1.jpg';
import citycentre2 from '../assets/commercial/city-centre/cc2.jpg';
import citycentre3 from '../assets/commercial/city-centre/cc3.jpg';
import citycentre4 from '../assets/commercial/city-centre/cc4.jpg';
import citycentre5 from '../assets/commercial/city-centre/cc5.jpg';

// complex
import complex1 from '../assets/commercial/complex/complex1.jpg';
import complex2 from '../assets/commercial/complex/complex2.jpg';
import complex3 from '../assets/commercial/complex/complex3.jpg';
import complex4 from '../assets/commercial/complex/complex4.jpg';
import complex5 from '../assets/commercial/complex/complex5.jpg';

// plaza
import plaza1 from '../assets/commercial/plaza/plaza1.jpg';
import plaza2 from '../assets/commercial/plaza/plaza2.jpg';
import plaza3 from '../assets/commercial/plaza/plaza3.jpg';
import plaza4 from '../assets/commercial/plaza/plaza4.jpg';
import plaza5 from '../assets/commercial/plaza/plaza5.jpg';

// swh-sm
import swhsm1 from '../assets/commercial/swh-sm/swh1.jpg';
import swhsm2 from '../assets/commercial/swh-sm/swh2.jpg';
import swhsm3 from '../assets/commercial/swh-sm/swh3.jpg';
import swhsm4 from '../assets/commercial/swh-sm/swh4.jpg';
import swhsm5 from '../assets/commercial/swh-sm/swh5.jpg';

// RESIDENTIAL ASSETS
// bunglows
import bunglows1 from '../assets/residential/res-bunglows/bunglows1.jpg';
import bunglows2 from '../assets/residential/res-bunglows/bunglows2.jpg';
import bunglows3 from '../assets/residential/res-bunglows/bunglows3.jpg';
import bunglows4 from '../assets/residential/res-bunglows/bunglows4.jpg';
import bunglows5 from '../assets/residential/res-bunglows/bunglows5.jpg';

// homes
import homes1 from '../assets/residential/res-homes/homes1.jpg';
import homes2 from '../assets/residential/res-homes/homes2.jpg';
import homes3 from '../assets/residential/res-homes/homes3.jpg';
import homes4 from '../assets/residential/res-homes/homes4.jpg';
import homes5 from '../assets/residential/res-homes/homes5.jpg';

// park
import park1 from '../assets/residential/res-park/park1.jpg';
import park2 from '../assets/residential/res-park/park2.jpg';
import park3 from '../assets/residential/res-park/park3.jpg';
import park4 from '../assets/residential/res-park/park4.jpg';
import park5 from '../assets/residential/res-park/park5.jpg';

// plotsandvillas
import plotsandvillas1 from '../assets/residential/res-plotsandvillas/plotsandvillas1.jpg';
import plotsandvillas2 from '../assets/residential/res-plotsandvillas/plotsandvillas2.jpg';
import plotsandvillas3 from '../assets/residential/res-plotsandvillas/plotsandvillas3.jpg';
import plotsandvillas4 from '../assets/residential/res-plotsandvillas/plotsandvillas4.jpg';
import plotsandvillas5 from '../assets/residential/res-plotsandvillas/plotsandvillas5.jpg';

// residency
import residency1 from '../assets/residential/res-residency/residency1.jpg';
import residency2 from '../assets/residential/res-residency/residency2.jpg';
import residency3 from '../assets/residential/res-residency/residency3.jpg';
import residency4 from '../assets/residential/res-residency/residency4.jpg';
import residency5 from '../assets/residential/res-residency/residency5.jpg';

// sm
import sm1 from '../assets/residential/res-sm/sm1.jpg';
import sm2 from '../assets/residential/res-sm/sm2.jpg';
import sm3 from '../assets/residential/res-sm/sm3.jpg';
import sm4 from '../assets/residential/res-sm/sm4.jpg';
import sm5 from '../assets/residential/res-sm/sm5.jpg';

// society
import society1 from '../assets/residential/res-society/society1.jpg';
import society2 from '../assets/residential/res-society/society2.jpg';
import society3 from '../assets/residential/res-society/society3.jpg';
import society4 from '../assets/residential/res-society/society4.jpg';
import society5 from '../assets/residential/res-society/society5.jpg';

// township
import township1 from '../assets/residential/res-township/township1.jpg';
import township2 from '../assets/residential/res-township/township2.jpg';
import township3 from '../assets/residential/res-township/township3.jpg';
import township4 from '../assets/residential/res-township/township4.jpg';
import township5 from '../assets/residential/res-township/township5.jpg';

// villa
import villa1 from '../assets/residential/res-villa/villa1.jpg';
import villa2 from '../assets/residential/res-villa/villa2.jpg';
import villa3 from '../assets/residential/res-villa/villa3.jpg';
import villa4 from '../assets/residential/res-villa/villa4.jpg';
import villa5 from '../assets/residential/res-villa/villa5.jpg';


export type ProjectStatus = 'completed' | 'under-construction';
export type ProjectType = 'commercial' | 'residential';

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectInventory {
  floor: string;
  count: string;
  size: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  location?: string;
  year?: string;
  status: ProjectStatus;
  type: ProjectType;
  specs: ProjectSpec[];
  description: string;
  amenities: string[];
  images: string[]; // paths relative to src/assets/
  inventory?: ProjectInventory[];
}

export const allProjects: Project[] = [
  // ─── UNDER CONSTRUCTION / CURRENT PROJECTS ───
  {
    id: 'sangrilla-meadows',
    name: 'Sangrilla Meadows',
    tagline: 'Residential Plots & Luxurious Villas',
    location: 'Dholera-SIR, Gujarat',
    status: 'under-construction',
    type: 'residential',
    specs: [
      { label: 'Project Status', value: 'Under Construction / Pre-Launch' },
      { label: 'Location', value: 'Dholera-SIR, Gujarat' },
      { label: 'Total Plot Area', value: '29,471.15 Sq. Yards' },
      { label: 'Saleable Area', value: '17,912.19 Sq. Yards' },
      { label: 'Number of Plots', value: '145 Planned Villa Plots' },
      { label: 'Plot Sizes', value: '100 to 300 Sq. Yards' },
      { label: 'Starting Price', value: 'From ₹7,500 / Sq. Yard' },
    ],
    description: 'Sangrilla Meadows is a premium residential development strategically located at the gateway of Dholera SIR, India\'s first and fastest-emerging Greenfield Smart City.',
    amenities: [
      'Plot Demarcation',
      'Internal Roads (7.5 MT, 12 MT & Lagu Road)',
      'Boundary Wall',
      'CCTV Security',
      'Garden & Gazebo',
      'Children\'s Park',
      'Senior Citizen Park',
      'Gated Community',
      'Gym',
      'Club House',
      'Community Hall',
      'Street Lighting',
      '24x7 Water Supply',
    ],
    images: [
      '/assets/meadows/up_res_1.jpg',
      '/assets/meadows/up_res_2.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    ],
  },

  // ─── COMMERCIAL ───
  {
    id: 'sangrilla-city-centre',
    name: 'Sangrilla City Centre',
    tagline: 'Prime Commercial Hub',
    year: '2025',
    status: 'completed',
    type: 'commercial',
    specs: [
      { label: 'Year Completed', value: '2025' },
    ],
    description: 'A well-designed commercial complex offering prime shop and office spaces with high footfall and excellent connectivity.',
    amenities: ['Basement & Open Parking Facilities', '24/7 CCTV Surveillance & Security', 'Power Backup for Common Areas', 'Fire Safety & Compliance Systems', 'Wide Corridors & High Visibility Shop Fronts', 'Dedicated Signage Spaces', 'Common Washrooms on Each Floor', 'Efficient Vertical Connectivity (Staircases)'],
    images: [citycentre4, citycentre2, citycentre3, citycentre1, citycentre5],
    inventory: [
      { floor: 'Ground Floor', count: "42 Shops", size: '300 sq.ft.' },
      { floor: '1st Floor', count: "42 Shops", size: '300 sq.ft.' },
      { floor: '2nd Floor', count: "20 Offices", size: '590 sq.ft.' },
    ],
  },
  {
    id: 'sangrilla-business-centre',
    name: 'Sangrilla Business Centre',
    tagline: 'Where Business Thrives',
    year: '2023',
    status: 'completed',
    type: 'commercial',
    specs: [
      { label: 'Shops & Offices', value: 'Multiple Units' },
      { label: 'Year Completed', value: '2023' },
    ],
    description: 'A strategically located business centre designed for corporate offices and retail spaces with modern infrastructure.',
    amenities: ['Multi-level Parking Facilities', 'High-Speed Elevators', '24/7 Security with CCTV Monitoring', 'Power Backup for Offices & Common Areas', 'Fire Safety Systems', 'Reception & Waiting Lobby', 'Dedicated Office Zones (Upper Floors)', 'Professional Building Management'],
    images: [businesscentre4, businesscentre2, businesscentre3, businesscentre1, businesscentre5],
    inventory: [
      { floor: 'Ground Floor', count: "66 Shops", size: '280 sq.ft.' },
      { floor: '1st Floor', count: "66 Shops", size: '280 sq.ft.' },
      { floor: '2nd Floor', count: "30 Offices", size: '615 sq.ft. to 700 sq.ft.' },
    ],
  },
  {
    id: 'sangrilla-arcade',
    name: 'Sangrilla Arcade',
    tagline: 'Retail Excellence',
    year: '2020',
    status: 'completed',
    type: 'commercial',
    specs: [
      { label: 'Shops', value: 'Multiple Units' },
      { label: 'Year Completed', value: '2020' },
    ],
    description: 'A vibrant retail arcade offering excellent commercial spaces for retail businesses with high visibility and customer footfall.',
    amenities: ['Ample Surface Parking', 'Wide Frontage for Maximum Visibility', 'CCTV Surveillance', 'Power Backup (Common Areas)', 'Fire Safety Systems', 'Spacious Common Walkways', 'High Footfall Location Advantage', 'Easy Loading/Unloading Access'],
    images: [arcade2, arcade1, arcade3, arcade4, arcade5],
    inventory: [
      { floor: 'Ground Floor', count: "70 Shops", size: '210 sq.ft.' },
      { floor: '1st Floor', count: "70 Shops", size: '230 sq.ft.' },
      { floor: '2nd Floor', count: "30 Offices", size: '550 sq.ft.' },
      { floor: '3rd Floor', count: "20 Offices", size: '700 sq.ft.' },
    ],
  },
  {
    id: 'sangrilla-white-house',
    name: 'SWH & SM',
    tagline: 'Iconic Commercial Landmark',
    year: '2017',
    status: 'completed',
    type: 'commercial',
    specs: [
      { label: 'Shops & Offices', value: 'Multiple Units' },
      { label: 'Year Completed', value: '2017' },
    ],
    description: 'Shrifal White and Shrifal Meredian is an iconic commercial and residential landmark.',
    amenities: ['Elegant Entrance Lobby', 'High-Speed Elevators', 'Reserved Parking Spaces', '24/7 Security', 'Power Backup', 'Fire Safety & Emergency Systems', 'Modern Architectural Facade', 'Professional Office Environment'],
    images: [swhsm5, swhsm2, swhsm3, swhsm4, swhsm1],
    inventory: [
      { floor: 'Ground Floor', count: "9 Shops", size: '230 sq.ft.' },
      { floor: '1st Floor', count: "15 Shops", size: '250 sq.ft.' },
      { floor: '2nd Floor', count: "15 Shops", size: '250 sq.ft.' },
      { floor: '3rd Floor', count: "7 Offices", size: '600 sq.ft.' },
      { floor: 'Shrifal Meredian', count: "24 Shops", size: 'Varies' },
    ],
  },
  {
    id: 'sangrilla-business-park',
    name: 'Sangrilla Business Park',
    tagline: 'Modern Commercial Plaza',
    year: '2013',
    status: 'completed',
    type: 'commercial',
    specs: [
      { label: 'Shops & Offices', value: 'Multiple Units' },
      { label: 'Year Completed', value: '2013' },
    ],
    description: 'Modern commercial plaza ideal for retail, showrooms, and business establishments.',
    amenities: ['Dedicated Parking Areas', 'Power Backup Support', 'Security & Surveillance', 'Common Lobby & Circulation Areas', 'Fire Safety Systems', 'Signage & Branding Spaces', 'Wide Access Roads', 'Functional Layout Design'],
    images: [businesspark5, businesspark2, businesspark3, businesspark4, businesspark1],
    inventory: [
      { floor: 'Ground Floor', count: "21 Shops", size: '200 sq.ft.' },
      { floor: '1st Floor', count: "21 Shops", size: '200 sq.ft.' },
      { floor: '2nd Floor', count: "9 Offices", size: '700 sq.ft.' },
      { floor: '3rd Floor', count: "9 Offices", size: '700 sq.ft.' },
    ],
  },
  {
    id: 'sangrilla-plaza',
    name: 'Sangrilla Plaza',
    tagline: 'Premium Business Spaces',
    year: '2011',
    status: 'completed',
    type: 'commercial',
    specs: [
      { label: 'Shops & Offices', value: 'Multiple Units' },
      { label: 'Year Completed', value: '2011' },
    ],
    description: 'Premium business park developed for offices, corporate spaces, and professional services — a trusted address for commerce.',
    amenities: ['Reception & Waiting Lounge', 'Elevators for Easy Access', 'Parking Facilities', '24/7 Security', 'Power Backup', 'Fire Safety Systems', 'Structured Office Layouts', 'Common Utility Areas'],
    images: [plaza5, plaza2, plaza3, plaza4, plaza1],
    inventory: [
      { floor: 'Ground Floor', count: "24 Shops", size: '190 sq.ft. to 225 sq.ft.' },
      { floor: '1st Floor', count: "24 Shops", size: '190 sq.ft. to 225 sq.ft.' },
      { floor: '2nd Floor', count: "10 Offices", size: '800 sq.ft.' },
      { floor: '3rd Floor', count: "10 Offices", size: '800 sq.ft.' },
    ],
  },
  {
    id: 'sangrilla-complex',
    name: 'Sangrilla Complex',
    tagline: 'The Foundation of Excellence',
    year: '2001',
    status: 'completed',
    type: 'commercial',
    specs: [
      { label: 'Year Completed', value: '2001' },
    ],
    description: 'The landmark that started it all — Sangrilla Complex laid the foundation for Sangrilla Group\'s legacy of commercial excellence spanning over two decades.',
    amenities: ['Basic Parking Provision', 'Security Presence', 'Power Backup (Common Areas)', 'Fire Safety Measures', 'Functional Shop Layouts', 'Established Business Ecosystem', 'Easy Accessibility', 'Strong Local Market Presence'],
    images: [complex2, complex4, complex3, complex1, complex5],
    inventory: [
      { floor: 'Ground Floor', count: "42 Shops", size: '225 sq.ft.' },
      { floor: '1st Floor', count: "42 Shops", size: '225 sq.ft.' },
      { floor: '2nd Floor', count: "42 Shops", size: '225 sq.ft.' },
    ],
  },

  // ─── RESIDENTIAL ───
  {
    id: 'sangrilla-plots-villas',
    name: 'Sangrilla Plots & Villas',
    tagline: 'Where Land Meets Luxury',
    year: '2024',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Plots & Villas' },
      { label: 'Year Completed', value: '2024' },
      { label: 'Total Units', value: '84' },
    ],
    description: 'Elegant premium residential plots and villas with a distinctive modern design — a perfect blend of open spaces and luxury living.',
    amenities: ['Gated Community', 'Landscaped Gardens', 'Common Plots', 'Wide Roads', 'Street Lighting', '24/7 Security'],
    images: [plotsandvillas3, plotsandvillas2, plotsandvillas4, plotsandvillas1, plotsandvillas5],
    inventory: [
      { floor: 'Plots', count: '58 Plots', size: '300 sq. yards' },
      { floor: 'Villas', count: '26 Villas', size: '440 sq. yards' },
    ],
  },
  {
    id: 'sangrilla-meredian',
    name: 'Sangrilla Meredian',
    tagline: 'Refined Residential Living',
    year: '2017',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Flats' },
      { label: 'Year Completed', value: '2017' },
      { label: 'Total Flats', value: '86' },
      { label: 'Floors', value: 'Hollow + 4 Floors' },
    ],
    description: 'Shrifal White and Shrifal Meredian is an iconic commercial and residential landmark.',
    amenities: ['1 Common Plot', '1 Garden', '2 Gates', '1 Club House', '7 Lifts', '1 Borewell'],
    images: [sm4, sm2, sm1, sm3, sm5],
    inventory: [
      { floor: 'Block A to F', count: '86 Flats', size: '130 sq. yards' },
    ],
  },
  {
    id: 'sangrilla-homes',
    name: 'Sangrilla Homes',
    tagline: 'Premium Independent Living',
    year: '2012',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Bungalows' },
      { label: 'Year Completed', value: '2012' },
      { label: 'Total Bungalows', value: '70 Premium Luxury' },
    ],
    description: 'Premium independent bungalows featuring luxurious living spaces, built with exceptional quality and care.',
    amenities: ['1 Common Plot', '2 Gardens', '1 Club House', '4 Gates'],
    images: [homes1, homes4, homes5, homes3, homes2],
    inventory: [
      { floor: 'Premium Luxury', count: '70 Bungalows', size: '350 to 425 sq. yards' },
    ],
  },
  {
    id: 'sangrilla-villa',
    name: 'Sangrilla Villa',
    tagline: 'Township Life Elevated',
    year: '2010',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Bungalows' },
      { label: 'Year Completed', value: '2010' },
      { label: 'Total Bungalows', value: '79' },
    ],
    description: 'A large-scale, well-planned residential township with comprehensive amenities and vibrant community living.',
    amenities: ['2 Common Plots', '3 Gates', '1 Club House'],
    images: [villa5, villa4, villa2, villa1, villa3],
    inventory: [
      { floor: 'Type A', count: '46 Bungalows', size: '200 sq. yards' },
      { floor: 'Type B', count: '33 Bungalows', size: '175 sq. yards' },
    ],
  },
  {
    id: 'sangrilla-residency',
    name: 'Sangrilla Residency',
    tagline: 'Quality Crafted Homes',
    year: '2007',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Flats' },
      { label: 'Year Completed', value: '2007' },
      { label: 'Total Flats', value: '8 Premium Luxury' },
    ],
    description: 'Elegant and spacious flats known for superior quality construction and comfortable family homes.',
    amenities: ['Gated Community', 'Gardens', 'Security', 'Parking', 'Community Hall', 'Children\'s Play Area'],
    images: [residency3, residency4, residency5, residency1, residency2],
    inventory: [
      { floor: 'Premium Luxury', count: '8 Flats', size: '280 sq. yards' },
    ],
  },
  {
    id: 'sangrilla-park',
    name: 'Sangrilla Park',
    tagline: 'Serene Homes, Green Spaces',
    year: '2006',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Bungalows' },
      { label: 'Year Completed', value: '2006' },
      { label: 'Total Bungalows', value: '76 Premium' },
    ],
    description: 'A serene residential project with beautiful landscaping and modern homes, offering a peaceful and green environment.',
    amenities: ['2 Common Plots', '2 Gates', '1 Club House'],
    images: [park3, park4, park5, park2, park1],
    inventory: [
      { floor: 'Premium', count: '76 Bungalows', size: '180 to 260 sq. yards' },
    ],
  },
  {
    id: 'sangrilla-society',
    name: 'Sangrilla Society',
    tagline: 'Modern Apartment Living',
    year: '2004',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Bungalows' },
      { label: 'Year Completed', value: '2004' },
      { label: 'Total Bungalows', value: '191 (Parts A, B & C)' },
    ],
    description: 'High-quality residential bungalows offering excellent value and a modern lifestyle with all essential amenities.',
    amenities: ['3 Common Plots', '2 Gardens', '1 Club House', '3 Gates'],
    images: [society3, society2, society5, society4, society1],
    inventory: [
      { floor: 'Type A', count: '75 Bungalows', size: '215 sq. yards' },
      { floor: 'Type B', count: '60 Bungalows', size: '180 sq. yards' },
      { floor: 'Type C', count: '56 Bungalows', size: '160 sq. yards' },
    ],
  },
  {
    id: 'sangrilla-township',
    name: 'Sangrilla Township',
    tagline: 'Classic Community Living',
    year: '2004',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Township' },
      { label: 'Year Completed', value: '2004' },
      { label: 'Total Bungalows', value: '185 (Parts A, B & C)' },
    ],
    description: 'Classic and spacious bungalows built with trust and superior workmanship, creating a warm and connected community living experience.',
    amenities: ['2 Common Plots', '2 Gardens', '2 Gates', '1 Club House'],
    images: [township4, township2, township5, township1, township3],
    inventory: [
      { floor: 'Type A', count: '40 Bungalows', size: '210 sq. yards' },
      { floor: 'Type B', count: '65 Bungalows', size: '175 sq. yards' },
      { floor: 'Type C', count: '80 Bungalows', size: '160 sq. yards' },
    ],
  },
  {
    id: 'sangrilla-bunglows',
    name: 'Sangrilla Bunglows',
    tagline: 'Where Heritage Meets Home',
    year: '2003',
    status: 'completed',
    type: 'residential',
    specs: [
      { label: 'Type', value: 'Bungalows' },
      { label: 'Year Completed', value: '2003' },
      { label: 'Total Bungalows', value: '94 (Parts A & B)' },
    ],
    description: 'Premium bungalow project delivering luxurious and spacious independent homes — a testament to Sangrilla\'s enduring legacy of quality.',
    amenities: ['1 Common Plot', '1 Garden', '2 Parks (Playground)', '1 Water Tank', '2 Gates', '1 Club House'],
    images: [bunglows5, bunglows3, bunglows4, bunglows1, bunglows2],
    inventory: [
      { floor: 'First Floor', count: '42 Shops', size: '230 sq.ft.' },
      { floor: 'Second Floor', count: '42 Shops', size: '230 sq.ft.' },
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  const normalizedId = id.toLowerCase().trim().replace(/\s+/g, '-');
  return allProjects.find(p => p.id === normalizedId || p.id.toLowerCase() === id.toLowerCase());
};

export const commercialProjects = allProjects.filter(p => p.type === 'commercial');
export const residentialProjects = allProjects.filter(p => p.type === 'residential');
