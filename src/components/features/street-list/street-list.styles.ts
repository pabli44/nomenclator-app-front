import { StyleSheet } from 'react-native';

export const streetListStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8DFD5' },
  listContent: { padding: 16, paddingBottom: 32 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4E8D8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardImagePlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#DFD4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: { flex: 1, marginRight: 8 },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D2817',
    marginBottom: 4,
  },
  cardPeriodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  periodBadge: {
    backgroundColor: '#C85A54',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  periodText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  monumentCount: {
    fontSize: 11,
    color: '#7D6B56',
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 12,
    color: '#6B5D4F',
    lineHeight: 16,
  },
});
