import { useLocalSearchParams } from 'expo-router';
import { StreetView } from '@/src/components/features/mapa/StreetView';
import { streets } from '@/src/data/streets';

export default function StreetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const street = streets.find((s) => s.id === id);

  if (!street) return null;

  return <StreetView street={street} />;
}
