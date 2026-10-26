import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
}

export function MetricCard({ title, value, icon, subtitle }: MetricCardProps) {
  return (
    <Card style={styles.card}>
      {icon && <>{icon}</>}
      <ThemedText type="subtitle" style={styles.value}>
        {value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {title}
      </ThemedText>
      {subtitle && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    alignItems: 'flex-start',
    gap: Spacing.one,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: Spacing.one,
  },
});
