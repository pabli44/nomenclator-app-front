import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { ThemedText } from '../../shared';
import { type Product } from '@/src/data/products';
import { storeStyles } from './store.styles';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={storeStyles.card}>
      <View style={storeStyles.cardImagePlaceholder}>
        <Ionicons name="image" size={36} color="#9A8D7E" />
      </View>
      <View style={storeStyles.cardBody}>
        <ThemedText style={storeStyles.cardCategory}>{product.category}</ThemedText>
        <ThemedText style={storeStyles.cardName} numberOfLines={2}>
          {product.name}
        </ThemedText>
        <ThemedText style={storeStyles.cardPrice}>
          ${product.price.toLocaleString('es-CO')}
        </ThemedText>
        <Pressable style={storeStyles.cardButton}>
          <ThemedText style={storeStyles.cardButtonText}>Comprar</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
