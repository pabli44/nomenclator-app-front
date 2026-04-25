import { StyleSheet } from 'react-native';

export const mapaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DFD5',
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingTop: 16,
    paddingBottom: 24,
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  castleImage: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerText: {
    alignItems: 'center',
    display: 'none',
  },
  mainTitle: {
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#5D4B38',
    lineHeight: 46,
  },
  subtitle: {
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 2,
    color: '#7D6B56',
    fontWeight: '600',
  },

  // Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F5F0EA',
    borderWidth: 1,
    borderColor: '#D9CCC0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#5D4B38',
  },

  // Map Styles
  mapContainer: {
    marginBottom: 16,
    borderRadius: 0,
    overflow: 'visible',
  },
  mapImage: {
    height: 280,
    backgroundColor: '#8BA89B',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pin: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E74C3C',
    borderWidth: 3,
    borderColor: '#F5F0EA',
    elevation: 4,
  },
  locationBadge: {
    position: 'absolute',
    backgroundColor: '#354D63',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  locationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },

  // Info Card Styles
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F4E8D8',
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#DFD4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTextContent: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  cardStreet: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D2817',
    marginBottom: 3,
  },
  cardPeriod: {
    fontSize: 12,
    color: '#C85A54',
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 11,
    color: '#6B5D4F',
    fontWeight: '500',
  },

  // Carousel Indicators
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#C9B89F',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#8B7355',
  },

  // Navigation Buttons
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  navButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  navIconButton: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 8,
  },
  navButtonLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3D2817',
    textAlign: 'center',
  },
});
