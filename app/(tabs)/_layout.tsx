import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/src/components/shared';
import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons size={26} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tienda"
        options={{
          title: 'Tienda',
          tabBarIcon: ({ color }) => <Ionicons size={26} name="pricetag" color={color} />,
        }}
      />
    </Tabs>
  );
}
