import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_FONTS } from '@/src/constants/vintage';

interface VintageBackHeaderProps {
  title?: string;
  onPress?: () => void;
  trailing?: ReactNode;
  style?: ViewStyle;
}

/**
 * Vintage back header for stacked screens (street detail, streets list, cart
 * modal). Transparent background so the surrounding ParchmentView shows
 * through. Backs out via router.back() unless an explicit onPress is given.
 */
export function VintageBackHeader({ title, onPress, trailing, style }: VintageBackHeaderProps) {
  const router = useRouter();

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.row, style]}>
      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
        onPress={handlePress}
        hitSlop={4}
        accessibilityRole="button"
        accessibilityLabel="Volver"
      >
        <Ionicons name="chevron-back" size={22} color={VINTAGE_COLORS.brown} />
        <Text style={styles.backText}>Volver</Text>
      </Pressable>
      {title ? <Text style={styles.title} numberOfLines={1}>{title}</Text> : null}
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 44,
    backgroundColor: 'transparent',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingRight: 10,
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  backText: {
    fontSize: 14,
    fontWeight: '800',
    color: VINTAGE_COLORS.brown,
    marginLeft: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: VINTAGE_COLORS.textPrimary,
    fontFamily: VINTAGE_FONTS.serif,
    flexShrink: 1,
  },
  trailing: {
    marginLeft: 'auto',
  },
});