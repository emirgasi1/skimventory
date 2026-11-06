export const Colors = {
  light: {
    text: '#1F2937',          
    muted: '#6B7280',         
    background: '#F3F4F6',  
    card: '#FFFFFF',          
    border: '#D1D5DB',        
    primary: '#EA580C',       
    onPrimary: '#FFFFFF',    
    success: '#16A34A',       
    warning: '#CA8A04',       
    danger: '#DC2626',        
  },
  dark: {
    text: '#F9FAFB',         
    muted: '#9CA3AF',         
    background: '#111827',    
    card: '#1F2937',          
    border: '#374151',       
    primary: '#F97316',       
    onPrimary: '#111827',    
    success: '#22C55E',       
    warning: '#FBBF24',       
    danger: '#EF4444',        
  },
} as const;

export type Theme = typeof Colors.light;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const FontSize = {
  small: 13,
  body: 16,
  title: 20,
  hero: 28,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  pill: 999,
} as const;


