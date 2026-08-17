import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { VINTAGE_COLORS, VINTAGE_FONTS } from '@/src/constants/vintage';

const MENU_ITEMS = [
  { icon: 'heart-outline' as const, label: 'Mis favoritos', color: VINTAGE_COLORS.accent },
  { icon: 'cart-outline' as const, label: 'Mis compras', color: VINTAGE_COLORS.brown },
  { icon: 'map-outline' as const, label: 'Lugares visitados', color: VINTAGE_COLORS.teal },
  { icon: 'settings-outline' as const, label: 'Ajustes', color: VINTAGE_COLORS.blue },
  { icon: 'information-circle-outline' as const, label: 'Acerca de', color: VINTAGE_COLORS.textMuted },
];

export default function PerfilScreen() {
  const router = useRouter();

  const handlePress = (label: string) => {
    if (label === 'Mis favoritos') {
      router.push('/(tabs)/coleccion' as any);
      return;
    }
    if (label === 'Mis compras') {
      router.push('/(tabs)/tienda' as any);
      return;
    }
    Alert.alert('Próximamente', `La sección "${label}" estará disponible pronto.`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={72} color={VINTAGE_COLORS.blue} />
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.subtitle}>Tu rincón en Cartagena</Text>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            onPress={() => handlePress(item.label)}
            style={({ pressed }) => [
              styles.menuItem,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Ionicons name={item.icon} size={22} color={item.color} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={VINTAGE_COLORS.cardBorder} />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VINTAGE_COLORS.parchment,
  },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: VINTAGE_COLORS.textPrimary,
    letterSpacing: 2,
    fontFamily: VINTAGE_FONTS.serif,
  },
  subtitle: {
    fontSize: 14,
    color: VINTAGE_COLORS.textMuted,
    fontWeight: '600',
  },
  menu: {
    paddingHorizontal: 20,
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VINTAGE_COLORS.card,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 56,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: VINTAGE_COLORS.parchment,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: VINTAGE_COLORS.textSecondary,
  },
});