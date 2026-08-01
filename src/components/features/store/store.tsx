import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';

import { ThemedText, ThemedView } from '../../shared';
import { products } from '@/src/data/products';
import { ProductCard } from './product-card';
import { storeStyles } from './store.styles';

const categories = ['Todas', 'Láminas', 'Postales'];

export function StoreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filtered =
    selectedCategory === 'Todas'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Sample cart total
  const cartItemCount = 1;
  const cartTotal = 9990; // $9.99 USD equivalent in COP

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
        <Pressable style={{ position: 'relative' }}>
          <Ionicons name="cart-outline" size={28} color="#5D4B38" />
          {cartItemCount > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -6,
                backgroundColor: '#C85A54',
                width: 18,
                height: 18,
                borderRadius: 9,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: '800' }}>
                {cartItemCount}
              </Text>
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
          renderItem={({ item }) => <ProductCard product={item} />}
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
        {cartItemCount > 0 && (
          <View style={storeStyles.cartBar}>
            <View>
              <Text style={storeStyles.cartBarText}>
                {cartItemCount} artículo{cartItemCount !== 1 ? 's' : ''}
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 12,
                  fontWeight: '600',
                  marginTop: 2,
                }}
              >
                Total: ${cartTotal.toLocaleString('es-CO')}
              </Text>
            </View>
            <Pressable style={storeStyles.cartBarButton}>
              <Text style={storeStyles.cartBarButtonText}>Ir al carrito</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ThemedView>
  );
}
