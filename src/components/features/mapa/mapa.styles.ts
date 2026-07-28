import { StyleSheet } from 'react-native';

export const mapaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DFD5',
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
    color: '#5D4B38',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#7D6B56',
    fontWeight: '600',
    lineHeight: 12,
    position: 'absolute',
    bottom: 4,
    right: 16,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 4,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#F5F0EA',
    borderWidth: 1,
    borderColor: '#D9CCC0',
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#5D4B38',
  },

  searchResultsContainer: {
    position: 'absolute',
    top: 170,
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: '#F5F0EA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9CCC0',
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  searchResultsList: {
    borderRadius: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
  },
  searchResultText: {
    marginLeft: 10,
    flex: 1,
  },
  searchResultName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D2817',
  },
  searchResultPeriod: {
    fontSize: 11,
    color: '#C85A54',
    fontWeight: '600',
    marginTop: 1,
  },

  mapView: {
    flex: 1,
    marginHorizontal: 0,
  },

  calloutContainer: {
    padding: 6,
    minWidth: 120,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D2817',
  },
  calloutPeriod: {
    fontSize: 11,
    color: '#C85A54',
    fontWeight: '600',
    marginTop: 2,
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#E8DFD5',
    gap: 12,
  },
  quickActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 3,
    flex: 1,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
});
