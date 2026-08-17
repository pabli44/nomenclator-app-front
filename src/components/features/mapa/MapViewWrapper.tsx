import React, { Children, isValidElement, useState } from 'react';
import { Pressable, View, Text, type ViewStyle } from 'react-native';

import { VINTAGE_COLORS, VINTAGE_SHADOW } from '@/src/constants/vintage';

const ABSOLUTE_FILL = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

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

/** Vintage-style grid for the walled city street layout */
const streetGrid = [
  // Horizontal streets
  { top: '18%' as any, left: '12%' as any, width: '76%' as any, height: '0.4%' as any, backgroundColor: '#C4B5A0' },
  { top: '28%' as any, left: '8%' as any, width: '84%' as any, height: '0.4%' as any, backgroundColor: '#C4B5A0' },
  { top: '38%' as any, left: '10%' as any, width: '80%' as any, height: '0.4%' as any, backgroundColor: '#C4B5A0' },
  { top: '48%' as any, left: '8%' as any, width: '84%' as any, height: '0.4%' as any, backgroundColor: '#C4B5A0' },
  { top: '58%' as any, left: '10%' as any, width: '80%' as any, height: '0.4%' as any, backgroundColor: '#C4B5A0' },
  { top: '68%' as any, left: '12%' as any, width: '76%' as any, height: '0.4%' as any, backgroundColor: '#C4B5A0' },
  { top: '78%' as any, left: '14%' as any, width: '72%' as any, height: '0.4%' as any, backgroundColor: '#C4B5A0' },
  // Vertical streets
  { top: '14%' as any, left: '20%' as any, width: '0.4%' as any, height: '72%' as any, backgroundColor: '#C4B5A0' },
  { top: '14%' as any, left: '32%' as any, width: '0.4%' as any, height: '72%' as any, backgroundColor: '#C4B5A0' },
  { top: '14%' as any, left: '44%' as any, width: '0.4%' as any, height: '72%' as any, backgroundColor: '#C4B5A0' },
  { top: '14%' as any, left: '56%' as any, width: '0.4%' as any, height: '72%' as any, backgroundColor: '#C4B5A0' },
  { top: '14%' as any, left: '68%' as any, width: '0.4%' as any, height: '72%' as any, backgroundColor: '#C4B5A0' },
  { top: '14%' as any, left: '80%' as any, width: '0.4%' as any, height: '72%' as any, backgroundColor: '#C4B5A0' },
];

/** Small plaza patches scattered through the walled city */
const plazas = [
  { top: '35%' as any, left: '35%' as any, width: '6%' as any, height: '5%' as any, borderRadius: 2, backgroundColor: 'rgba(180, 200, 150, 0.5)' },
  { top: '55%' as any, left: '55%' as any, width: '5%' as any, height: '4%' as any, borderRadius: 2, backgroundColor: 'rgba(180, 200, 150, 0.5)' },
  { top: '45%' as any, left: '25%' as any, width: '4%' as any, height: '4%' as any, borderRadius: 2, backgroundColor: 'rgba(180, 200, 150, 0.5)' },
  { top: '70%' as any, left: '40%' as any, width: '5%' as any, height: '4%' as any, borderRadius: 2, backgroundColor: 'rgba(180, 200, 150, 0.5)' },
];

/** Church/landmark icons */
const landmarks = [
  { top: '35%' as any, left: '38%' as any, icon: '✦', size: 14 },
  { top: '55%' as any, left: '58%' as any, icon: '✦', size: 12 },
  { top: '48%' as any, left: '28%' as any, icon: '✦', size: 10 },
];

// ---- Compass Rose ----
function CompassRose() {
  return (
    <View style={{ position: 'absolute', top: 12, right: 12, zIndex: 5 }}>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 2,
            borderColor: 'rgba(61, 40, 23, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(245, 240, 234, 0.8)',
          }}
        >
          <Text style={{ position: 'absolute', top: 2, fontSize: 11, fontWeight: '900', color: VINTAGE_COLORS.accent }}>
            N
          </Text>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: VINTAGE_COLORS.brown,
              transform: [{ rotate: '45deg' }],
              opacity: 0.6,
            }}
          />
        </View>
      </View>
    </View>
  );
}

// ---- Shield Marker ----
function ShieldMarker() {
  return (
    <View style={{ alignItems: 'center', transform: [{ translateX: -16 }, { translateY: -16 }] }}>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 28,
            height: 20,
            backgroundColor: VINTAGE_COLORS.accent,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            borderWidth: 2,
            borderColor: '#A0403A',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 12, color: 'white', fontWeight: '900' }}>⚔</Text>
        </View>
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 14,
            borderRightWidth: 14,
            borderTopWidth: 8,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: VINTAGE_COLORS.accent,
          }}
        />
      </View>
      <View
        style={{
          width: 20,
          height: 4,
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,0.15)',
          marginTop: 2,
        }}
      />
    </View>
  );
}

// ---- Monument Marker (Golden dome) ----
function MonumentMarker() {
  return (
    <View style={{ alignItems: 'center', transform: [{ translateX: -14 }, { translateY: -14 }] }}>
      <View
        style={{
          width: 24,
          height: 18,
          borderRadius: 12,
          backgroundColor: '#C4A35A',
          borderWidth: 2,
          borderColor: '#A08030',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 10 }}>☦</Text>
      </View>
      <View
        style={{
          width: 10,
          height: 4,
          backgroundColor: '#A08030',
          borderRadius: 1,
        }}
      />
    </View>
  );
}

// ---- User Location Pin ----
function UserPin() {
  return (
    <View style={{ alignItems: 'center', transform: [{ translateX: -12 }, { translateY: -24 }] }}>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: VINTAGE_COLORS.teal,
            borderWidth: 3,
            borderColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            ...VINTAGE_SHADOW.elevated,
          }}
        />
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 8,
            borderRightWidth: 8,
            borderTopWidth: 10,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: VINTAGE_COLORS.teal,
            marginTop: -2,
          }}
        />
      </View>
      <Text
        style={{
          marginTop: 2,
          fontSize: 9,
          fontWeight: '700',
          color: VINTAGE_COLORS.teal,
          backgroundColor: 'rgba(255,255,255,0.85)',
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        Usted está aquí
      </Text>
    </View>
  );
}

// ---- Main MapView ----
interface MapViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  onMarkerSelect?: (streetId: string) => void;
}

const MapView = ({ style, children, onMarkerSelect }: MapViewProps) => {
  const markers = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Marker,
  );

  // Index of each marker among the street markers only (user pin excluded),
  // so `onMarkerSelect` receives the correct street index even when the
  // user pin is present in the markers array.
  let streetCounter = 0;
  const streetIndexes = markers.map((m: any) => {
    if (m.props.isUserLocation) return -1;
    const idx = streetCounter;
    streetCounter += 1;
    return idx;
  });

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: VINTAGE_COLORS.mapSea,
          position: 'relative',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Sea/water border */}
      <View style={[ABSOLUTE_FILL, { backgroundColor: VINTAGE_COLORS.mapSea }]} />

      {/* Land mass */}
      <View
        style={{
          position: 'absolute',
          top: '6%',
          left: '6%',
          right: '6%',
          bottom: '8%',
          backgroundColor: '#EADDCE',
          borderWidth: 2,
          borderColor: '#D4C9B8',
          borderRadius: 4,
        }}
      >
        {/* Grain overlay */}
        <View
          style={{
            ...ABSOLUTE_FILL,
            backgroundColor: 'rgba(139, 115, 85, 0.03)',
            borderRadius: 4,
          }}
        />

        {/* City wall outline */}
        <View
          style={{
            position: 'absolute',
            top: '6%',
            left: '6%',
            right: '6%',
            bottom: '6%',
            borderWidth: 1.5,
            borderColor: 'rgba(61, 40, 23, 0.2)',
            borderRadius: 2,
          }}
        />

        {/* Plazas */}
        {plazas.map((p, i) => (
          <View key={`plaza-${i}`} style={[p, { position: 'absolute' }]} />
        ))}

        {/* Landmarks */}
        {landmarks.map((l, i) => (
          <Text
            key={`landmark-${i}`}
            style={{
              position: 'absolute',
              top: l.top,
              left: l.left,
              fontSize: l.size,
              color: 'rgba(196, 163, 90, 0.6)',
              zIndex: 2,
            }}
          >
            {l.icon}
          </Text>
        ))}

        {/* Street grid */}
        {streetGrid.map((line, i) => (
          <View key={`street-${i}`} style={[line, { position: 'absolute' }]} />
        ))}

        {/* Compass rose */}
        <CompassRose />

        {/* Markers */}
        {markers.map((marker: any, index) => {
          const { coordinate, isUserLocation } = marker.props;
          const pos = coordToPercent(coordinate.latitude, coordinate.longitude, !!isUserLocation);

          const handlePress = () => {
            if (isUserLocation) return;
            // Map the marker position to its index among street markers only
            // (the user pin is also part of `markers`, so an absolute index would be off by one).
            const streetIndex = streetIndexes[index];
            if (streetIndex >= 0) {
              onMarkerSelect?.(`marker-${streetIndex}`);
            }
          };

          return (
            <MarkerContent
              key={`${coordinate.latitude}-${coordinate.longitude}`}
              pos={pos}
              title={marker.props.title}
              onPress={handlePress}
              isUserLocation={isUserLocation}
            >
              {marker.props.children}
            </MarkerContent>
          );
        })}
      </View>
    </View>
  );
};

// ---- Marker Content ----
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
    onPress?.();
    setShowCallout(!showCallout);
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: pos.left as any,
        top: pos.top as any,
        zIndex: isUserLocation ? 20 : 10,
      }}
    >
      {isUserLocation ? (
        <UserPin />
      ) : (
        <>
          <Pressable onPress={handlePress} hitSlop={10}>
            <ShieldMarker />
          </Pressable>
          {showCallout && title && (
            <View
              style={{
                position: 'absolute',
                bottom: 48,
                left: -50,
                minWidth: 130,
                backgroundColor: '#F4E8D8',
                borderRadius: 8,
                padding: 10,
                borderWidth: 1,
                borderColor: '#D9CCC0',
                ...VINTAGE_SHADOW.card,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#3D2817',
                  textAlign: 'center',
                }}
              >
                {title}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

// ---- Marker & Callout (marker components) ----
interface MarkerProps {
  coordinate: { latitude: number; longitude: number };
  title?: string;
  description?: string;
  onCalloutPress?: () => void;
  children?: React.ReactNode;
  isUserLocation?: boolean;
}

const Marker = (_props: MarkerProps) => null;

const Callout = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export { MapView, Marker, Callout };
