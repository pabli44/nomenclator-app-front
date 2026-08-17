import { StyleSheet } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_RADIUS } from '@/src/constants/vintage';

export const streetListStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: VINTAGE_COLORS.parchment },
  listContent: { padding: 16, paddingBottom: 32 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VINTAGE_COLORS.card,
    borderRadius: VINTAGE_RADIUS.card,
    padding: 12,
    marginBottom: 10,
    shadowColor: VINTAGE_COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  cardImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginRight: 12,
  },
  cardImagePlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: VINTAGE_COLORS.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: { flex: 1, marginRight: 8 },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: VINTAGE_COLORS.textPrimary,
    marginBottom: 4,
  },
  cardPeriodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  periodBadge: {
    backgroundColor: VINTAGE_COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  periodText: {
    color: VINTAGE_COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  monumentCount: {
    fontSize: 11,
    color: VINTAGE_COLORS.textMuted,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 12,
    color: VINTAGE_COLORS.textDescription,
    lineHeight: 16,
  },
});