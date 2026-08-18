import type { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: ImageSourcePropType;
  category: string;
}

export const products: Product[] = [
  {
    id: 'p3',
    name: 'Postal Colección Nomenclador',
    description: 'Set de 10 postales con las calles más emblemáticas del Centro Histórico.',
    price: 25000,
    category: 'Postales',
    image: require('@/assets/images/products/product_3.jpg'),
  },
  {
    id: 'p5',
    name: 'Postal Calle del Arzobispado',
    description: 'Postal individual de la Calle del Arzobispado con su historia al respaldo.',
    price: 5000,
    category: 'Postales',
    image: require('@/assets/images/products/product_5.jpg'),
  },
  {
    id: 'p7',
    name: 'Set Postales Monumentos',
    description: 'Set de 5 postales con los monumentos históricos más representativos.',
    price: 18000,
    category: 'Postales',
    image: require('@/assets/images/products/product_7.jpg'),
  },
  {
    id: 'p9',
    name: 'Postal Bastión de San Felipe',
    description: 'Postal del Bastión de San Felipe con datos históricos.',
    price: 5000,
    category: 'Postales',
    image: require('@/assets/images/products/product_9.jpg'),
  },
];