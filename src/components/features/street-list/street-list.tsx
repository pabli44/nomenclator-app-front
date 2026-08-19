import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText, ThemedView } from '../../shared';
import { VintageBackHeader } from '@/src/components/ui';
import { streets } from '@/src/data/streets';
import { streetListStyles } from './street-list.styles';
import { VINTAGE_COLORS } from '@/src/constants/vintage';
import { useCollection } from '@/src/state/collection-context';

export function StreetListScreen() {
  const router = useRouter();
  const { savedStreetIds, toggleSaveStreet } = useCollection();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: VINTAGE_COLORS.parchment }}
      edges={['top', 'left', 'right']}
    >
      <VintageBackHeader title="Explorar calles" />
      <ThemedView style={streetListStyles.container}>
        <FlatList
          data={streets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={streetListStyles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSaved = savedStreetIds.has(item.id);
            return (
              <Pressable
                style={streetListStyles.card}
                onPress={() => router.push(`/street/${item.id}` as any)}
              >
                {item.imageBefore ? (
                  <Image source={item.imageBefore} style={streetListStyles.cardImage} resizeMode="cover" />
                ) : (
                  <View style={streetListStyles.cardImagePlaceholder}>
                    <Ionicons name="location" size={28} color="#9A8D7E" />
                  </View>
                )}
                <View style={streetListStyles.cardContent}>
                  <ThemedText style={streetListStyles.cardName}>{item.name}</ThemedText>
                  <View style={streetListStyles.cardPeriodRow}>
                    <View style={streetListStyles.periodBadge}>
                      <ThemedText style={streetListStyles.periodText}>{item.period}</ThemedText>
                    </View>
                    <ThemedText style={streetListStyles.monumentCount}>
                      {item.monuments.length} monumento{item.monuments.length !== 1 ? 's' : ''}
                    </ThemedText>
                  </View>
                  <ThemedText style={streetListStyles.cardDescription} numberOfLines={2}>
                    {item.description}
                  </ThemedText>
                </View>
                <Pressable
                  style={{ padding: 8 }}
                  onPress={() => void toggleSaveStreet(item.id)}
                  hitSlop={4}
                  accessibilityRole="button"
                  accessibilityLabel={isSaved ? `Quitar ${item.name} de guardados` : `Guardar ${item.name}`}
                >
                  <Ionicons
                    name={isSaved ? 'bookmark' : 'bookmark-outline'}
                    size={22}
                    color={isSaved ? VINTAGE_COLORS.accent : '#C9B89F'}
                  />
                </Pressable>
              </Pressable>
            );
          }}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
