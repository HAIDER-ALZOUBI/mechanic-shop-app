import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../src/theme';

type CardProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  headerRight?: React.ReactNode;
}>;

export function SimpleCard({ title, subtitle, headerRight, style, children }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {(title || subtitle || headerRight) && (
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {headerRight}
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 3, borderColor: colors.border, overflow: 'hidden'},
  header: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { color: colors.textPrimary, fontWeight: '600', fontSize: 36 },
  subtitle: { color: colors.textSecondary, fontSize: 18, marginTop: 2 },
  content: { padding: 16 },
});

// inside SimpleCard styles
const baseStyle = {
  backgroundColor: '#1f2937',  // card bg
  borderWidth: 1,
  borderColor: '#2b3446',      // lighter border
  borderRadius: 12,
  padding: 16,
  // soft shadow on web (ignored on native)
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 2,
};

