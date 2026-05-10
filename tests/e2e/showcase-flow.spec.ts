import { expect, test } from '../fixtures/ui-fixture';

test.describe('Showcase flow', () => {
  test('loads dashboard and supports key interactions', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('app-title')).toHaveText('UI Quality Lab');
    await expect(page.getByTestId('component-grid')).toBeVisible();
    await expect(page.getByTestId('release-readiness-panel')).toBeVisible();

    await page.getByRole('button', { name: 'Open review modal' }).click();
    await expect(page.getByRole('dialog', { name: 'Release approval' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('dialog', { name: 'Release approval' })).toBeHidden();

    const emailField = page.getByLabel('Notification email');
    await emailField.fill('invalid');
    await page.getByRole('button', { name: 'Validate email' }).click();
    await expect(page.getByTestId('demo-form-status')).toHaveText('Enter a valid email before submitting.');

    await emailField.fill('qa@company.com');
    await page.getByRole('button', { name: 'Validate email' }).click();
    await expect(page.getByTestId('demo-form-status')).toHaveText('Email saved successfully.');

    await page.getByRole('tab', { name: 'Incidents' }).click();
    await expect(page.getByRole('tabpanel')).toContainText('No open incidents.');

    await page.getByRole('button', { name: 'Empty state' }).click();
    await expect(page.getByText('No rows in this mode.')).toBeVisible();

    await page.getByRole('button', { name: 'Default rows' }).click();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('renders on mobile without horizontal overflow', async ({ page, setViewportByName }) => {
    await setViewportByName('mobile');
    await page.goto('/');

    const hasOverflow = await page.evaluate(() => {
      const { scrollWidth, clientWidth } = document.documentElement;
      return scrollWidth > clientWidth + 1;
    });

    expect(hasOverflow).toBeFalsy();
  });
});
