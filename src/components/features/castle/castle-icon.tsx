import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CastleIconProps {
  size?: number;
  color?: string;
}

export function CastleIcon({ size = 60, color = '#8B7355' }: CastleIconProps) {
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'relative',
    },
    // Base/foundation
    base: {
      width: size * 0.9,
      height: size * 0.15,
      backgroundColor: color,
      position: 'absolute',
      bottom: 0,
    },
    // Left side structure
    leftWall: {
      width: size * 0.25,
      height: size * 0.45,
      backgroundColor: color,
      position: 'absolute',
      bottom: size * 0.15,
      left: size * 0.05,
    },
    // Right side structure
    rightWall: {
      width: size * 0.25,
      height: size * 0.45,
      backgroundColor: color,
      position: 'absolute',
      bottom: size * 0.15,
      right: size * 0.05,
    },
    // Center main tower
    centerTower: {
      width: size * 0.35,
      height: size * 0.55,
      backgroundColor: color,
      position: 'absolute',
      bottom: size * 0.15,
      left: '50%',
      marginLeft: -size * 0.175,
    },
    // Main roof center
    roofCenter: {
      width: 0,
      height: 0,
      borderLeftWidth: size * 0.2,
      borderRightWidth: size * 0.2,
      borderBottomWidth: size * 0.25,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      position: 'absolute',
      top: size * 0.02,
      left: '50%',
      marginLeft: -size * 0.2,
    },
    // Left roof
    roofLeft: {
      width: 0,
      height: 0,
      borderLeftWidth: size * 0.14,
      borderRightWidth: size * 0.14,
      borderBottomWidth: size * 0.18,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      position: 'absolute',
      top: size * 0.08,
      left: size * 0.12,
    },
    // Right roof
    roofRight: {
      width: 0,
      height: 0,
      borderLeftWidth: size * 0.14,
      borderRightWidth: size * 0.14,
      borderBottomWidth: size * 0.18,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      position: 'absolute',
      top: size * 0.08,
      right: size * 0.12,
    },
    // Cross vertical
    crossVertical: {
      width: size * 0.05,
      height: size * 0.15,
      backgroundColor: color,
      position: 'absolute',
      top: 0,
      left: '50%',
      marginLeft: -size * 0.025,
      borderTopLeftRadius: size * 0.025,
      borderTopRightRadius: size * 0.025,
    },
    // Cross horizontal
    crossHorizontal: {
      width: size * 0.1,
      height: size * 0.04,
      backgroundColor: color,
      position: 'absolute',
      top: size * 0.08,
      left: '50%',
      marginLeft: -size * 0.05,
      borderRadius: size * 0.02,
    },
    // Door center
    door: {
      width: size * 0.12,
      height: size * 0.2,
      backgroundColor: '#D4C4B0',
      position: 'absolute',
      bottom: size * 0.2,
      left: '50%',
      marginLeft: -size * 0.06,
      borderTopLeftRadius: size * 0.04,
      borderTopRightRadius: size * 0.04,
    },
    // Window center
    windowCenter: {
      width: size * 0.08,
      height: size * 0.08,
      backgroundColor: '#D4C4B0',
      position: 'absolute',
      top: size * 0.15,
      left: '50%',
      marginLeft: -size * 0.04,
    },
    // Left window
    windowLeft: {
      width: size * 0.06,
      height: size * 0.06,
      backgroundColor: '#D4C4B0',
      position: 'absolute',
      top: size * 0.15,
      left: size * 0.1,
    },
    // Right window
    windowRight: {
      width: size * 0.06,
      height: size * 0.06,
      backgroundColor: '#D4C4B0',
      position: 'absolute',
      top: size * 0.15,
      right: size * 0.1,
    },
  });

  return (
    <View style={styles.container}>
      {/* Base */}
      <View style={styles.base} />
      
      {/* Side structures */}
      <View style={styles.leftWall} />
      <View style={styles.rightWall} />
      
      {/* Center tower */}
      <View style={styles.centerTower}>
        <View style={styles.windowCenter} />
        <View style={styles.door} />
      </View>
      
      {/* Roofs */}
      <View style={styles.roofCenter} />
      <View style={styles.roofLeft} />
      <View style={styles.roofRight} />
      
      {/* Cross on top */}
      <View style={styles.crossVertical} />
      <View style={styles.crossHorizontal} />
      
      {/* Side windows */}
      <View style={styles.windowLeft} />
      <View style={styles.windowRight} />
    </View>
  );
}

