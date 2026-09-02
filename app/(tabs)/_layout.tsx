import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { VINTAGE_COLORS } from '@/src/constants/vintage';
import { VintageTabBar } from '@/src/components/ui/VintageTabBar';

export default function TabLayout() {
  const isWeb = Platform.OS === 'web';

  return (
    <View style={[styles.container, { backgroundColor: VINTAGE_COLORS.parchment }]}>
      <View style={styles.content}>
        <Tabs
          tabBarPosition="bottom"
          tabBar={(props) => <VintageTabBar {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarStyle: isWeb ? styles.tabBarWeb : undefined,
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="coleccion" />
          <Tabs.Screen name="tienda" />
          <Tabs.Screen name="perfil" />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
  },
  content: {
    flex: 1,
  },
  tabBarWeb: {
    position: 'relative',
  },
});
