import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const StreetView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Calle La Media Luna</Text>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Text style={styles.bookmarkText}>🔖</Text>
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        <TouchableOpacity style={styles.periodButton}><Text>Todos</Text></TouchableOpacity>
        <TouchableOpacity style={styles.periodButton}><Text>Colonia</Text></TouchableOpacity>
        <TouchableOpacity style={styles.periodButton}><Text>Siglo XIX</Text></TouchableOpacity>
        <TouchableOpacity style={styles.periodButton}><Text>Siglo XX</Text></TouchableOpacity>
      </View>

      {/* Images */}
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Text style={styles.imageLabel}>ANTES</Text>
          <Image source={require('../assets/images/old-street.jpg')} style={styles.image} />
          <Text style={styles.imagePeriod}>Siglo XIX</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Text style={styles.imageLabel}>AHORA</Text>
          <Image source={require('../assets/images/current-street.jpg')} style={styles.image} />
          <Text style={styles.imagePeriod}>2024</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        La transformación de esta calle a lo largo del tiempo.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton}><Text>Comprar imagen</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}><Text>Guardar</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a4638',
  },
  bookmarkButton: {
    padding: 8,
  },
  bookmarkText: {
    fontSize: 24,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  periodButton: {
    padding: 8,
    backgroundColor: '#e0c097',
    borderRadius: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  imagePeriod: {
    marginTop: 8,
    fontSize: 14,
    color: '#5a4638',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#5a4638',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    padding: 12,
    backgroundColor: '#e0c097',
    borderRadius: 8,
  },
});

export default StreetView;