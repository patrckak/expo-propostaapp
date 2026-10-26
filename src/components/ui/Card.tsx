import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, style, ...props }: CardProps) {
  return (
    <ThemedView type="backgroundElement" style={[styles.card, style]} {...props}>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
