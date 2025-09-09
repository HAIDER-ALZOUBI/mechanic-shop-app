import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';

import Dashboard from './src/screens/Dashboard';
import Scan from './src/screens/Scan';
import Invoices from './src/screens/Invoices';
import Customers from './src/screens/Customers';

// import './global.css'; // keep commented for now

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Scan" component={Scan} />
          <Tab.Screen name="Invoices" component={Invoices} />
          <Tab.Screen name="Customers" component={Customers} />
        </Tab.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
