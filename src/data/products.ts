export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Lámina Calle de la Media Luna',
    description: 'Impresión de alta calidad de la histórica calle, disponible en varios tamaños.',
    price: 45000,
    category: 'Láminas',
  },
  {
    id: 'p2',
    name: 'Lámina Catedral de Cartagena',
    description: 'Hermosa impresión de la Catedral Basílica Metropolitana.',
    price: 55000,
    category: 'Láminas',
  },
  {
    id: 'p3',
    name: 'Postal Colección Nomenclador',
    description: 'Set de 10 postales con las calles más emblemáticas del Centro Histórico.',
    price: 25000,
    category: 'Postales',
  },
  {
    id: 'p4',
    name: 'Lámina Murallas de Cartagena',
    description: 'Vista panorámica de las murallas y el mar Caribe.',
    price: 60000,
    category: 'Láminas',
  },
  {
    id: 'p5',
    name: 'Postal Calle del Arzobispado',
    description: 'Postal individual de la Calle del Arzobispado con su historia al respaldo.',
    price: 5000,
    category: 'Postales',
  },
  {
    id: 'p6',
    name: 'Lámina Plaza de Bolívar',
    description: 'Impresión de la Plaza de Bolívar con la Catedral al fondo.',
    price: 48000,
    category: 'Láminas',
  },
  {
    id: 'p7',
    name: 'Set Postales Monumentos',
    description: 'Set de 5 postales con los monumentos históricos más representativos.',
    price: 18000,
    category: 'Postales',
  },
  {
    id: 'p8',
    name: 'Lámina Calles Coloniales',
    description: 'Colección de 3 láminas con diferentes calles del Centro Histórico.',
    price: 95000,
    category: 'Láminas',
  },
  {
    id: 'p9',
    name: 'Postal Bastión de San Felipe',
    description: 'Postal del Bastión de San Felipe con datos históricos.',
    price: 5000,
    category: 'Postales',
  },
  {
    id: 'p10',
    name: 'Lámina Panorámica Nocturna',
    description: 'Vista nocturna de la ciudad amurallada iluminada.',
    price: 65000,
    category: 'Láminas',
  },
];
