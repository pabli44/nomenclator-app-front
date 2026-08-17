import { View, type ViewProps } from 'react-native';

import { VINTAGE_COLORS } from '@/src/constants/vintage';

export function ThemedView({ style, ...otherProps }: ViewProps) {
  return <View style={[{ backgroundColor: VINTAGE_COLORS.parchment }, style]} {...otherProps} />;
}