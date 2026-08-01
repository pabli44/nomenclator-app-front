import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={72} color="#4A7B9D" />
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.subtitle}>Tu rincón en Cartagena</Text>
      </View>

      <View style={styles.menu}>
        {[
          { icon: 'heart-outline' as const, label: 'Mis favoritos', color: '#C85A54' },
          { icon: 'cart-outline' as const, label: 'Mis compras', color: '#8B7355' },
          { icon: 'map-outline' as const, label: 'Lugares visitados', color: '#5A7A72' },
          { icon: 'settings-outline' as const, label: 'Ajustes', color: '#4A7B9D' },
          { icon: 'information-circle-outline' as const, label: 'Acerca de', color: '#7D6B56' },
        ].map((item) => (
          <View key={item.label} style={styles.menuItem}>
            <Ionicons name={item.icon} size={22} color={item.color} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#D9CCC0" />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DFD5',
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
    color: '#3D2817',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#7D6B56',
    fontWeight: '600',
  },
  menu: {
    paddingHorizontal: 20,
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4E8D8',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#5D4B38',
  },
});
