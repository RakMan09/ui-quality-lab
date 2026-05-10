import { expect, test } from '../fixtures/ui-fixture';
import { visualStates } from '../../src/lab/state-catalog';

for (const state of visualStates) {
  test(`visual snapshot: ${state.id}`, async ({ gotoState, page, setViewportByName }) => {
    await setViewportByName(state.viewport);
    await gotoState(state.id);

    await page.addStyleTag({ path: 'tests/visual/snapshot.css' });
    await expect(page.getByTestId('visual-state-surface')).toBeVisible();

    if (state.waitFor === 'loaded') {
      await expect(page.getByTestId('visual-state-surface')).toHaveAttribute('data-testid', 'visual-state-surface');
    }

    await expect(page).toHaveScreenshot(`${state.id}.png`, {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    });
  });
}
