import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from './src/theme';

import Dashboard from './src/screens/Dashboard';
import Scan from './src/screens/Scan';
import Invoices from './src/screens/Invoices';
import Customers from './src/screens/Customers';

const Tab = createBottomTabNavigator();

const navTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.primary,
    notification: colors.primary,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
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
