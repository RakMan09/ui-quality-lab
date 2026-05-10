import { getThemeFromSearchParams, type ThemeName } from '../lab/themes';
import { getViewportFromSearchParams, type ViewportName } from '../lab/viewports';

export interface DashboardRoute {
  mode: 'dashboard';
  theme: ThemeName;
  viewport: ViewportName;
}

export interface StateRoute {
  mode: 'state';
  stateId: string;
  theme: ThemeName;
  viewport: ViewportName;
}

export type AppRoute = DashboardRoute | StateRoute;

export function readRoute(search: string): AppRoute {
  const params = new URLSearchParams(search);
  const stateId = params.get('state');
  const theme = getThemeFromSearchParams(params.get('theme'));
  const viewport = getViewportFromSearchParams(params.get('viewport'));

  if (stateId) {
    return {
      mode: 'state',
      stateId,
      theme,
      viewport,
    };
  }

  return {
    mode: 'dashboard',
    theme,
    viewport,
  };
}
