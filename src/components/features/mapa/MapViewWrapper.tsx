import React from 'react';
import { Platform, View, Text, type ViewStyle } from 'react-native';

let NativeMapView: React.ComponentType<any> | null = null;
let NativeMarker: React.ComponentType<any> | null = null;
let NativeCallout: React.ComponentType<any> | null = null;

if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    NativeMapView = Maps.default;
    NativeMarker = Maps.Marker;
    NativeCallout = Maps.Callout;
  } catch {}
}

interface MapViewProps {
  style?: ViewStyle;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  showsUserLocation?: boolean;
  showsCompass?: boolean;
  children?: React.ReactNode;
}

interface MarkerProps {
  coordinate: { latitude: number; longitude: number };
  title?: string;
  description?: string;
  pinColor?: string;
  onCalloutPress?: () => void;
  children?: React.ReactNode;
}

interface CalloutProps {
  children?: React.ReactNode;
}

const FallbackMapView = ({ style, children }: MapViewProps) => (
  <View
    style={[
      {
        flex: 1,
        backgroundColor: '#8BA89B',
        justifyContent: 'center',
        alignItems: 'center',
      },
      style,
    ]}
  >
    {children || (
      <Text style={{ fontSize: 14, color: '#5D4B38', fontWeight: '600' }}>
        Mapa no disponible en web
      </Text>
    )}
  </View>
);

const FallbackMarker = (_props: MarkerProps) => null;
const FallbackCallout = ({ children }: CalloutProps) => <>{children}</>;

const MapView = NativeMapView || FallbackMapView;
const Marker = NativeMarker || FallbackMarker;
const Callout = NativeCallout || FallbackCallout;

export { MapView, Marker, Callout };
