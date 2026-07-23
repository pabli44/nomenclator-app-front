import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

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

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={storeStyles.categoriesContainer}
        renderItem={({ item }) => (
          <Pressable
            style={[
              storeStyles.categoryChip,
              selectedCategory === item && storeStyles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <ThemedText
              style={[
                storeStyles.categoryChipText,
                selectedCategory === item && storeStyles.categoryChipTextActive,
              ]}
            >
              {item}
            </ThemedText>
          </Pressable>
        )}
        keyExtractor={(item) => item}
      />

      <FlatList
        data={filtered}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={storeStyles.productsGrid}
        columnWrapperStyle={storeStyles.productsRow}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
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
