import { SafeAreaView } from 'react-native-safe-area-context';

import { StoreScreen } from '@/src/components/features/store';

export default function TiendaTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8DFD5' }} edges={['top', 'left', 'right']}>
      <StoreScreen />
    </SafeAreaView>
  );
}
