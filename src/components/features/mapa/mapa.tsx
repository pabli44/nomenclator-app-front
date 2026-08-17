import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState, useMemo } from 'react';
import { FlatList, Pressable, TextInput, View, Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

import { MapView, Marker } from './MapViewWrapper';
import { ThemedText, ThemedView } from '../../shared';
import { CastleIcon } from '../castle';
import { streets } from '@/src/data/streets';
import { mapaStyles } from './mapa.styles';
import { RibbonBadge, VintageButton, ParchmentCard } from '@/src/components/ui';
import { VINTAGE_COLORS } from '@/src/constants/vintage';

import type { Street } from '@/src/data/streets';

type LocationStatus = 'idle' | 'granted' | 'denied' | 'error';

export function Mapa() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<Street | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (cancelled) return;
        if (status !== 'granted') {
          setLocationStatus('denied');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        if (cancelled) return;
        setUserLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        setLocationStatus('granted');
      } catch {
        if (!cancelled) setLocationStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredStreets = useMemo(
    () =>
      searchQuery
        ? streets.filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : [],
    [searchQuery],
  );

  const handleStreetPress = (id: string) => {
    setSearchQuery('');
    setSelectedStreet(null);
    router.push(`/street/${id}` as any);
  };

  const handleMarkerSelect = (markerKey: string) => {
    const index = parseInt(markerKey.replace('marker-', ''), 10);
    if (index < streets.length) {
      setSelectedStreet(streets[index]);
    }
  };

  return (
    <ThemedView style={mapaStyles.container}>
      <View style={[mapaStyles.headerContainer, { paddingTop: insets.top + 12 }]}>
        <CastleIcon size={50} color={VINTAGE_COLORS.brown} />
        <ThemedText style={mapaStyles.mainTitle}>Cartagena</ThemedText>
        <ThemedText style={mapaStyles.subtitle}>• NOMENCLADOR •</ThemedText>
      </View>

      <View style={mapaStyles.searchContainer}>
        <Ionicons name="search" size={20} color="#8B8680" style={mapaStyles.searchIcon} />
        <TextInput
          style={mapaStyles.searchInput}
          placeholder="Buscar calle o monumento..."
          placeholderTextColor="#A89A8E"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <Pressable
            onPress={() => setSearchQuery('')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="close-circle" size={20} color="#8B8680" />
          </Pressable>
        ) : null}
      </View>

      {searchQuery && filteredStreets.length > 0 ? (
        <View style={mapaStyles.searchResultsContainer}>
          <FlatList
            data={filteredStreets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                style={mapaStyles.searchResultItem}
                onPress={() => handleStreetPress(item.id)}
              >
                <Ionicons name="location-outline" size={18} color={VINTAGE_COLORS.brown} />
                <View style={mapaStyles.searchResultText}>
                  <ThemedText style={mapaStyles.searchResultName}>{item.name}</ThemedText>
                  <ThemedText style={mapaStyles.searchResultPeriod}>{item.period}</ThemedText>
                </View>
              </Pressable>
            )}
            style={mapaStyles.searchResultsList}
          />
        </View>
      ) : null}

      <View style={mapaStyles.mapWrapper}>
        <MapView
          style={mapaStyles.mapView}
          onMarkerSelect={handleMarkerSelect}
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              isUserLocation
            />
          )}
          {streets.map((street) => (
            <Marker
              key={street.id}
              coordinate={{ latitude: street.latitude, longitude: street.longitude }}
              title={street.name}
            />
          ))}
        </MapView>

        {locationStatus === 'denied' || locationStatus === 'error' ? (
          <View style={mapaStyles.locationNotice}>
            <Ionicons name="location-outline" size={14} color={VINTAGE_COLORS.textMuted} />
            <Text style={mapaStyles.locationNoticeText}>
              Ubicación no disponible — explora el mapa
            </Text>
          </View>
        ) : null}

        {/* Floating street card */}
        {selectedStreet && (
          <View style={mapaStyles.floatingCard}>
            <ParchmentCard>
              <View style={mapaStyles.floatingCardRow}>
                {selectedStreet.imageBefore ? (
                  <Image
                    source={selectedStreet.imageBefore}
                    style={mapaStyles.floatingCardImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={mapaStyles.floatingCardImagePlaceholder}>
                    <Ionicons name="image-outline" size={24} color={VINTAGE_COLORS.placeholderText} />
                  </View>
                )}
                <View style={mapaStyles.floatingCardInfo}>
                  <ThemedText style={mapaStyles.floatingCardName}>
                    {selectedStreet.name}
                  </ThemedText>
                  <RibbonBadge label={selectedStreet.period} />
                  <ThemedText style={mapaStyles.floatingCardDesc} numberOfLines={2}>
                    {selectedStreet.description}
                  </ThemedText>
                </View>
              </View>
              <View style={mapaStyles.floatingCardActions}>
                <VintageButton
                  onPress={() => handleStreetPress(selectedStreet.id)}
                  color={VINTAGE_COLORS.brown}
                  style={mapaStyles.floatingCardBtn}
                >
                  Ver detalle
                </VintageButton>
                <Pressable
                  onPress={() => setSelectedStreet(null)}
                  style={mapaStyles.floatingCardClose}
                  hitSlop={12}
                >
                  <Ionicons name="close-circle-outline" size={24} color={VINTAGE_COLORS.textMuted} />
                </Pressable>
              </View>
            </ParchmentCard>
          </View>
        )}
      </View>

      <View style={mapaStyles.quickActions}>
        <Pressable
          style={[mapaStyles.quickActionBtn, { backgroundColor: VINTAGE_COLORS.teal }]}
          onPress={() => router.push('/calles' as any)}
        >
          <Ionicons name="leaf" size={22} color="white" />
          <ThemedText style={mapaStyles.quickActionLabel}>Explorar</ThemedText>
        </Pressable>
        <Pressable
          style={[mapaStyles.quickActionBtn, { backgroundColor: VINTAGE_COLORS.brown }]}
          onPress={() => router.push('/(tabs)/tienda' as any)}
        >
          <Ionicons name="pricetag" size={22} color="white" />
          <ThemedText style={mapaStyles.quickActionLabel}>Tienda</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}