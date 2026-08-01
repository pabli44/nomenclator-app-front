import { Tabs } from 'expo-router';
import React from 'react';

import { VintageTabBar } from '@/src/components/ui/VintageTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <VintageTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="coleccion" />
      <Tabs.Screen name="tienda" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}
