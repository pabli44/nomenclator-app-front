import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 12;
const H_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - CARD_GAP) / 2;

export const storeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8DFD5' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#3D2817', lineHeight: 34 },
  headerSubtitle: { fontSize: 12, color: '#7D6B56', fontWeight: '600', marginTop: 2 },

  categoriesScroll: {
    maxHeight: 52,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F4E8D8',
    borderWidth: 1,
    borderColor: '#D9CCC0',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#8B7355',
    borderColor: '#8B7355',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7D6B56',
  },
  categoryChipTextActive: {
    color: 'white',
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
    backgroundColor: '#F4E8D8',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
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
    backgroundColor: '#DFD4C4',
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
    color: '#C85A54',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D2817',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#5D4B38',
    marginBottom: 8,
  },
  cardButton: {
    backgroundColor: '#8B7355',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  cardButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },

  /** Floating cart bar */
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#5A7A72',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 8,
  },
  cartBarText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  cartBarButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cartBarButtonText: {
    color: 'white',
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
    color: '#7D6B56',
    fontWeight: '600',
  },
});
