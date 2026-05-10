import { test as base, expect } from '@playwright/test';
import { getUiStateById } from '../../src/lab/state-catalog';
import { viewports, type ViewportName } from '../../src/lab/viewports';

export interface UiFixture {
  gotoState: (stateId: string) => Promise<void>;
  setViewportByName: (viewport: ViewportName) => Promise<void>;
}

export const test = base.extend<UiFixture>({
  gotoState: async ({ page }, use) => {
    await use(async (stateId: string) => {
      const state = getUiStateById(stateId);
      if (!state) {
        throw new Error(`Unknown UI state id: ${stateId}`);
      }

      await page.goto(`/?state=${state.id}&theme=${state.theme}&viewport=${state.viewport}`);
    });
  },
  setViewportByName: async ({ page }, use) => {
    await use(async (viewportName: ViewportName) => {
      const viewport = viewports[viewportName];
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
    });
  },
});

export { expect };
