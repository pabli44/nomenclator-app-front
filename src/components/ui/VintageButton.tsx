import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_RADIUS, VINTAGE_SHADOW } from '@/src/constants/vintage';

type VintageButtonProps = {
  children: ReactNode;
  onPress: () => void;
  color?: string;
  variant?: 'solid' | 'outline';
  style?: ViewStyle;
};

/**
 * An engraved/embossed vintage-style button.
 * Solid variant: filled with an engraved border effect.
 * Outline variant: border-only with transparent interior.
 */
export function VintageButton({
  children,
  onPress,
  color = VINTAGE_COLORS.brown,
  variant = 'solid',
  style,
}: VintageButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'solid' ? styles.solid : styles.outline,
        {
          backgroundColor: variant === 'solid' ? color : 'transparent',
          borderColor: variant === 'solid' ? color : color,
          opacity: pressed ? 0.85 : 1,
        },
        variant === 'solid' ? VINTAGE_SHADOW.card : undefined,
        style,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.text,
            { color: variant === 'solid' ? VINTAGE_COLORS.white : color },
            pressed && variant === 'solid' && styles.textPressed,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: VINTAGE_RADIUS.button,
  },
  solid: {
    borderWidth: 2,
  },
  outline: {
    borderWidth: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  textPressed: {
    opacity: 0.8,
  },
});
