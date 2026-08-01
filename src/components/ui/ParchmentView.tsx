import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { VINTAGE_COLORS } from '@/src/constants/vintage';

type ParchmentViewProps = {
  children: ReactNode;
  style?: ViewStyle;
};

/**
 * A parchment-textured background wrapper.
 * Simulates aged paper with a subtle edge vignette effect
 * using nested semi-transparent borders.
 *
 * Drop-in replacement for View when you want the vintage parchment look.
 */
export function ParchmentView({ children, style }: ParchmentViewProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Edge darkening for aged-paper feel */}
      <View style={styles.edgeTop} pointerEvents="none" />
      <View style={styles.edgeBottom} pointerEvents="none" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VINTAGE_COLORS.parchment,
  },
  edgeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(139, 115, 85, 0.04)',
  },
  edgeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(139, 115, 85, 0.06)',
  },
});
