export interface Project {
  id: string;
  name: string;
  tagline: string;
  status: 'active' | 'completed';
  type: 'Apartments' | 'Villas' | 'Commercial' | 'Plots';
  bhk: string[];
  location: string;
  description: string;
  highlights: string[];
  images: string[];
  rera: string;
}

export const properties: Project[] = [
  {
    id: 'sangrilla-meadows',
    name: 'Sangrilla Meadows',
    tagline: 'Residential Plots & Luxurious Villas',
    status: 'active',
    type: 'Plots',
    bhk: ['Plots (100–300 Sq. Yd.)', '2BHK Weekend Villas'],
    location: 'Aakru Village, Dholera-SIR, Gujarat',
    description: 'Sangrilla Meadows is a premium residential plotting & villa project at the gateway of Dholera SIR. NA/NOC Clear, Govt. Approved with immediate Dastavej.',
    highlights: ['Dholera SIR Gateway', '₹7,500/Sq. Yd. Plots', '₹36L 2BHK Villas', 'Guaranteed Rental Option', 'Waterlogging-Free'],
    images: [
      '/assets/residential/up_res_1.jpg',
      '/assets/residential/up_res_2.jpg'
    ],
    rera: 'Govt. Approved / Plan Pass'
  },
  {
    id: 'anantaa-homes',
    name: 'Anantaa Homes',
    tagline: 'Luxury Reimagined',
    status: 'active',
    type: 'Apartments',
    bhk: ['2 BHK', '3 BHK'],
    location: 'Satellite/SG Highway area, Ahmedabad',
    description: 'Anantaa Homes offers a blend of luxury and convenience with modern amenities and prime location advantages.',
    highlights: ['Prime Location', 'Modern Club House', '24/7 Security', 'High ROI'],
    images: [
      '/assets/ai-assistant/anantaa_exterior.png',
      '/assets/ai-assistant/anantaa_interior.png'
    ],
    rera: 'PR/GJ/AHMEDABAD/AUDA/RAA00000/000000'
  },
  {
    id: 'supan-residency',
    name: 'Supan Residency',
    tagline: 'Life in Harmony',
    status: 'active',
    type: 'Villas',
    bhk: ['3 BHK', '4 BHK Villas'],
    location: 'Bopal/Shela area, Ahmedabad',
    description: 'Supan Residency is a premium gated community featuring spacious villas and modern infrastructure for an elevated lifestyle.',
    highlights: ['Gated Community', 'Private Gardens', 'Community Hall', 'Ready Possession'],
    images: [
      '/assets/ai-assistant/supan_exterior.png',
      '/assets/ai-assistant/supan_villas.png'
    ],
    rera: 'PR/GJ/AHMEDABAD/CITY/RAA00000/000000'
  },
  {
    id: 'sangrilla-heights',
    name: 'Sangrilla Heights',
    tagline: 'Completed Excellence',
    status: 'completed',
    type: 'Apartments',
    bhk: ['2 BHK', '3 BHK'],
    location: 'Ahmedabad',
    description: 'A benchmark in luxury living, completed with 100% occupancy and happy families.',
    highlights: ['Developed Area', 'Strong Community', 'Completed Project'],
    images: ['https://images.unsplash.com/photo-1600607686527-6fb886090705'],
    rera: 'Completed'
  }
];

export const sangrillaKnowledgeBase = {
  tagline: 'Aspire to Grow.',
  strengths: [
    'Prime Ahmedabad locations',
    'Luxury + Value',
    'Strong appreciation',
    'Community living',
    '25+ years excellence',
    '1500+ happy families'
  ],
  contact: {
    phone: '+91 97372 27999',
    whatsapp: '+91 97372 27999',
    email: 'sangrillagroup@gmail.com',
    office: 'Sangrilla Group, The CBD Mall, Nr. Vaishnodevi Circle, Ahmedabad'
  }
};
