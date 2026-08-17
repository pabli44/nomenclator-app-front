import { Dimensions, StyleSheet } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_FONTS, VINTAGE_RADIUS } from '@/src/constants/vintage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 12;
const H_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - CARD_GAP) / 2;

export const storeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: VINTAGE_COLORS.parchment },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: VINTAGE_COLORS.textPrimary,
    lineHeight: 34,
    fontFamily: VINTAGE_FONTS.serif,
  },
  headerSubtitle: { fontSize: 12, color: VINTAGE_COLORS.textMuted, fontWeight: '600', marginTop: 2 },
  cartButton: {
    position: 'relative',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: VINTAGE_COLORS.accent,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: { color: VINTAGE_COLORS.white, fontSize: 10, fontWeight: '800' },

  categoriesScroll: {
    maxHeight: 56,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: 'center',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: VINTAGE_RADIUS.pill,
    backgroundColor: VINTAGE_COLORS.card,
    borderWidth: 1,
    borderColor: VINTAGE_COLORS.cardBorder,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: VINTAGE_COLORS.brown,
    borderColor: VINTAGE_COLORS.brown,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: VINTAGE_COLORS.textMuted,
  },
  categoryChipTextActive: {
    color: VINTAGE_COLORS.white,
  },

  productsGrid: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 80, // space for cart bar
    flexGrow: 1,
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: CARD_GAP,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: VINTAGE_COLORS.card,
    borderRadius: VINTAGE_RADIUS.card,
    overflow: 'hidden',
    shadowColor: VINTAGE_COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    minHeight: CARD_WIDTH * 1.5,
  },
  cardImage: {
    width: '100%',
    height: CARD_WIDTH * 0.85,
  },
  cardImagePlaceholder: {
    width: '100%',
    height: CARD_WIDTH * 0.85,
    backgroundColor: VINTAGE_COLORS.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: VINTAGE_COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: VINTAGE_COLORS.textPrimary,
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: VINTAGE_COLORS.textSecondary,
    marginBottom: 8,
  },
  cardButton: {
    backgroundColor: VINTAGE_COLORS.brown,
    paddingVertical: 8,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: VINTAGE_RADIUS.button,
    alignItems: 'center',
  },
  cardButtonText: {
    color: VINTAGE_COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },

  /** Floating cart bar */
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: VINTAGE_COLORS.teal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: VINTAGE_COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 8,
  },
  cartBarText: {
    color: VINTAGE_COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  cartBarTotal: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  cartBarButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: VINTAGE_RADIUS.button,
  },
  cartBarButtonText: {
    color: VINTAGE_COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: VINTAGE_COLORS.textMuted,
    fontWeight: '600',
  },
});