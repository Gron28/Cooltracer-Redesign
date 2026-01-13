export const colors = {
  background: {
    primary: 'hsl(var(--background))',
    secondary: 'hsl(var(--secondary))',
    tertiary: 'hsl(var(--muted))',
  },

  border: {
    primary: 'hsl(var(--border))',
    secondary: 'hsl(var(--input))',
    accent: 'hsl(var(--ring))',
  },

  text: {
    primary: 'hsl(var(--foreground))',
    secondary: 'hsl(var(--muted-foreground))',
    muted: 'hsl(var(--muted-foreground))',
  },

  interactive: {
    hover: 'hsl(var(--accent))',
    active: 'hsl(var(--primary))',
  },

  brand: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--chart-4))',
    accent: 'hsl(var(--chart-1))',
  },

  chart: {
    blue: 'hsl(var(--chart-2))',
    green: 'hsl(var(--chart-1))',
    red: 'hsl(var(--chart-5))',
    grey: 'hsl(var(--chart-3))',
  },

  status: {
    success: 'hsl(var(--chart-1))',
    warning: '#f59e0b',
    error: 'hsl(var(--destructive))',
    info: 'hsl(var(--chart-2))',
  },
} as const;

export const backgroundColors = colors.background;
export const borderColors = colors.border;
export const textColors = colors.text;
export const interactiveColors = colors.interactive;
export const brandColors = colors.brand;
export const chartColors = colors.chart;
export const statusColors = colors.status;