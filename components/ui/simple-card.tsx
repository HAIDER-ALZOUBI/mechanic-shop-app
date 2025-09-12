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
  card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  header: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { color: colors.textPrimary, fontWeight: '600', fontSize: 16 },
  subtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  content: { padding: 16 },
});
