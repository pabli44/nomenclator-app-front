import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';

import { ThemedText, ThemedView } from '../../shared';
import { type Street } from '@/src/data/streets';
import { streetViewStyles } from './street-view.styles';

interface StreetViewProps {
  street: Street;
}

export function StreetView({ street }: StreetViewProps) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <ThemedView style={streetViewStyles.container}>
      <ScrollView contentContainerStyle={streetViewStyles.scrollContent}>
        <View style={streetViewStyles.imageContainer}>
          <Image
            source={showAfter ? street.imageAfter : street.imageBefore}
            style={streetViewStyles.streetImage}
            resizeMode="cover"
          />
          <View style={streetViewStyles.imageOverlay}>
            <ThemedText style={streetViewStyles.imageLabel}>
              {showAfter ? 'AHORA' : 'ANTES'}
            </ThemedText>
          </View>

          <Pressable
            style={streetViewStyles.toggleBtn}
            onPress={() => setShowAfter(!showAfter)}
          >
            <Ionicons name="swap-horizontal" size={20} color="white" />
            <ThemedText style={streetViewStyles.toggleBtnText}>
              {showAfter ? 'Ver antes' : 'Ver ahora'}
            </ThemedText>
          </Pressable>
        </View>

        <View style={streetViewStyles.infoSection}>
          <ThemedText style={streetViewStyles.streetName}>{street.name}</ThemedText>
          <View style={streetViewStyles.periodBadge}>
            <ThemedText style={streetViewStyles.periodText}>{street.period}</ThemedText>
          </View>
        </View>

        <View style={streetViewStyles.descriptionCard}>
          <ThemedText style={streetViewStyles.descriptionText}>{street.history}</ThemedText>
        </View>

        {street.monuments.length > 0 && (
          <View style={streetViewStyles.monumentsSection}>
            <ThemedText style={streetViewStyles.sectionTitle}>
              Monumentos destacados
            </ThemedText>
            {street.monuments.map((monument) => (
              <View key={monument.id} style={streetViewStyles.monumentCard}>
                {monument.image ? (
                  <Image source={monument.image} style={streetViewStyles.monumentImage} resizeMode="cover" />
                ) : (
                  <View style={streetViewStyles.monumentImagePlaceholder}>
                    <Ionicons name="business" size={28} color="#9A8D7E" />
                  </View>
                )}
                <View style={streetViewStyles.monumentInfo}>
                  <ThemedText style={streetViewStyles.monumentName}>
                    {monument.name}
                  </ThemedText>
                  <ThemedText style={streetViewStyles.monumentPeriod}>
                    {monument.period}
                  </ThemedText>
                  <ThemedText style={streetViewStyles.monumentDescription}>
                    {monument.description}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={streetViewStyles.actionButtons}>
          <Pressable style={streetViewStyles.actionBtn}>
            <Ionicons name="cart" size={18} color="white" />
            <ThemedText style={streetViewStyles.actionBtnText}>Comprar imagen</ThemedText>
          </Pressable>
          <Pressable style={[streetViewStyles.actionBtn, streetViewStyles.actionBtnSecondary]}>
            <Ionicons name="heart-outline" size={18} color="#8B7355" />
            <ThemedText style={[streetViewStyles.actionBtnText, { color: '#8B7355' }]}>
              Guardar
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
