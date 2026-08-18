import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { VINTAGE_COLORS } from '@/src/constants/vintage';
import { CartProvider } from '@/src/state/cart-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: VINTAGE_COLORS.brown,
    background: VINTAGE_COLORS.parchment,
    card: VINTAGE_COLORS.parchment,
    text: VINTAGE_COLORS.textPrimary,
    border: VINTAGE_COLORS.cardBorder,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={NavTheme}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="street/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="calles" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
        <StatusBar style="dark" />
      </CartProvider>
    </ThemeProvider>
  );
}