import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from './src/theme';

import Dashboard from './src/screens/Dashboard';
import Scan from './src/screens/Scan';
import Invoices from './src/screens/Invoices';
import Customers from './src/screens/Customers';

// If your gluestack provider caused web issues, leave it out for now.
// You can re-wrap later once everything renders clean.

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.surface,
          text: colors.textPrimary,
          border: colors.border,
          primary: colors.primary,
        },
      }}
    >
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Scan" component={Scan} />
        <Tab.Screen name="Invoices" component={Invoices} />
        <Tab.Screen name="Customers" component={Customers} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
