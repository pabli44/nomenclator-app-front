import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import { ThemedText } from '../../shared';
import { ParchmentView } from '@/src/components/ui';
import { products } from '@/src/data/products';
import { ProductCard } from './product-card';
import { storeStyles } from './store.styles';
import { useCart } from '@/src/state/cart-context';
import { VINTAGE_COLORS } from '@/src/constants/vintage';

export function StoreScreen() {
  const router = useRouter();
  const { count, total, addItem } = useCart();

  const openCart = () => {
    router.push('/modal');
  };

  return (
    <ParchmentView style={storeStyles.container}>
      {/* Header */}
      <View style={storeStyles.header}>
        <View>
          <ThemedText style={storeStyles.headerTitle}>Tienda</ThemedText>
          <ThemedText style={storeStyles.headerSubtitle}>Lleva la historia contigo</ThemedText>
        </View>
        <Pressable style={storeStyles.cartButton} onPress={openCart} hitSlop={4}>
          <Ionicons name="cart-outline" size={28} color={VINTAGE_COLORS.textSecondary} />
          {count > 0 && (
            <View style={storeStyles.cartBadge}>
              <Text style={storeStyles.cartBadgeText}>{count}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Products grid */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={storeStyles.productsGrid}
          columnWrapperStyle={storeStyles.productsRow}
          renderItem={({ item }) => <ProductCard product={item} onAddToCart={addItem} />}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
        />

        {/* Floating cart bar */}
        {count > 0 && (
          <View style={storeStyles.cartBar}>
            <View>
              <Text style={storeStyles.cartBarText}>
                {count} artículo{count !== 1 ? 's' : ''}
              </Text>
              <Text style={storeStyles.cartBarTotal}>Total: ${total.toLocaleString('es-CO')}</Text>
            </View>
            <Pressable style={storeStyles.cartBarButton} onPress={openCart}>
              <Text style={storeStyles.cartBarButtonText}>Ir al carrito</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ParchmentView>
  );
}