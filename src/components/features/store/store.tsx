import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';

import { ThemedText, ThemedView } from '../../shared';
import { products } from '@/src/data/products';
import { ProductCard } from './product-card';
import { storeStyles } from './store.styles';
import { useCart } from '@/src/state/cart-context';
import { VINTAGE_COLORS } from '@/src/constants/vintage';

const categories = ['Todas', 'Láminas', 'Postales'];

export function StoreScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const { count, total, addItem } = useCart();

  const filtered =
    selectedCategory === 'Todas'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const openCart = () => {
    router.push('/modal');
  };

  return (
    <ThemedView style={storeStyles.container}>
      {/* Header */}
      <View style={storeStyles.header}>
        <View>
          <ThemedText style={storeStyles.headerTitle}>Tienda</ThemedText>
          <ThemedText style={storeStyles.headerSubtitle}>
            Lleva la historia contigo
          </ThemedText>
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

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={storeStyles.categoriesContainer}
        style={storeStyles.categoriesScroll}
      >
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[
              storeStyles.categoryChip,
              selectedCategory === cat && storeStyles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <ThemedText
              style={[
                storeStyles.categoryChipText,
                selectedCategory === cat && storeStyles.categoryChipTextActive,
              ]}
            >
              {cat}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Products grid */}
      <View style={{ flex: 1 }}>
        <FlatList
          key={selectedCategory}
          data={filtered}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={storeStyles.productsGrid}
          columnWrapperStyle={storeStyles.productsRow}
          renderItem={({ item }) => <ProductCard product={item} onAddToCart={addItem} />}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          ListEmptyComponent={
            <View style={storeStyles.emptyContainer}>
              <Ionicons name="bag-outline" size={48} color="#C9B89F" />
              <ThemedText style={storeStyles.emptyText}>
                No hay productos en esta categoría
              </ThemedText>
            </View>
          }
        />

        {/* Floating cart bar */}
        {count > 0 && (
          <View style={storeStyles.cartBar}>
            <View>
              <Text style={storeStyles.cartBarText}>
                {count} artículo{count !== 1 ? 's' : ''}
              </Text>
              <Text style={storeStyles.cartBarTotal}>
                Total: ${total.toLocaleString('es-CO')}
              </Text>
            </View>
            <Pressable style={storeStyles.cartBarButton} onPress={openCart}>
              <Text style={storeStyles.cartBarButtonText}>Ir al carrito</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ThemedView>
  );
}