import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Image, Platform, Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '../../shared';
import { type Product } from '@/src/data/products';
import { storeStyles } from './store.styles';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1200);

    if (Platform.OS === 'ios') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={storeStyles.card}>
      {product.image ? (
        <Image source={product.image} style={storeStyles.cardImage} resizeMode="cover" />
      ) : (
        <View style={storeStyles.cardImagePlaceholder}>
          <Ionicons name="image" size={36} color="#9A8D7E" />
        </View>
      )}
      <View style={storeStyles.cardBody}>
        <View>
          <ThemedText style={storeStyles.cardCategory}>{product.category}</ThemedText>
          <ThemedText style={storeStyles.cardName} numberOfLines={2}>
            {product.name}
          </ThemedText>
        </View>
        <View>
          <ThemedText style={storeStyles.cardPrice}>
            ${product.price.toLocaleString('es-CO')}
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              storeStyles.cardButton,
              { opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={handleAddToCart}
          >
            <ThemedText style={storeStyles.cardButtonText}>
              {added ? '✓ Agregado' : 'Comprar'}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}