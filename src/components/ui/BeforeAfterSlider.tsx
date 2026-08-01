import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  type ImageSourcePropType,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { VINTAGE_COLORS } from '@/src/constants/vintage';

interface BeforeAfterSliderProps {
  beforeImage: ImageSourcePropType;
  afterImage: ImageSourcePropType;
  beforeLabel?: string;
  afterLabel?: string;
  containerHeight?: number;
}

/**
 * Interactive split-view slider to compare two images (before/after).
 * Drag the golden medallion handle left/right to reveal more of either image.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'ANTES',
  afterLabel = 'AHORA',
  containerHeight = 320,
}: BeforeAfterSliderProps) {
  const screenWidth = Dimensions.get('window').width;
  const [splitPosition, setSplitPosition] = useState(screenWidth / 2);
  const splitRef = useRef(screenWidth / 2);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => true,
      onPanResponderMove: (_evt, gestureState) => {
        const newPosition = Math.max(40, Math.min(screenWidth - 40, gestureState.moveX));
        splitRef.current = newPosition;
        setSplitPosition(newPosition);
      },
      onPanResponderRelease: () => true,
    }),
  ).current;

  return (
    <View style={[styles.container, { height: containerHeight }]}>
      {/* Before image (full width) */}
      <Image source={beforeImage} style={styles.fullImage} resizeMode="cover" />

      {/* After image (clipped) */}
      <View style={[styles.afterClip, { width: splitPosition }]}>
        <Image source={afterImage} style={styles.fullImage} resizeMode="cover" />
      </View>

      {/* Divider line */}
      <View
        style={[
          styles.divider,
          { left: splitPosition - 1 },
        ]}
      />

      {/* Draggable handle (golden medallion) */}
      <View
        style={[
          styles.handleContainer,
          { left: splitPosition - 18, top: containerHeight / 2 - 18 },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handleOuter}>
          <View style={styles.handleInner}>
            <Text style={styles.handleArrows}>⟷</Text>
          </View>
        </View>
      </View>

      {/* Labels */}
      <View style={styles.labelsContainer}>
        <View style={styles.labelLeft}>
          <Text style={styles.labelText}>{beforeLabel}</Text>
        </View>
        <View style={styles.labelRight}>
          <Text style={styles.labelText}>{afterLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#DFD4C4',
  },
  fullImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  afterClip: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    overflow: 'hidden',
  },
  divider: {
    position: 'absolute',
    top: 0,
    width: 3,
    height: '100%',
    backgroundColor: VINTAGE_COLORS.gold,
    zIndex: 10,
  },
  handleContainer: {
    position: 'absolute',
    zIndex: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleOuter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: VINTAGE_COLORS.gold,
    borderWidth: 3,
    borderColor: '#F5F0EA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  handleInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D4A84A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleArrows: {
    fontSize: 14,
    color: VINTAGE_COLORS.white,
    fontWeight: '900',
  },
  labelsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 5,
  },
  labelLeft: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  labelRight: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  labelText: {
    color: VINTAGE_COLORS.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
