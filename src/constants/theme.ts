/**
 * Cores e tema do app baseados no projeto Next.js com Tailwind
 * Cor primária: emerald-500 (#10b981)
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0a0a0a', // oklch(0.141 0.005 285.823)
    background: '#ffffff', // oklch(1 0 0)
    backgroundElement: '#f5f5f5', // oklch(0.967 0.001 286.375)
    backgroundSelected: '#e5e5e5', // oklch(0.92 0.004 286.32)
    textSecondary: '#737373', // oklch(0.552 0.016 285.938)
    primary: '#10b981', // emerald-500
    primaryForeground: '#f0fdf4', // emerald-50
    accent: '#10b981',
    destructive: '#ef4444', // red-500
    border: '#e5e5e5',
  },
  dark: {
    text: '#fafafa', // oklch(0.985 0 0)
    background: '#0a0a0a', // oklch(0.141 0.005 285.823)
    backgroundElement: '#262626', // oklch(0.21 0.006 285.885)
    backgroundSelected: '#404040', // oklch(0.274 0.006 286.033)
    textSecondary: '#a3a3a3', // oklch(0.705 0.015 286.067)
    primary: '#34d399', // emerald-400
    primaryForeground: '#022c22', // emerald-950
    accent: '#34d399',
    destructive: '#f87171', // red-400
    border: '#262626',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-sans)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

