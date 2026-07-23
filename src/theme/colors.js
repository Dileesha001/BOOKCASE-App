/**
 * BOOKCASE App - Color Palette & Theme Design System
 * Defines Obsidian Gold (Dark Mode) & Emerald Sage (Light Mode) palettes
 */

export const themes = {
  dark: {
    name: 'obsidian',
    isDark: true,
    background: '#050c08',
    cardBackground: '#0d1b12',
    cardBorder: 'rgba(212, 160, 23, 0.25)',
    surface: '#122418',
    surfaceElevated: '#1a3323',
    primary: '#D4A017', // Luxury Gold
    primaryHover: '#F3C041',
    secondary: '#10B981', // Emerald Green
    accent: '#F59E0B',
    textPrimary: '#F3F4F6',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
    goldAccent: '#D4A017',
    goldGlow: 'rgba(212, 160, 23, 0.15)',
    emeraldGlow: 'rgba(16, 185, 129, 0.2)',
    badgeBg: '#1c291e',
    badgeText: '#F3C041',
    stockInDot: '#10B981',
    stockOutDot: '#EF4444',
    stockInText: '#10B981',
    stockOutText: '#EF4444',
    headerBg: 'rgba(5, 12, 8, 0.95)',
    tabBarBg: '#08120c',
    tabBarActive: '#D4A017',
    tabBarInactive: '#6B7280',
    inputBg: '#0f2116',
    inputBorder: '#1c3826',
    buttonText: '#050c08',
  },
  light: {
    name: 'emerald',
    isDark: false,
    background: '#EFF5F2',
    cardBackground: '#FFFFFF',
    cardBorder: 'rgba(16, 185, 129, 0.18)',
    surface: '#F8FAF9',
    surfaceElevated: '#FFFFFF',
    primary: '#10B981', // Lush Emerald Green
    primaryHover: '#059669',
    secondary: '#D4A017', // Gold Accent
    accent: '#0D9488',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    goldAccent: '#B48107',
    goldGlow: 'rgba(212, 160, 23, 0.12)',
    emeraldGlow: 'rgba(16, 185, 129, 0.15)',
    badgeBg: '#E6F4ED',
    badgeText: '#047857',
    stockInDot: '#10B981',
    stockOutDot: '#EF4444',
    stockInText: '#047857',
    stockOutText: '#DC2626',
    headerBg: 'rgba(239, 245, 242, 0.95)',
    tabBarBg: '#FFFFFF',
    tabBarActive: '#10B981',
    tabBarInactive: '#94A3B8',
    inputBg: '#FFFFFF',
    inputBorder: '#CBD5E1',
    buttonText: '#FFFFFF',
  }
};
