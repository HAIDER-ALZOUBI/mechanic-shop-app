// RecentActivity.tsx
// ------------------
// Displays a list of recent invoices, payments, and expenses.
// Each row shows: icon, customer name, description, time-ago, status badge, and amount.
// Data is mocked (the `activities` array) — later you can swap it for real data.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SimpleCard } from '../../../components/ui/simple-card';
import { Feather } from '@expo/vector-icons';

// ---------------------------
// Types
// ---------------------------
// One activity item: what happened, who, how much, when, and its status.
type Activity = {
  id: string;
  type: 'invoice' | 'payment' | 'expense';
  customer: string;
  amount: number;
  description: string;
  timestamp: number; // milliseconds since epoch
  status: 'completed' | 'pending' | 'draft';
};

// ---------------------------
// Mock Data (replace with real data later)
// ---------------------------
const activities: Activity[] = [
  { id: '1', type: 'payment',  customer: 'John Smith',     amount: 450,   description: 'Oil change & brake service', timestamp: Date.now() - 2*60*60*1000,  status: 'completed' },
  { id: '2', type: 'invoice',  customer: 'Sarah Johnson',  amount: 890,   description: 'Transmission repair',        timestamp: Date.now() - 4*60*60*1000,  status: 'pending'   },
  { id: '3', type: 'expense',  customer: 'AutoZone',       amount: 125.5, description: 'Brake pads & rotors',        timestamp: Date.now() - 24*60*60*1000, status: 'completed' },
  { id: '4', type: 'invoice',  customer: 'Mike Rodriguez', amount: 320,   description: 'AC system diagnostic',        timestamp: Date.now() - 2*24*60*60*1000, status: 'draft'   },
];

// ---------------------------
// Small UI helpers
// ---------------------------

// Pick an icon per activity type (blue outline icons)
function typeIcon(t: Activity['type']) {
  switch (t) {
    case 'payment': return <Feather name="dollar-sign" size={16} color="#3b82f6" />;
    case 'invoice': return <Feather name="file-text" size={16} color="#3b82f6" />;
    case 'expense': return <Feather name="shopping-cart" size={16} color="#3b82f6" />;
    default:        return <Feather name="tag" size={16} color="#3b82f6" />;
  }
}

// Style + icon for the status chip (right side of customer line)
function statusChipStyle(s: Activity['status']) {
  switch (s) {
    case 'completed': return { color: '#22c55e', borderColor: '#22c55e', icon: 'check-circle' as const }; // green
    case 'pending':   return { color: '#f59e0b', borderColor: '#f59e0b', icon: 'clock' as const };        // amber
    case 'draft':     return { color: '#9ca3af', borderColor: '#374151', icon: 'file' as const };         // gray
    default:          return { color: '#9ca3af', borderColor: '#374151', icon: 'file' as const };
  }
}

// Convert timestamp → "Xm ago", "Yh ago", or "Zd ago"
function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ---------------------------
// Main Component
// ---------------------------
// Renders a SimpleCard and maps over `activities` to draw rows.
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
              {/* Left: rounded icon bubble */}
              <View style={styles.iconBubble}>{typeIcon(a.type)}</View>

              {/* Middle: customer, description, time-ago */}
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

              {/* Right: amount (green for inflow, red for expense) */}
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

// ---------------------------
// Styles (hardcoded dark colors)
// ---------------------------
// No external theme/common — everything is self-contained here.
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    backgroundColor: '#1e2638', // dark surface
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',     // neutral border
    alignItems: 'center',
  },
  iconBubble: {
    height: 40, width: 40, borderRadius: 20,
    backgroundColor: '#1f2940', // slightly lighter surface
    alignItems: 'center', justifyContent: 'center',
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  customer: { color: '#f9fafb', fontWeight: '600' }, // white
  desc: { color: '#9ca3af', fontSize: 12 },          // gray
  time: { color: '#6b7280', fontSize: 11, marginTop: 2 }, // muted gray

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
  amountUp: { color: '#22c55e' },   // green (inflow)
  amountDown: { color: '#ef4444' }, // red (expense)
});
