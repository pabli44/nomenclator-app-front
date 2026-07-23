import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useMemo } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { MapView, Marker, Callout } from './MapViewWrapper';

import { ThemedText, ThemedView } from '../../shared';
import { CastleIcon } from '../castle';
import { streets } from '@/src/data/streets';
import { mapaStyles } from './mapa.styles';

export function Mapa() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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
    router.push(`/street/${id}` as any);
  };

  return (
    <ThemedView style={mapaStyles.container}>
      <View style={mapaStyles.headerContainer}>
        <CastleIcon size={50} color="#8B7355" />
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
          <Pressable onPress={() => setSearchQuery('')}>
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
                <Ionicons name="location-outline" size={18} color="#8B7355" />
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

      <MapView
        style={mapaStyles.mapView}
        initialRegion={{
          latitude: 10.423,
          longitude: -75.5504,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation
        showsCompass
      >
        {streets.map((street) => (
          <Marker
            key={street.id}
            coordinate={{ latitude: street.latitude, longitude: street.longitude }}
            title={street.name}
            description={street.period}
            onCalloutPress={() => handleStreetPress(street.id)}
            pinColor="#C85A54"
          >
            <Callout>
              <View style={mapaStyles.calloutContainer}>
                <ThemedText style={mapaStyles.calloutTitle}>{street.name}</ThemedText>
                <ThemedText style={mapaStyles.calloutPeriod}>{street.period}</ThemedText>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={mapaStyles.quickActions}>
        <Pressable
          style={[mapaStyles.quickActionBtn, { backgroundColor: '#5A7A72' }]}
          onPress={() => router.push('/calles' as any)}
        >
          <Ionicons name="leaf" size={22} color="white" />
          <ThemedText style={mapaStyles.quickActionLabel}>Explorar</ThemedText>
        </Pressable>
        <Pressable
          style={[mapaStyles.quickActionBtn, { backgroundColor: '#8B7355' }]}
          onPress={() => router.push('/(tabs)/tienda' as any)}
        >
          <Ionicons name="pricetag" size={22} color="white" />
          <ThemedText style={mapaStyles.quickActionLabel}>Tienda</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}
