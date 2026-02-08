import { test, expect } from '@playwright/test';

test.describe('CTTexpress Form Field Discovery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.cttexpress.com');
    // Accept cookies if present
    const aceptarBtn = await page.$('button, input[type="button"], input[type="submit"]');
    if (aceptarBtn) {
      const text = await aceptarBtn.innerText();
      if (text && text.toLowerCase().includes('aceptar')) {
        await aceptarBtn.click();
      }
    }
  });

  test('should perform best coverage testing for the page with most input fields', async ({ page }) => {
    await page.goto('https://www.cttexpress.com/red-collectt-express/envio-y-recogida');
    // Handle Onetrust cookie overlay if present
    const onetrustAccept = await page.$('#onetrust-accept-btn-handler');
    if (onetrustAccept) {
      await onetrustAccept.click();
      // Wait for overlay to disappear
      await page.waitForSelector('.onetrust-pc-dark-filter', { state: 'detached', timeout: 5000 }).catch(() => {});
    }

    const fields = await page.$$('input, textarea, select');
    expect(fields.length).toBeGreaterThan(0);

    // Fill text inputs
    const textInputs = await page.$$('input[type="text"]:visible');
    for (let i = 0; i < textInputs.length; i++) {
      await textInputs[i].fill(`Sample Text ${i}`);
    }

    // Fill email inputs
    const emailInputs = await page.$$('input[type="email"]:visible');
    for (let i = 0; i < emailInputs.length; i++) {
      await emailInputs[i].fill(`test${i}@example.com`);
    }

    // Fill tel inputs
    const telInputs = await page.$$('input[type="tel"]:visible');
    for (let i = 0; i < telInputs.length; i++) {
      await telInputs[i].fill(`123456789${i}`);
    }

    // Fill number inputs
    const numberInputs = await page.$$('input[type="number"]:visible');
    for (let i = 0; i < numberInputs.length; i++) {
      await numberInputs[i].fill(`${i + 1}`);
    }

    // Fill textareas
    const textareas = await page.$$('textarea:visible');
    for (let i = 0; i < textareas.length; i++) {
      await textareas[i].fill(`Sample textarea ${i}`);
    }

    // Select first valid option in selects
    const selects = await page.$$('select:visible');
    for (const select of selects) {
      const options = await select.$$('option');
      for (const option of options) {
        const disabled = await option.getAttribute('disabled');
        const value = await option.getAttribute('value');
        if (!disabled && value) {
          await select.selectOption(value);
          break;
        }
      }
    }

    // Try to submit the form if present
    const form = await page.$('form');
    if (form) {
      const submitBtn = await form.$('input[type="submit"], button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        await expect(page.locator('body')).toBeVisible();
      }
    }
  });
});
