/**
 * Unified layout and component styles
 * Centralizes spacing, colors, and common patterns
 */

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
  '3xl': '6rem',
  '4xl': '8rem',
} as const;

export const sectionPadding = {
  vertical: spacing['3xl'],
  horizontal: spacing.lg,
  mobile: {
    vertical: '4rem',
    horizontal: spacing.lg,
  },
} as const;

export const sectionStyles = {
  base: {
    position: 'relative' as const,
    zIndex: 2,
    background: 'transparent',
  },
  withPadding: {
    padding: `${sectionPadding.vertical} ${sectionPadding.horizontal}`,
  },
  withBorders: {
    borderTop: '1px solid var(--bg-card)',
    borderBottom: '1px solid var(--bg-card)',
  },
  withMinHeight: {
    minHeight: '100vh',
    display: 'flex' as const,
    alignItems: 'center' as const,
  },
} as const;

export const containerStyles = {
  base: {
    maxWidth: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  large: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
} as const;

export const transitionBase = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
export const transitionFast = '0.2s ease';
export const transitionSlow = '0.6s ease-out';

export const colors = {
  primary: 'var(--primary)',
  primaryContainer: 'var(--primary-container)',
  accentPrimary: 'var(--accent-primary)',
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textMuted: 'var(--text-muted)',
  bgCard: 'var(--bg-card)',
  bgElevated: 'var(--bg-elevated)',
  border: 'var(--border)',
  borderHover: 'var(--border-hover)',
} as const;

export const typography = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
} as const;

export const buttonStyles = {
  primary: {
    padding: '1rem 2.5rem',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none' as const,
    transition: `all ${transitionBase}`,
    background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
    color: '#131313',
    boxShadow: '0 0 40px rgba(167,139,250,0.1)',
    border: 'none',
    cursor: 'pointer' as const,
  },
  secondary: {
    padding: '0.85rem 2rem',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '0.85rem',
    textDecoration: 'none' as const,
    border: '1px solid rgba(148, 142, 157, 0.15)',
    color: 'var(--text-primary)',
    background: 'transparent',
    transition: `all ${transitionBase}`,
    cursor: 'pointer' as const,
  },
  ghost: {
    padding: '0.5rem 1.25rem',
    borderRadius: '0px',
    border: '1px solid var(--accent-primary)',
    color: 'var(--accent-primary)',
    fontFamily: "var(--font-mono)",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    background: 'transparent',
    transition: `all 0.3s cubic-bezier(0.4,0,0.2,1)`,
    cursor: 'pointer' as const,
  },
} as const;

export const mediaQueries = {
  mobile: '(max-width: 640px)',
  tablet: '(max-width: 768px)',
  desktop: '(min-width: 769px)',
} as const;

export const accentColors = {
  purple: '#a78bfa',
  blue: '#60a5fa',
  green: '#34d399',
  emerald: '#10b981',
  cyan: '#06b6d4',
} as const;

// Utility for creating consistent grid layouts
export const createGridLayout = (columnsDesktop: number, columnsTablet = 2, columnsMobile = 1) => ({
  display: 'grid' as const,
  gridTemplateColumns: `repeat(${columnsDesktop}, 1fr)`,
  gap: '2rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: `repeat(${columnsTablet}, 1fr)`,
    gap: '1.5rem',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: `repeat(${columnsMobile}, 1fr)`,
    gap: '1rem',
  },
});
