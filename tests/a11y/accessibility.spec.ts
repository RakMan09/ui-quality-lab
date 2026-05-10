import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '../fixtures/ui-fixture';

async function runAxe(page: import('@playwright/test').Page) {
  const scan = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  const seriousAndCritical = scan.violations.filter((violation) =>
    violation.nodes.some((node) => node.impact === 'serious' || node.impact === 'critical'),
  );

  expect(seriousAndCritical, JSON.stringify(seriousAndCritical, null, 2)).toHaveLength(0);
}

test.describe('Accessibility checks', () => {
  test('main showcase page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'UI Quality Lab' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
    await runAxe(page);
  });

  test('modal state', async ({ gotoState, page }) => {
    await gotoState('modal-open-default');
    await expect(page.getByRole('dialog', { name: 'Confirm publish' })).toBeVisible();
    await runAxe(page);
  });

  test('form invalid state', async ({ gotoState, page }) => {
    await gotoState('form-invalid');
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByText('Enter a valid email address.')).toBeVisible();
    await runAxe(page);
  });

  test('tabs state', async ({ gotoState, page }) => {
    await gotoState('tabs-default');
    await expect(page.getByRole('tablist')).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Summary' })).toBeVisible();
    await runAxe(page);
  });

  test('data table state', async ({ gotoState, page }) => {
    await gotoState('data-table-default');
    await expect(page.getByRole('table')).toBeVisible();
    await runAxe(page);
  });

  test('storybook-like component state', async ({ gotoState, page }) => {
    await gotoState('button-icon-only');
    await expect(page.getByRole('button', { name: 'Favorite baseline' })).toBeVisible();
    await runAxe(page);
  });
});
