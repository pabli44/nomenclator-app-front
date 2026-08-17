import { SafeAreaView } from 'react-native-safe-area-context';

import { Mapa } from '@/src/components/features/mapa';
import { VINTAGE_COLORS } from '@/src/constants/vintage';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: VINTAGE_COLORS.parchment }} edges={['top', 'left', 'right']}>
      <Mapa />
    </SafeAreaView>
  );
}
