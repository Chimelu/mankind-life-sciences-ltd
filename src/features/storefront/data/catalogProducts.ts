import type { Product } from '../components/ProductCard'

export type ProductGroup = 'Drugs' | 'Non-Drugs' | 'Laboratory Tests'

export type CatalogProduct = Product & {
  brand: string
  group: ProductGroup
  manufacturer: string
  packSize: string
  description: string
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: 101,
    name: 'Mankind Paracetamol 500mg',
    category: 'Pain Relievers',
    brand: 'Mankind',
    group: 'Drugs',
    manufacturer: 'Mankind Life-Sciences Manufacturing Unit',
    packSize: '8 strips per box',
    description:
      'Fast-acting pain and fever relief tablet manufactured under controlled pharmaceutical standards for reliable daily use.',
    price: 300,
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 102,
    name: 'Mankind Panadol 500mg Strip',
    category: 'Pain Relievers',
    brand: 'Mankind',
    group: 'Drugs',
    manufacturer: 'Mankind Life-Sciences Manufacturing Unit',
    packSize: '1 strip',
    description:
      'Quality controlled analgesic strip for pain relief programs in pharmacies, hospitals, and dealers.',
    price: 550,
    image:
      'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 103,
    name: 'Mankind Cough Relief Syrup',
    category: 'Cough, Cold and Flu',
    brand: 'Mankind',
    group: 'Drugs',
    manufacturer: 'Mankind Life-Sciences Manufacturing Unit',
    packSize: '120ml bottle',
    description:
      'Soothing cough and respiratory support syrup formulated with safety and compliance at manufacturer level.',
    price: 1850,
    image:
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 104,
    name: 'Mankind Loratyn 10mg',
    category: 'Anti-asthma',
    brand: 'Mankind',
    group: 'Drugs',
    manufacturer: 'Mankind Life-Sciences Manufacturing Unit',
    packSize: '10 tablets',
    description:
      'Allergy support tablets produced for reliable anti-histamine response in retail and institutional supply.',
    price: 550,
    image:
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 105,
    name: 'Mankind Vitaced Complete',
    category: 'Vitamins and Supplements',
    brand: 'Vitaced',
    group: 'Drugs',
    manufacturer: 'Mankind Life-Sciences Nutraceutical Division',
    packSize: '30 tablets',
    description:
      'Daily multivitamin support pack manufactured for immunity and nutritional balance.',
    price: 17550,
    image:
      'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 106,
    name: 'Mankind Adhesive Plaster Pack',
    category: 'Medical Devices',
    brand: 'Mankind',
    group: 'Non-Drugs',
    manufacturer: 'Mankind Medical Consumables',
    packSize: '20 strips',
    description:
      'Sterile adhesive support for first-aid and outpatient use across hospitals and dealer channels.',
    price: 500,
    image:
      'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 107,
    name: 'Mankind Digital Thermometer',
    category: 'Medical Devices',
    brand: 'Mankind',
    group: 'Non-Drugs',
    manufacturer: 'Mankind Medical Devices',
    packSize: '1 unit',
    description:
      'Clinical-grade digital thermometer suitable for home and facility temperature monitoring.',
    price: 3950,
    image:
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 108,
    name: 'Mankind Baby Care Lotion',
    category: 'Baby Care',
    brand: 'Mankind',
    group: 'Non-Drugs',
    manufacturer: 'Mankind Personal Care Division',
    packSize: '200ml bottle',
    description:
      'Dermatologically balanced lotion for gentle infant skin protection and hydration.',
    price: 4200,
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 109,
    name: 'Mankind Premium Gloves',
    category: 'Personal Care',
    brand: 'Mankind',
    group: 'Non-Drugs',
    manufacturer: 'Mankind Medical Consumables',
    packSize: '50 pairs',
    description:
      'Protective disposable gloves built for clinic and laboratory environments.',
    price: 2600,
    image:
      'https://images.unsplash.com/photo-1583947582886-f40ec95dd752?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 110,
    name: 'Mankind Lab Diagnostics Strip',
    category: 'Diagnostics',
    brand: 'Mankind Labs',
    group: 'Laboratory Tests',
    manufacturer: 'Mankind Laboratory Systems',
    packSize: '25 test strips',
    description:
      'Laboratory-ready diagnostics strips with stable quality performance and traceability.',
    price: 12200,
    image:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 111,
    name: 'Mankind Urinalysis Kit',
    category: 'Diagnostics',
    brand: 'Mankind Labs',
    group: 'Laboratory Tests',
    manufacturer: 'Mankind Laboratory Systems',
    packSize: '1 kit',
    description:
      'Clinical urinalysis kit designed for consistent test support in diagnostic centers.',
    price: 14300,
    image:
      'https://images.unsplash.com/photo-1578496479531-32e3f7f3f28f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 112,
    name: 'Mankind Rapid Test Cassette',
    category: 'Diagnostics',
    brand: 'Mankind Labs',
    group: 'Laboratory Tests',
    manufacturer: 'Mankind Laboratory Systems',
    packSize: '10 cassettes',
    description:
      'Rapid cassette testing solution made for dependable screening workflows.',
    price: 9600,
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
  },
]
