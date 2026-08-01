import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Pressable, View, Image } from 'react-native';

import { ThemedText } from '../../shared';
import { type Street } from '@/src/data/streets';
import { streetViewStyles } from './street-view.styles';
import { BeforeAfterSlider, ParchmentView, ParchmentCard, RibbonBadge, VintageButton } from '@/src/components/ui';

interface StreetViewProps {
  street: Street;
}

export function StreetView({ street }: StreetViewProps) {
  const hasBothImages = !!street.imageBefore && !!street.imageAfter;

  return (
    <ParchmentView>
      <ScrollView contentContainerStyle={streetViewStyles.scrollContent}>
        {/* Before/After Slider */}
        {hasBothImages ? (
          <BeforeAfterSlider
            beforeImage={street.imageBefore!}
            afterImage={street.imageAfter!}
            containerHeight={320}
          />
        ) : street.imageBefore ? (
          <View style={streetViewStyles.imageContainer}>
            <Image
              source={street.imageBefore}
              style={streetViewStyles.streetImage}
              resizeMode="cover"
            />
          </View>
        ) : null}

        {/* Info section */}
        <View style={streetViewStyles.infoSection}>
          <ThemedText style={streetViewStyles.streetName}>{street.name}</ThemedText>
          <RibbonBadge label={street.period} />
        </View>

        {/* History / Description card */}
        <View style={streetViewStyles.descriptionCard}>
          <ThemedText style={streetViewStyles.descriptionText}>{street.history}</ThemedText>
        </View>

        {/* Monuments section */}
        {street.monuments.length > 0 && (
          <View style={streetViewStyles.monumentsSection}>
            <ThemedText style={streetViewStyles.sectionTitle}>
              Monumentos destacados
            </ThemedText>
            {street.monuments.map((monument) => (
              <ParchmentCard key={monument.id}>
                <View style={streetViewStyles.monumentRow}>
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
                    <RibbonBadge label={monument.period} />
                    <ThemedText style={streetViewStyles.monumentDescription}>
                      {monument.description}
                    </ThemedText>
                  </View>
                </View>
              </ParchmentCard>
            ))}
          </View>
        )}

        {/* Action buttons */}
        <View style={streetViewStyles.actionButtons}>
          <VintageButton onPress={() => {}} color="#8B7355" style={streetViewStyles.actionBtnFlex}>
            <Ionicons name="cart" size={18} color="white" />
            Comprar imagen
          </VintageButton>
          <VintageButton onPress={() => {}} color="#8B7355" variant="outline" style={streetViewStyles.actionBtnFlex}>
            <Ionicons name="heart-outline" size={18} color="#8B7355" />
            Guardar
          </VintageButton>
        </View>
      </ScrollView>
    </ParchmentView>
  );
}
