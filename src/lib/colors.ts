// Cooltracer Design System Colors
export const colors = {
  // Background Colors
  background: {
    primary: '#11151C',    // Main dashboard background
    secondary: '#1f2937',  // Secondary backgrounds
    tertiary: '#05040D',   // Dark accents
  },

  // Border Colors
  border: {
    primary: '#29292D',    // Main borders
    secondary: '#374151',  // Secondary borders
    accent: '#1F77B4',     // Blue accent borders
  },

  // Text Colors
  text: {
    primary: '#EAEAEA',    // Main text
    secondary: '#9ca3af',  // Secondary text
    muted: '#6b7280',      // Muted text
  },

  // Interactive Colors
  interactive: {
    hover: '#1A1A24',      // Hover states
    active: '#266599',     // Active states
  },

  // Brand Colors
  brand: {
    primary: '#1F77B4',    // Primary blue
    secondary: '#5BB3FA',  // Light blue
    accent: '#27D699',     // Green accent
  },

  // Chart Colors
  chart: {
    blue: '#0ea5e9',       // Chart blue
    green: '#10b981',      // Chart green
    red: '#ef4444',        // Chart red
  },

  // Status Colors
  status: {
    success: '#10b981',    // Green
    warning: '#f59e0b',    // Yellow/Orange
    error: '#ef4444',      // Red
    info: '#3b82f6',       // Blue
  },
} as const;

// Export individual color groups for easier importing
export const backgroundColors = colors.background;
export const borderColors = colors.border;
export const textColors = colors.text;
export const interactiveColors = colors.interactive;
export const brandColors = colors.brand;
export const chartColors = colors.chart;
export const statusColors = colors.status;