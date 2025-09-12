import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../theme';

import DashboardStats from './dashboard/DashboardStats';
import RevenueChart from './dashboard/RevenueChart';
import RecentActivity from './dashboard/RecentActivity';

export default function Dashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DashboardStats />
      <View style={{ height: 12 }} />
      <RevenueChart />
      <View style={{ height: 12 }} />
      <RecentActivity />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, gap: 12 },
});
