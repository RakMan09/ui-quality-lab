export const viewports = {
  mobile: {
    width: 390,
    height: 844,
  },
  tablet: {
    width: 900,
    height: 1024,
  },
  desktop: {
    width: 1280,
    height: 900,
  },
} as const;

export type ViewportName = keyof typeof viewports;

export const viewportStyles = {
  mobile: { width: '390px', height: '844px' },
  tablet: { width: '900px', height: '1024px' },
  desktop: { width: '1280px', height: '900px' },
} as const;

export function getViewportFromSearchParams(input: string | null): ViewportName {
  if (input === 'mobile' || input === 'tablet' || input === 'desktop') {
    return input;
  }

  return 'desktop';
}
