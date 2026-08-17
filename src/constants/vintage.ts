import { Platform } from 'react-native';

/**
 * Vintage/Parchment Design System Tokens
 * Inspired by the colonial-era aesthetic of Cartagena
 */

export const VINTAGE_COLORS = {
  /** Screen backgrounds */
  parchment: '#E8DFD5',
  parchmentLight: '#F5F0EA',
  /** Card/surface colors */
  card: '#F4E8D8',
  cardBorder: '#D9CCC0',
  cardBorderDark: '#B5A696',
  /** Image placeholders */
  placeholder: '#DFD4C4',
  placeholderText: '#9A8D7E',
  /** Text hierarchy */
  textPrimary: '#3D2817',
  textSecondary: '#5D4B38',
  textMuted: '#6B5A47',
  textDescription: '#6B5D4F',
  /** Tab/Accent colors */
  tabExplorar: '#5A7A72',
  tabColeccion: '#A93F39',
  tabTienda: '#7A6449',
  tabPerfil: '#4A7B9D',
  /** Illustrated map */
  mapSea: '#CBD6D3',
  /** Functional */
  accent: '#A93F39',
  brown: '#7A6449',
  teal: '#5A7A72',
  blue: '#4A7B9D',
  gold: '#C4A35A',
  white: '#FFFFFF',
  black: '#000000',
  shadow: '#000000',
} as const;

export const VINTAGE_FONTS = {
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }) as string,
  sans: Platform.select({
    ios: 'system-ui',
    android: 'normal',
    default: 'system-ui',
  }) as string,
};

export const VINTAGE_SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const VINTAGE_RADIUS = {
  card: 10,
  button: 8,
  badge: 6,
  pill: 20,
} as const;

export const VINTAGE_SHADOW = {
  card: {
    shadowColor: VINTAGE_COLORS.shadow,
    shadowOffset: { width: 0, height: 1 } as const,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  elevated: {
    shadowColor: VINTAGE_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 } as const,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
} as const;
