import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SimpleCard } from '../../../components/ui/simple-card';
import { colors } from '../../theme';
import { Feather } from '@expo/vector-icons';

type Trend = 'up' | 'down';
type Stat = { title: string; value: string; change: string; trend: Trend; icon: React.ReactNode };

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.iconWrap}>{children}</View>
);

const StatsCard = ({ title, value, change, icon, trend }: Stat) => (
  <SimpleCard style={styles.card}>
    <View style={styles.topRow}>
      <Text style={styles.title}>{title}</Text>
      <IconWrap>{icon}</IconWrap>
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={[styles.change, trend === 'up' ? styles.up : styles.down]}>
      {change} from last month
    </Text>
  </SimpleCard>
);

export default function DashboardStats() {
  const stats: Stat[] = [
    { title: 'Monthly Income',  value: '$12,450', change: '+20.1%', trend: 'up',
      icon: <Feather name="dollar-sign" size={16} color={colors.primary} /> },
    { title: 'Active Customers', value: '89',    change: '+12%', trend: 'up',
      icon: <Feather name="users" size={16} color={colors.primary} /> },
    { title: 'Parts Expenses',   value: '$4,230', change: '-5.2%', trend: 'down',
      icon: <Feather name="file-text" size={16} color={colors.primary} /> },
    { title: 'Jobs Completed',   value: '34',     change: '+8%', trend: 'up',
      icon: <Feather name="tool" size={16} color={colors.primary} /> },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((s, i) => <StatsCard key={i} {...s} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  card: { width: '50%', paddingHorizontal: 6 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' },
  iconWrap: { height: 24, width: 24, borderRadius: 12, backgroundColor: '#1f2940', alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.textSecondary, fontSize: 12 },
  value: { color: colors.textPrimary, fontSize: 22, fontWeight: '700', marginTop: 2 },
  change: { fontSize: 12, marginTop: 2 },
  up: { color: '#22c55e' },
  down: { color: '#ef4444' },
});
