export const themeNames = ['light', 'dark'] as const;

export type ThemeName = (typeof themeNames)[number];

export function getThemeFromSearchParams(input: string | null): ThemeName {
  return input === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute('data-theme', theme);
}
