import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ParchmentCard, RibbonBadge, VintageButton } from '@/src/components/ui';
import { streets } from '@/src/data/streets';
import { products } from '@/src/data/products';
import { VINTAGE_COLORS, VINTAGE_FONTS, VINTAGE_RADIUS } from '@/src/constants/vintage';
import { useCollection } from '@/src/state/collection-context';

const TABS = ['Favoritos', 'Recuerdos', 'Esquelas'];

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
  const { savedStreetIds, likedPostalIds, toggleSaveStreet, toggleLikePostal } = useCollection();

  // Filter streets that are saved by the user
  const savedStreets = streets.filter((place) => savedStreetIds.has(place.id));

  // Filter products (postals) that are liked by the user
  const likedPostals = products.filter((product) => likedPostalIds.has(product.id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: VINTAGE_COLORS.parchment }} edges={['top', 'left', 'right']}>
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
        <Ionicons name="bookmark" size={24} color={VINTAGE_COLORS.accent} />
        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            color: VINTAGE_COLORS.textPrimary,
            letterSpacing: 2,
            fontFamily: VINTAGE_FONTS.serif,
          }}
        >
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
                minHeight: 44,
                justifyContent: 'center',
                borderRadius: VINTAGE_RADIUS.pill,
                backgroundColor: activeTab === tab ? VINTAGE_COLORS.accent : VINTAGE_COLORS.card,
                borderWidth: 1,
                borderColor: activeTab === tab ? VINTAGE_COLORS.accent : VINTAGE_COLORS.cardBorder,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: activeTab === tab ? VINTAGE_COLORS.white : VINTAGE_COLORS.textMuted,
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
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: VINTAGE_COLORS.textPrimary,
                    fontFamily: VINTAGE_FONTS.serif,
                  }}
                >
                  Lugares Guardados
                </Text>
                <Pressable
                  onPress={() => router.push('/calles' as any)}
                  style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 4 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: VINTAGE_COLORS.accent }}>
                    Ver todos
                  </Text>
                </Pressable>
              </View>

              {savedStreets.length === 0 && likedPostals.length === 0 ? (
                <View style={{ alignItems: 'center', paddingVertical: 32, gap: 12 }}>
                  <Ionicons name="heart-outline" size={48} color={VINTAGE_COLORS.cardBorder} />
                  <Text style={{ fontSize: 14, color: VINTAGE_COLORS.textMuted, textAlign: 'center' }}>
                    No tienes lugares guardados aún.{'\n'}Explora las calles y postaless para guardarlos.
                  </Text>
                  <VintageButton
                    onPress={() => router.push('/calles' as any)}
                    color={VINTAGE_COLORS.white}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      minHeight: 40,
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '600', color: VINTAGE_COLORS.accent }}>
                      Explorar calles
                    </Text>
                  </VintageButton>
                </View>
              ) : (
                <>
                  {/* Streets saved */}
                  {savedStreets.map((place) => {
                    return (
                      <Pressable
                        key={`street-${place.id}`}
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
                                  backgroundColor: VINTAGE_COLORS.placeholder,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Ionicons name="location-outline" size={28} color={VINTAGE_COLORS.placeholderText} />
                              </View>
                            )}
                            <View style={{ flex: 1, justifyContent: 'center', gap: 4 }}>
                              <Text style={{ fontSize: 14, fontWeight: '700', color: VINTAGE_COLORS.textPrimary }}>
                                {place.name}
                              </Text>
                              <RibbonBadge label={place.period} />
                              <Text
                                style={{ fontSize: 11, color: VINTAGE_COLORS.textDescription, lineHeight: 15 }}
                                numberOfLines={2}
                              >
                                {place.description}
                              </Text>
                            </View>
                            <Pressable
                              style={{ alignSelf: 'center', padding: 12 }}
                              onPress={() => void toggleSaveStreet(place.id)}
                              hitSlop={4}
                              accessibilityRole="button"
                              accessibilityLabel={`Quitar ${place.name} de guardados`}
                            >
                              <Ionicons
                                name="bookmark"
                                size={20}
                                color={VINTAGE_COLORS.accent}
                              />
                            </Pressable>
                          </View>
                        </ParchmentCard>
                      </Pressable>
                    );
                  })}
                  {/* Postals liked */}
                  {likedPostals.map((postal) => {
                    return (
                      <Pressable
                        key={`postal-${postal.id}`}
                        style={{ marginBottom: 10 }}
                      >
                        <ParchmentCard>
                          <View style={{ flexDirection: 'row', gap: 12 }}>
                            {postal.image ? (
                              <Image
                                source={postal.image}
                                style={{ width: 56, height: 56, borderRadius: 8 }}
                                resizeMode="cover"
                              />
                            ) : (
                              <View
                                style={{
                                  width: 56,
                                  height: 56,
                                  borderRadius: 8,
                                  backgroundColor: VINTAGE_COLORS.placeholder,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Ionicons name="mail-outline" size={28} color={VINTAGE_COLORS.placeholderText} />
                              </View>
                            )}
                            <View style={{ flex: 1, justifyContent: 'center', gap: 4 }}>
                              <Text style={{ fontSize: 14, fontWeight: '700', color: VINTAGE_COLORS.textPrimary }}>
                                {postal.name}
                              </Text>
                              <RibbonBadge label={postal.category} />
                              <Text
                                style={{ fontSize: 11, color: VINTAGE_COLORS.textDescription, lineHeight: 15 }}
                                numberOfLines={2}
                              >
                                {postal.description}
                              </Text>
                            </View>
                            <Pressable
                              style={{ alignSelf: 'center', padding: 12 }}
                              onPress={() => void toggleLikePostal(postal.id)}
                              hitSlop={4}
                              accessibilityRole="button"
                              accessibilityLabel={`Quitar ${postal.name} de guardados`}
                            >
                              <Ionicons
                                name="heart"
                                size={20}
                                color={VINTAGE_COLORS.accent}
                              />
                            </Pressable>
                          </View>
                        </ParchmentCard>
                      </Pressable>
                    );
                  })}
                </>
              )}
            </View>

            {/* Cartagena en Recuerdos */}
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: VINTAGE_COLORS.textPrimary,
                  marginBottom: 12,
                  fontFamily: VINTAGE_FONTS.serif,
                }}
              >
                Cartagena en Recuerdos
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {memories.map((mem) => (
                  <ParchmentCard key={mem.id} style={{ width: '47%' }}>
                    <View style={{ padding: 0 }}>
                      <View
                        style={{
                          height: 100,
                          backgroundColor: VINTAGE_COLORS.placeholder,
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
                          <Ionicons name="image-outline" size={32} color={VINTAGE_COLORS.placeholderText} />
                        )}
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: VINTAGE_COLORS.textPrimary,
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
                backgroundColor: VINTAGE_COLORS.teal,
                borderRadius: 12,
                padding: 20,
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Ionicons name="send" size={28} color={VINTAGE_COLORS.white} />
              <Text style={{ fontSize: 16, fontWeight: '700', color: VINTAGE_COLORS.white, textAlign: 'center' }}>
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
                color={VINTAGE_COLORS.white}
                style={{
                  marginTop: 4,
                  paddingHorizontal: 24,
                  paddingVertical: 10,
                  minHeight: 44,
                  justifyContent: 'center',
                  backgroundColor: VINTAGE_COLORS.white,
                  borderColor: VINTAGE_COLORS.white,
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '800', color: VINTAGE_COLORS.teal }}>
                  Tienda de Esquelas
                </Text>
              </VintageButton>
            </View>
          </>
        )}

        {activeTab !== 'Favoritos' && (
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 60, gap: 12 }}>
            <Ionicons name="time-outline" size={48} color={VINTAGE_COLORS.cardBorder} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: VINTAGE_COLORS.textMuted }}>
              Próximamente
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}