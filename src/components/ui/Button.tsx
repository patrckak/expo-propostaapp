import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  icon,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.backgroundElement;
    if (variant === 'outline') return 'transparent';
    if (variant === 'secondary') return theme.backgroundSelected;
    return theme.primary; // emerald-500
  };

  const getTextColor = () => {
    if (disabled) return theme.textSecondary;
    if (variant === 'outline') return theme.primary;
    if (variant === 'secondary') return theme.text;
    return theme.primaryForeground; // white or emerald-50
  };

  const getBorderColor = () => {
    if (variant === 'outline') return theme.primary;
    return 'transparent';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
    minHeight: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
