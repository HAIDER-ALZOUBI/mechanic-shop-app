import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../components/ui/button';

export default function Dashboard() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dashboard</Text>
      <Button>Test Button</Button>
    </View>
  );
}
