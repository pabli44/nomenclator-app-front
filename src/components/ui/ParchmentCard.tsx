import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_RADIUS, VINTAGE_SHADOW } from '@/src/constants/vintage';

type ParchmentCardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

/**
 * A parchment-styled card with a vintage double-border frame.
 * Outer thin border + inner thicker frame, mimicking aged document framing.
 * Use it anywhere you'd use a card/paper element.
 */
export function ParchmentCard({ children, style }: ParchmentCardProps) {
  return (
    <View style={[styles.outerBorder, style]}>
      <View style={styles.innerFrame}>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerBorder: {
    borderRadius: VINTAGE_RADIUS.card + 3,
    borderWidth: 1,
    borderColor: VINTAGE_COLORS.cardBorderDark,
    backgroundColor: VINTAGE_COLORS.cardBorderDark,
    ...VINTAGE_SHADOW.card,
  },
  innerFrame: {
    borderRadius: VINTAGE_RADIUS.card + 1,
    borderWidth: 2,
    borderColor: VINTAGE_COLORS.cardBorder,
    backgroundColor: VINTAGE_COLORS.card,
    overflow: 'hidden',
  },
  content: {
    backgroundColor: VINTAGE_COLORS.card,
    borderRadius: VINTAGE_RADIUS.card,
    padding: 16,
  },
});
