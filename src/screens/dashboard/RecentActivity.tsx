import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SimpleCard } from '../../../components/ui/simple-card';
import { colors } from '../../theme';
import { Feather } from '@expo/vector-icons';

type Activity = {
  id: string;
  type: 'invoice' | 'payment' | 'expense';
  customer: string;
  amount: number;
  description: string;
  timestamp: number; // ms
  status: 'completed' | 'pending' | 'draft';
};

const activities: Activity[] = [
  { id: '1', type: 'payment',  customer: 'John Smith',     amount: 450,   description: 'Oil change & brake service', timestamp: Date.now() - 2*60*60*1000,  status: 'completed' },
  { id: '2', type: 'invoice',  customer: 'Sarah Johnson',  amount: 890,   description: 'Transmission repair',        timestamp: Date.now() - 4*60*60*1000,  status: 'pending'   },
  { id: '3', type: 'expense',  customer: 'AutoZone',       amount: 125.5, description: 'Brake pads & rotors',        timestamp: Date.now() - 24*60*60*1000, status: 'completed' },
  { id: '4', type: 'invoice',  customer: 'Mike Rodriguez', amount: 320,   description: 'AC system diagnostic',        timestamp: Date.now() - 2*24*60*60*1000, status: 'draft'   },
];

function typeIcon(t: Activity['type']) {
  switch (t) {
    case 'payment': return <Feather name="dollar-sign" size={16} color={colors.primary} />;
    case 'invoice': return <Feather name="file-text" size={16} color={colors.primary} />;
    case 'expense': return <Feather name="shopping-cart" size={16} color={colors.primary} />;
    default:        return <Feather name="tag" size={16} color={colors.primary} />;
  }
}

function statusChipStyle(s: Activity['status']) {
  switch (s) {
    case 'completed': return { color: '#22c55e', borderColor: '#22c55e', icon: 'check-circle' as const };
    case 'pending':   return { color: '#f59e0b', borderColor: '#f59e0b', icon: 'clock' as const };
    case 'draft':     return { color: colors.textSecondary, borderColor: colors.border, icon: 'file' as const };
    default:          return { color: colors.textSecondary, borderColor: colors.border, icon: 'file' as const };
  }
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function RecentActivity() {
  return (
    <SimpleCard
      title="Recent Activity"
      subtitle="Latest transactions and updates"
      style={{ flexGrow: 1 }}
    >
      <View style={{ gap: 12 }}>
        {activities.map((a) => {
          const chip = statusChipStyle(a.status);
          const isExpense = a.type === 'expense';
          return (
            <View key={a.id} style={styles.row}>
              {/* left icon bubble */}
              <View style={styles.iconBubble}>
                {typeIcon(a.type)}
              </View>

              {/* middle info */}
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.customer} numberOfLines={1}>{a.customer}</Text>
                  <View style={[styles.badge, { borderColor: chip.borderColor }]}>
                    <Feather name={chip.icon} size={12} color={chip.color} />
                    <Text style={[styles.badgeText, { color: chip.color }]}>{a.status}</Text>
                  </View>
                </View>
                <Text style={styles.desc} numberOfLines={1}>{a.description}</Text>
                <Text style={styles.time}>{timeAgo(a.timestamp)}</Text>
              </View>

              {/* right amount */}
              <View>
                <Text style={[styles.amount, isExpense ? styles.amountDown : styles.amountUp]}>
                  {isExpense ? '-' : '+'}${a.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </SimpleCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    backgroundColor: '#1e2638',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  iconBubble: {
    height: 40, width: 40, borderRadius: 20,
    backgroundColor: '#1f2940',
    alignItems: 'center', justifyContent: 'center',
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  customer: { color: colors.textPrimary, fontWeight: '600' },
  desc: { color: colors.textSecondary, fontSize: 12 },
  time: { color: colors.textMuted, fontSize: 11, marginTop: 2 },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 999,
  },
  badgeText: { fontSize: 12 },

  amount: { fontWeight: '700' },
  amountUp: { color: '#22c55e' },
  amountDown: { color: '#ef4444' },
});
