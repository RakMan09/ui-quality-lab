import { expect, test } from '../fixtures/ui-fixture';

test.describe('Critical component smoke', () => {
  test('button triggers modal, modal closes', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Open review modal' }).click();
    await expect(page.getByRole('dialog', { name: 'Release approval' })).toBeVisible();

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('dialog', { name: 'Release approval' })).toBeHidden();
  });

  test('form validation message appears', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Notification email').fill('qa');
    await page.getByRole('button', { name: 'Validate email' }).click();
    await expect(page.getByTestId('demo-form-status')).toHaveText('Enter a valid email before submitting.');
  });

  test('tabs switch correctly', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'History' }).click();
    await expect(page.getByRole('tabpanel')).toContainText('Last 14 runs retained.');
  });

  test('data table renders rows', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('row')).toHaveCount(4);
  });

  test('alert dismiss button works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Dismiss alert' }).click();
    await expect(page.getByText('Alert has been dismissed.')).toBeVisible();
  });
});
