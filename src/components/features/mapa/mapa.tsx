import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { ThemedText, ThemedView } from '../../shared';
import { CastleIcon } from '../castle';
import { mapaStyles } from './mapa.styles';

export function Mapa() {
  return (
    <ThemedView style={mapaStyles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={mapaStyles.scrollContent}
      >
        {/* Header con imagen de castillo encima del texto */}
        <View style={mapaStyles.headerContainer}>
          <CastleIcon size={60} color="#8B7355" />
          <ThemedText style={mapaStyles.mainTitle}>Cartagena</ThemedText>
          <ThemedText style={mapaStyles.subtitle}>• NOMENCLADOR •</ThemedText>
        </View>

        {/* Search Bar - FUERA DEL MAPA */}
        <View style={mapaStyles.searchContainer}>
          <Ionicons name="search" size={20} color="#8B8680" style={mapaStyles.searchIcon} />
          <TextInput
            style={mapaStyles.searchInput}
            placeholder="Buscar calle o monumento..."
            placeholderTextColor="#A89A8E"
          />
        </View>

        {/* Map Area */}
        <View style={mapaStyles.mapContainer}>
          <View style={mapaStyles.mapImage}>
            {/* Pins en el mapa */}
            <View style={[mapaStyles.pin, { top: '20%', left: '22%' }]} />
            <View style={[mapaStyles.pin, { top: '38%', right: '18%' }]} />
            <View style={[mapaStyles.pin, { bottom: '18%', right: '12%' }]} />
            <View style={[mapaStyles.pin, { bottom: '28%', left: '18%' }]} />
            
            {/* Location Badge */}
            <View style={mapaStyles.locationBadge}>
              <Ionicons name="pin" size={18} color="white" />
              <ThemedText style={mapaStyles.locationText}>
                Usted está aquí
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={mapaStyles.infoCard}>
          <View style={mapaStyles.cardImagePlaceholder}>
            <Ionicons name="image" size={38} color="#9A8D7E" />
          </View>
          
          <View style={mapaStyles.cardTextContent}>
            <ThemedText style={mapaStyles.cardStreet}>
              Calle de la Media Luna
            </ThemedText>
            <ThemedText style={mapaStyles.cardPeriod}>
              Siglo XVII
            </ThemedText>
            <ThemedText style={mapaStyles.cardDescription}>
              Descubre la historia de esta calle.
            </ThemedText>
          </View>
        </View>

        {/* Carousel indicators */}
        <View style={mapaStyles.dotsContainer}>
          <View style={[mapaStyles.dot, mapaStyles.activeDot]} />
          <View style={mapaStyles.dot} />
          <View style={mapaStyles.dot} />
        </View>

        {/* Navigation Buttons */}
        <View style={mapaStyles.buttonsContainer}>
          <NavButton icon="leaf" label="Explorar" color="#5A7A72" />
          <NavButton icon="heart" label="Colección" color="#997A59" />
          <NavButton icon="pricetag" label="Tienda" color="#8B7355" />
          <NavButton icon="person-circle" label="Mi Perfil" color="#486B8E" />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

interface NavButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
}

function NavButton({ icon, label, color }: NavButtonProps) {
  return (
    <Pressable style={mapaStyles.navButtonWrapper}>
      <View style={[mapaStyles.navIconButton, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color="white" />
      </View>
      <ThemedText style={mapaStyles.navButtonLabel}>{label}</ThemedText>
    </Pressable>
  );
}
