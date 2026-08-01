import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ParchmentCard, RibbonBadge, VintageButton } from '@/src/components/ui';
import { streets } from '@/src/data/streets';

const TABS = ['Favoritos', 'Recuerdos', 'Esquelas'];

// Sample saved places (first 3 streets)
const savedPlaces = streets.slice(0, 3);

// Sample memories grid
const memories = [
  { id: 'm1', name: 'Calle de la Media Luna', image: streets[0].imageBefore },
  { id: 'm2', name: 'Catedral de Cartagena', image: undefined },
  { id: 'm3', name: 'Murallas del Mar', image: undefined },
  { id: 'm4', name: 'Plaza de Bolívar', image: undefined },
];

export default function ColeccionScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Favoritos');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8DFD5' }} edges={['top', 'left', 'right']}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          paddingTop: 16,
          paddingBottom: 20,
          paddingHorizontal: 16,
        }}
      >
        <Ionicons name="bookmark" size={24} color="#C85A54" />
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#3D2817', letterSpacing: 2 }}>
          Mi Colección
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Category Tabs */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 20 }}>
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: activeTab === tab ? '#C85A54' : '#F4E8D8',
                borderWidth: 1,
                borderColor: activeTab === tab ? '#C85A54' : '#D9CCC0',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: activeTab === tab ? 'white' : '#7D6B56',
                }}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === 'Favoritos' && (
          <>
            {/* Lugares Guardados */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#3D2817' }}>
                  Lugares Guardados
                </Text>
                <Pressable>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#C85A54' }}>
                    Ver todos
                  </Text>
                </Pressable>
              </View>

              {savedPlaces.map((place) => (
                <Pressable
                  key={place.id}
                  onPress={() => router.push(`/street/${place.id}` as any)}
                  style={{ marginBottom: 10 }}
                >
                  <ParchmentCard>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      {place.imageBefore ? (
                        <Image
                          source={place.imageBefore}
                          style={{ width: 56, height: 56, borderRadius: 8 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <View
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 8,
                            backgroundColor: '#DFD4C4',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Ionicons name="location-outline" size={28} color="#9A8D7E" />
                        </View>
                      )}
                      <View style={{ flex: 1, justifyContent: 'center', gap: 4 }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#3D2817' }}>
                          {place.name}
                        </Text>
                        <RibbonBadge label={place.period} />
                        <Text
                          style={{ fontSize: 11, color: '#6B5D4F', lineHeight: 15 }}
                          numberOfLines={2}
                        >
                          {place.description}
                        </Text>
                      </View>
                      <Pressable style={{ alignSelf: 'center', padding: 4 }}>
                        <Ionicons name="heart" size={20} color="#C85A54" />
                      </Pressable>
                    </View>
                  </ParchmentCard>
                </Pressable>
              ))}
            </View>

            {/* Cartagena en Recuerdos */}
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#3D2817', marginBottom: 12 }}>
                Cartagena en Recuerdos
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {memories.map((mem) => (
                  <ParchmentCard key={mem.id} style={{ width: '47%' }}>
                    <View style={{ padding: 0 }}>
                      <View
                        style={{
                          height: 100,
                          backgroundColor: '#DFD4C4',
                          borderRadius: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 8,
                        }}
                      >
                        {mem.image ? (
                          <Image
                            source={mem.image}
                            style={{ width: '100%', height: '100%', borderRadius: 8 }}
                            resizeMode="cover"
                          />
                        ) : (
                          <Ionicons name="image-outline" size={32} color="#9A8D7E" />
                        )}
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: '#3D2817',
                          textAlign: 'center',
                        }}
                      >
                        {mem.name}
                      </Text>
                    </View>
                  </ParchmentCard>
                ))}
              </View>
            </View>

            {/* Banner */}
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 24,
                backgroundColor: '#5A7A72',
                borderRadius: 12,
                padding: 20,
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Ionicons name="send" size={28} color="white" />
              <Text style={{ fontSize: 16, fontWeight: '700', color: 'white', textAlign: 'center' }}>
                Envía un recuerdo
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center',
                  lineHeight: 18,
                }}
              >
                Comparte la historia de Cartagena con quien más quieres
              </Text>
              <VintageButton
                onPress={() => router.push('/(tabs)/tienda' as any)}
                color="white"
                style={{
                  marginTop: 4,
                  paddingHorizontal: 24,
                  paddingVertical: 10,
                  backgroundColor: 'white',
                  borderColor: 'white',
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#5A7A72' }}>
                  Tienda de Esquelas
                </Text>
              </VintageButton>
            </View>
          </>
        )}

        {activeTab !== 'Favoritos' && (
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 60, gap: 12 }}>
            <Ionicons name="time-outline" size={48} color="#D9CCC0" />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#7D6B56' }}>
              Próximamente
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
