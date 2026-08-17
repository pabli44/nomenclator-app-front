import { StyleSheet } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_FONTS, VINTAGE_RADIUS } from '@/src/constants/vintage';

export const streetViewStyles = StyleSheet.create({
  scrollContent: { paddingBottom: 32 },

  imageContainer: {
    height: 280,
    backgroundColor: VINTAGE_COLORS.placeholder,
    position: 'relative',
  },
  streetImage: {
    width: '100%',
    height: '100%',
  },

  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  streetName: {
    fontSize: 24,
    fontWeight: '800',
    color: VINTAGE_COLORS.textPrimary,
    flex: 1,
    marginRight: 12,
    lineHeight: 30,
    fontFamily: VINTAGE_FONTS.serif,
  },

  descriptionCard: {
    marginHorizontal: 20,
    backgroundColor: VINTAGE_COLORS.card,
    borderRadius: VINTAGE_RADIUS.card,
    padding: 16,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: VINTAGE_COLORS.textSecondary,
    lineHeight: 22,
  },

  monumentsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: VINTAGE_COLORS.textPrimary,
    marginBottom: 12,
    fontFamily: VINTAGE_FONTS.serif,
  },
  monumentRow: {
    flexDirection: 'row',
  },
  monumentImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },
  monumentImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: VINTAGE_COLORS.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  monumentInfo: { flex: 1, justifyContent: 'center', gap: 4 },
  monumentName: {
    fontSize: 14,
    fontWeight: '700',
    color: VINTAGE_COLORS.textPrimary,
    marginBottom: 2,
  },
  monumentDescription: {
    fontSize: 12,
    color: VINTAGE_COLORS.textDescription,
    lineHeight: 16,
  },

  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionBtnFlex: {
    flex: 1,
    minHeight: 44,
  },
});