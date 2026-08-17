import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { VINTAGE_COLORS } from '@/src/constants/vintage';

type TabConfig = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

const TABS: TabConfig[] = [
  { key: 'index', label: 'Explorar', icon: 'compass-outline', color: VINTAGE_COLORS.teal },
  { key: 'coleccion', label: 'Colección', icon: 'bookmark-outline', color: VINTAGE_COLORS.accent },
  { key: 'tienda', label: 'Tienda', icon: 'storefront-outline', color: VINTAGE_COLORS.brown },
  { key: 'perfil', label: 'Perfil', icon: 'person-outline', color: VINTAGE_COLORS.blue },
];

export function VintageTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.inner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const tab = TABS.find((t) => t.key === route.name) ?? TABS[0];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, { merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [
                styles.tab,
                {
                  backgroundColor: isFocused ? tab.color : VINTAGE_COLORS.card,
                  borderColor: isFocused ? tab.color : VINTAGE_COLORS.cardBorder,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Ionicons
                name={isFocused ? (tab.icon.replace('-outline', '') as keyof typeof Ionicons.glyphMap) : tab.icon}
                size={22}
                color={isFocused ? VINTAGE_COLORS.white : tab.color}
              />
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? VINTAGE_COLORS.white : tab.color },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: VINTAGE_COLORS.parchment,
    borderTopWidth: 2,
    borderTopColor: VINTAGE_COLORS.cardBorder,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  inner: {
    flexDirection: 'row',
    gap: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
