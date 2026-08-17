import { StyleSheet } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_FONTS, VINTAGE_RADIUS } from '@/src/constants/vintage';

export const mapaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VINTAGE_COLORS.parchment,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
    gap: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 4,
    color: VINTAGE_COLORS.textSecondary,
    lineHeight: 36,
    fontFamily: VINTAGE_FONTS.serif,
  },
  subtitle: {
    fontSize: 10,
    letterSpacing: 3,
    color: VINTAGE_COLORS.textMuted,
    fontWeight: '600',
    lineHeight: 12,
    position: 'absolute',
    bottom: 4,
    right: 16,
    fontFamily: VINTAGE_FONTS.serif,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 4,
    marginHorizontal: 16,
    marginBottom: 10,
    minHeight: 44,
    borderRadius: VINTAGE_RADIUS.card,
    backgroundColor: VINTAGE_COLORS.parchmentLight,
    borderWidth: 1,
    borderColor: VINTAGE_COLORS.cardBorder,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: VINTAGE_COLORS.textSecondary,
  },

  searchResultsContainer: {
    position: 'absolute',
    top: 170,
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: VINTAGE_COLORS.parchmentLight,
    borderRadius: VINTAGE_RADIUS.card,
    borderWidth: 1,
    borderColor: VINTAGE_COLORS.cardBorder,
    maxHeight: 200,
    shadowColor: VINTAGE_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  searchResultsList: {
    borderRadius: VINTAGE_RADIUS.card,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: VINTAGE_COLORS.parchment,
  },
  searchResultText: {
    marginLeft: 10,
    flex: 1,
  },
  searchResultName: {
    fontSize: 14,
    fontWeight: '700',
    color: VINTAGE_COLORS.textPrimary,
  },
  searchResultPeriod: {
    fontSize: 11,
    color: VINTAGE_COLORS.accent,
    fontWeight: '600',
    marginTop: 1,
  },

  mapWrapper: {
    flex: 1,
    position: 'relative',
  },
  mapView: {
    flex: 1,
    marginHorizontal: 0,
  },

  locationNotice: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: VINTAGE_COLORS.card,
    borderWidth: 1,
    borderColor: VINTAGE_COLORS.cardBorder,
    borderRadius: VINTAGE_RADIUS.badge,
    paddingHorizontal: 12,
    paddingVertical: 8,
    zIndex: 40,
  },
  locationNoticeText: {
    fontSize: 12,
    fontWeight: '600',
    color: VINTAGE_COLORS.textMuted,
  },

  /** Floating street detail card */
  floatingCard: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    zIndex: 30,
  },
  floatingCardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  floatingCardImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  floatingCardImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: VINTAGE_COLORS.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingCardInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  floatingCardName: {
    fontSize: 14,
    fontWeight: '700',
    color: VINTAGE_COLORS.textPrimary,
  },
  floatingCardDesc: {
    fontSize: 11,
    color: VINTAGE_COLORS.textDescription,
    lineHeight: 15,
  },
  floatingCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  floatingCardBtn: {
    flex: 1,
    paddingVertical: 10,
    minHeight: 44,
  },
  floatingCardClose: {
    padding: 4,
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: VINTAGE_COLORS.parchment,
    gap: 12,
  },
  quickActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: VINTAGE_RADIUS.card,
    shadowColor: VINTAGE_COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 3,
    flex: 1,
    minHeight: 44,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
});