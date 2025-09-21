// DashboardStats.tsx
// ------------------
// A grid of small "stat cards" for the Dashboard screen.
// Each card shows a title, value, percentage change, and an icon.
// Trend (up/down) controls whether the percentage is green or red.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SimpleCard } from '../../../components/ui/simple-card';
import { Feather } from '@expo/vector-icons';

// ---------------------------
// Type definitions
// ---------------------------
// Trend can only be "up" or "down"
// Stat describes the data needed for one card
type Trend = 'up' | 'down';
type Stat = {
  title: string;
  value: string;
  change: string;
  trend: Trend;
  icon: React.ReactNode;
};

// ---------------------------
// Small helper: wraps the icon
// ---------------------------
// Creates a circle background behind the icon
const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.iconWrap}>{children}</View>
);

// ---------------------------
// StatsCard component
// ---------------------------
// Renders a single card with title, icon, value, and trend text
const StatsCard = ({ title, value, change, icon, trend }: Stat) => (
  <SimpleCard style={styles.card}>
    {/* inner container gives all cards a similar height */}
    <View style={{ minHeight: 100 }}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <IconWrap>{icon}</IconWrap>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.change, trend === 'up' ? styles.up : styles.down]}>
        {change} from last month
      </Text>
    </View>
  </SimpleCard>
);

// ---------------------------
// DashboardStats (main export)
// ---------------------------
// Creates an array of stat objects, maps over them, and renders StatsCard for each.
// End result: a 2-column grid of stats.
export default function DashboardStats() {
  const stats: Stat[] = [
    {
      title: 'Monthly Income',
      value: '$12,450',
      change: '+20.1%',
      trend: 'up',
      icon: <Feather name="dollar-sign" size={24} color="#3b82f6" />,
    },
    {
      title: 'Active Customers',
      value: '89',
      change: '+12%',
      trend: 'up',
      icon: <Feather name="users" size={24} color="#3b82f6" />,
    },
    {
      title: 'Parts Expenses',
      value: '$4,230',
      change: '-5.2%',
      trend: 'down',
      icon: <Feather name="file-text" size={24} color="#3b82f6" />,
    },
    {
      title: 'Jobs Completed',
      value: '34',
      change: '+8%',
      trend: 'up',
      icon: <Feather name="tool" size={24} color="#3b82f6" />,
    },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((s, i) => (
        <StatsCard key={i} {...s} />
      ))}
    </View>
  );
}

// ---------------------------
// Styles
// ---------------------------
// Grid layout (2 per row), card styling, icon circle, and colors
const styles = StyleSheet.create({
  // Use small negative gutter to counter the per-card horizontal padding.
  // (Avoid huge fixed margins — those cause the "squeezed center" look.)
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  // Each card takes half the row on wide screens; stacked on narrow.
  card: { width: '49%', paddingHorizontal: 6, marginBottom: 12 , marginRight: 6},

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  // Match wrapper size to icon size for a neat visual (no clipping)
  iconWrap: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#1f2940',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: '#9ca3af', fontSize: 12 }, // gray-400
  value: { color: '#f9fafb', fontSize: 20, fontWeight: '700', marginTop: 2 }, // white
  change: { fontSize: 12, marginTop: 2 },
  up: { color: '#22c55e' }, // green-500
  down: { color: '#ef4444' }, // red-500
});
