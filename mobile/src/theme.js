export const COLORS = {
  background: '#0B0C10',
  surface: '#1F2833',
  primary: '#00FF00',
  text: '#FFFFFF',
  textSecondary: '#A1A1AA',
  border: '#333333',
  error: '#FF4C4C',
  glassBackground: 'rgba(31, 40, 51, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

export const SIZES = {
  padding: 16,
  radius: 16,
  radiusSm: 8,
  h1: 32,
  h2: 24,
  h3: 18,
  body: 16,
  small: 14,
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  text: {
    color: COLORS.text,
    fontSize: SIZES.body,
  },
  glassPanel: {
    backgroundColor: COLORS.glassBackground,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: SIZES.padding,
    // Note: React Native doesn't support backdrop-filter natively without expo-blur
    // For a true glass effect, we'd use <BlurView> from expo-blur, but this serves as a fallback.
  }
};
