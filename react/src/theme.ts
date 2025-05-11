// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index scale
export const zIndex = {
  // Base content
  base: 0,
  // Content that should be above base content
  content: 10,
  // Fixed elements that should be above content
  fixed: 20,
  // Overlays and dropdowns
  overlay: 30,
  // Modals and dialogs
  modal: 40,
  // Top-level elements that should always be on top
  top: 50,
} as const;

// Layout
export const layout = {
  headerHeight: '4rem',     // 64px
  sidebarWidth: '16rem',   // 256px
  rightSidebarWidth: '16rem', // 256px
  contentMaxWidth: '80rem', // 1280px
  contentPadding: '1rem',   // 16px
} as const;
