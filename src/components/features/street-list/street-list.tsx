import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, View } from 'react-native';

import { ThemedText, ThemedView } from '../../shared';
import { streets } from '@/src/data/streets';
import { streetListStyles } from './street-list.styles';

export function StreetListScreen() {
  const router = useRouter();

  return (
    <ThemedView style={streetListStyles.container}>
      <FlatList
        data={streets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={streetListStyles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={streetListStyles.card}
            onPress={() => router.push(`/street/${item.id}` as any)}
          >
            <View style={streetListStyles.cardImagePlaceholder}>
              <Ionicons name="location" size={28} color="#9A8D7E" />
            </View>
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
            <Ionicons name="chevron-forward" size={20} color="#C9B89F" />
          </Pressable>
        )}
      />
    </ThemedView>
  );
}
