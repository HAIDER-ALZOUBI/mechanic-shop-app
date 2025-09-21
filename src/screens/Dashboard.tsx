// src/screens/Dashboard.tsx
import React from 'react';
import { ScrollView, View, useWindowDimensions, Text } from 'react-native';

import DashboardStats from './dashboard/DashboardStats';
import RevenueChart from './dashboard/RevenueChart';
import RecentActivity from './dashboard/RecentActivity';

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isWide = width >= 1024; // raise breakpoint a bit for better balance

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        backgroundColor: '#111827', // slightly darker page bg
        gap: 16,
        minHeight: '100%',
      }}
    >
      {/* Page title */}
      <Text style={{ color: '#f9fafb', fontSize: 22, fontWeight: '800' }}>Dashboard</Text>

      {/* Top row: stats + chart */}
      <View
        style={{
          flexDirection: isWide ? 'row' : 'column',
          gap: 16,
          alignItems: 'stretch',
        }}
      >
        {/* Stats (≈ 5/12) */}
        <View style={{ flexBasis: isWide ? '41.666%' : 'auto', flexGrow: isWide ? 0 : 1 }}>
          <DashboardStats />
        </View>

        {/* Chart (≈ 7/12) */}
        <View style={{ flexBasis: isWide ? '58.333%' : 'auto', flexGrow: isWide ? 0 : 1 }}>
          <RevenueChart />
        </View>
      </View>

      {/* Recent (full width) */}
      <View>
        <RecentActivity />
      </View>
    </ScrollView>
  );
}
