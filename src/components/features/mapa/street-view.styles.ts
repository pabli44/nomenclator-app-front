import { StyleSheet } from 'react-native';

export const streetViewStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8DFD5' },
  scrollContent: { paddingBottom: 32 },

  imageContainer: {
    height: 280,
    backgroundColor: '#DFD4C4',
    position: 'relative',
  },
  streetImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#9A8D7E',
    fontWeight: '600',
  },
  imageOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  imageLabel: {
    color: 'white',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  toggleBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toggleBtnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
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
    color: '#3D2817',
    flex: 1,
    marginRight: 12,
  },
  periodBadge: {
    backgroundColor: '#C85A54',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },

  descriptionCard: {
    marginHorizontal: 20,
    backgroundColor: '#F4E8D8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#5D4B38',
    lineHeight: 22,
  },

  monumentsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3D2817',
    marginBottom: 12,
  },
  monumentCard: {
    flexDirection: 'row',
    backgroundColor: '#F4E8D8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
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
    backgroundColor: '#DFD4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  monumentInfo: { flex: 1, justifyContent: 'center' },
  monumentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D2817',
    marginBottom: 2,
  },
  monumentPeriod: {
    fontSize: 11,
    color: '#C85A54',
    fontWeight: '700',
    marginBottom: 4,
  },
  monumentDescription: {
    fontSize: 12,
    color: '#6B5D4F',
    lineHeight: 16,
  },

  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#8B7355',
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 2,
  },
  actionBtnSecondary: {
    backgroundColor: '#F4E8D8',
    borderWidth: 1.5,
    borderColor: '#8B7355',
  },
  actionBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
});
