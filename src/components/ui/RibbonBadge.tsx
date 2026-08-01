import { StyleSheet, Text, View } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_RADIUS } from '@/src/constants/vintage';

type RibbonBadgeProps = {
  label: string;
  color?: string;
};

/**
 * A vintage ribbon-style badge, like the period badges in the designs.
 * Simulates a folded ribbon/cinta with a folded-end effect on the right side.
 */
export function RibbonBadge({ label, color = VINTAGE_COLORS.accent }: RibbonBadgeProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.ribbon, { backgroundColor: color }]}>
        <Text style={styles.label}>{label}</Text>
      </View>
      {/* Folded tail effect */}
      <View
        style={[
          styles.tail,
          {
            borderLeftColor: color,
          },
        ]}
      />
      <View style={[styles.tailEnd, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ribbon: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderTopLeftRadius: VINTAGE_RADIUS.badge,
    borderBottomLeftRadius: VINTAGE_RADIUS.badge,
  },
  label: {
    color: VINTAGE_COLORS.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  tail: {
    width: 0,
    height: 0,
    borderTopWidth: 13,
    borderBottomWidth: 13,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  tailEnd: {
    width: 4,
    height: 26,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    opacity: 0.7,
  },
});
