import { SafeAreaView } from 'react-native-safe-area-context';

import { StoreScreen } from '@/src/components/features/store';
import { VINTAGE_COLORS } from '@/src/constants/vintage';

export default function TiendaTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: VINTAGE_COLORS.parchment }} edges={['top', 'left', 'right']}>
      <StoreScreen />
    </SafeAreaView>
  );
}
