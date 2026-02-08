import { test, expect } from '@playwright/test';
import { EnvioRecogidaPage } from './page-models/EnvioRecogidaPage';

test.describe('CTTexpress Form Field Discovery', () => {
  test('should perform best coverage testing for the page with most input fields', async ({ page }) => {
    const envioRecogida = new EnvioRecogidaPage(page);
    await envioRecogida.goto();
    await envioRecogida.acceptCookiesIfPresent();
    const fields = await page.$$('input, textarea, select');
    expect(fields.length).toBeGreaterThan(0);
    await envioRecogida.fillAllFields();
    await envioRecogida.submitFormIfPresent();
  });
});
