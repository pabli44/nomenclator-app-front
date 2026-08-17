import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ParchmentCard, ParchmentView, VintageBackHeader, VintageButton } from '@/src/components/ui';
import { streets } from '@/src/data/streets';
import { StreetView } from '@/src/components/features/mapa/StreetView';
import { VINTAGE_COLORS, VINTAGE_FONTS } from '@/src/constants/vintage';

export default function StreetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const street = streets.find((s) => s.id === id);

  if (!street) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: VINTAGE_COLORS.parchment }}
        edges={['top', 'left', 'right']}
      >
        <ParchmentView style={{ flex: 1 }}>
          <VintageBackHeader title="Calle no encontrada" />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 32,
              gap: 16,
            }}
          >
            <ParchmentCard style={{ width: '100%', alignItems: 'center', gap: 16 }}>
              <Ionicons name="map-outline" size={44} color={VINTAGE_COLORS.brown} />
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '800',
                  color: VINTAGE_COLORS.textPrimary,
                  fontFamily: VINTAGE_FONTS.serif,
                  textAlign: 'center',
                }}
              >
                Calle no encontrada
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: VINTAGE_COLORS.textSecondary,
                  textAlign: 'center',
                  lineHeight: 20,
                }}
              >
                No encontramos esta calle en nuestro catálogo del Centro Histórico.
              </Text>
              <VintageButton
                onPress={() => router.back()}
                color={VINTAGE_COLORS.brown}
                style={{ alignSelf: 'center', minWidth: 160 }}
              >
                Volver
              </VintageButton>
            </ParchmentCard>
          </View>
        </ParchmentView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: VINTAGE_COLORS.parchment }}
      edges={['top', 'left', 'right']}
    >
      <VintageBackHeader title={street.name} />
      <StreetView street={street} />
    </SafeAreaView>
  );
}