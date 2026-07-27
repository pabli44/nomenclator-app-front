import { SafeAreaView } from 'react-native-safe-area-context';

import { Mapa } from '@/src/components/features/mapa';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8DFD5' }} edges={['top', 'left', 'right']}>
      <Mapa />
    </SafeAreaView>
  );
}
