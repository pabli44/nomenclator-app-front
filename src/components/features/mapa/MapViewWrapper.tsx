import React, { Children, isValidElement, useState } from 'react';
import { Pressable, View, Text, type ViewStyle } from 'react-native';

const BOUNDS = {
  minLat: 10.4209,
  maxLat: 10.4251,
  minLng: -75.5545,
  maxLng: -75.5475,
};

function coordToPercent(lat: number, lng: number, clamp = false) {
  let x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  let y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  if (clamp) {
    x = Math.max(2, Math.min(98, x));
    y = Math.max(4, Math.min(92, y));
  }
  return { left: `${x}%`, top: `${y}%` };
}

const streetPattern = [
  { top: '15%' as any, left: '10%' as any, width: '80%' as any, height: '0.3%' as any, backgroundColor: '#D4C9B8' },
  { top: '30%' as any, left: '5%' as any, width: '90%' as any, height: '0.3%' as any, backgroundColor: '#D4C9B8' },
  { top: '45%' as any, left: '10%' as any, width: '80%' as any, height: '0.3%' as any, backgroundColor: '#D4C9B8' },
  { top: '60%' as any, left: '5%' as any, width: '90%' as any, height: '0.3%' as any, backgroundColor: '#D4C9B8' },
  { top: '75%' as any, left: '10%' as any, width: '80%' as any, height: '0.3%' as any, backgroundColor: '#D4C9B8' },
  { top: '5%' as any, left: '20%' as any, width: '0.3%' as any, height: '90%' as any, backgroundColor: '#D4C9B8' },
  { top: '5%' as any, left: '40%' as any, width: '0.3%' as any, height: '90%' as any, backgroundColor: '#D4C9B8' },
  { top: '5%' as any, left: '60%' as any, width: '0.3%' as any, height: '90%' as any, backgroundColor: '#D4C9B8' },
  { top: '5%' as any, left: '80%' as any, width: '0.3%' as any, height: '90%' as any, backgroundColor: '#D4C9B8' },
];

interface MapViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const MapView = ({ style, children }: MapViewProps) => {
  const markers = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Marker,
  );

  return (
    <View style={[{ flex: 1, backgroundColor: '#B5CDA3', position: 'relative', overflow: 'hidden' }, style]}>
      {streetPattern.map((line, i) => (
        <View key={i} style={[line, { position: 'absolute' }]} />
      ))}
      {markers.map((marker: any) => {
        const { coordinate, title, onCalloutPress, isUserLocation, children: markerChildren } = marker.props;
        const pos = coordToPercent(coordinate.latitude, coordinate.longitude, !!isUserLocation);
        return (
          <MarkerContent
            key={`${coordinate.latitude}-${coordinate.longitude}`}
            pos={pos}
            title={title}
            onPress={onCalloutPress}
            isUserLocation={isUserLocation}
          >
            {markerChildren}
          </MarkerContent>
        );
      })}
    </View>
  );
};

interface MarkerContentProps {
  pos: { left: string; top: string };
  title?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  isUserLocation?: boolean;
}

function MarkerContent({ pos, title, onPress, children, isUserLocation }: MarkerContentProps) {
  const [showCallout, setShowCallout] = useState(false);

  const handlePress = () => {
    if (isUserLocation) return;
    if (onPress) {
      onPress();
    } else {
      setShowCallout(!showCallout);
    }
  };

  return (
    <View style={{ position: 'absolute', left: pos.left as any, top: pos.top as any, zIndex: isUserLocation ? 20 : 10 }}>
      {isUserLocation ? (
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#3B82F6',
              borderWidth: 3,
              borderColor: 'white',
              elevation: 6,
            }}
          />
          <View
            style={{
              marginTop: 4,
              backgroundColor: 'rgba(59,130,246,0.9)',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}>
              Usted está aquí
            </Text>
          </View>
        </View>
      ) : (
        <>
          <Pressable onPress={handlePress}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: '#C85A54',
                borderWidth: 3,
                borderColor: '#F5F0EA',
                elevation: 4,
                transform: [{ translateX: -14 }, { translateY: -14 }],
              }}
            />
          </Pressable>
          {showCallout && title && (
            <View
              style={{
                position: 'absolute',
                bottom: 36,
                left: -60,
                minWidth: 140,
                backgroundColor: '#F4E8D8',
                borderRadius: 8,
                padding: 10,
                elevation: 6,
                borderWidth: 1,
                borderColor: '#D9CCC0',
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#3D2817', textAlign: 'center' }}>
                {title}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

interface MarkerProps {
  coordinate: { latitude: number; longitude: number };
  title?: string;
  description?: string;
  pinColor?: string;
  onCalloutPress?: () => void;
  children?: React.ReactNode;
  isUserLocation?: boolean;
}

const Marker = (_props: MarkerProps) => null;

const Callout = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export { MapView, Marker, Callout };
