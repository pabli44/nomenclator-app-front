import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';

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

  return (
    <ThemedView style={storeStyles.container}>
      <View style={storeStyles.header}>
        <View>
          <ThemedText style={storeStyles.headerTitle}>Tienda</ThemedText>
          <ThemedText style={storeStyles.headerSubtitle}>
            Lleva la historia contigo
          </ThemedText>
        </View>
        <Ionicons name="cart-outline" size={28} color="#5D4B38" />
      </View>

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
    </ThemedView>
  );
}
