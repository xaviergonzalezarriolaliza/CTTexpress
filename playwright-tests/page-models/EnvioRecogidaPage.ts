import { Page } from '@playwright/test';

export class EnvioRecogidaPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.cttexpress.com/red-collectt-express/envio-y-recogida');
  }

  async acceptCookiesIfPresent() {
    const aceptarBtn = await this.page.$('button, input[type="button"], input[type="submit"]');
    if (aceptarBtn) {
      const text = await aceptarBtn.innerText();
      if (text && text.toLowerCase().includes('aceptar')) {
        await aceptarBtn.click();
      }
    }
    const onetrustAccept = await this.page.$('#onetrust-accept-btn-handler');
    if (onetrustAccept) {
      await onetrustAccept.click();
      await this.page.waitForSelector('.onetrust-pc-dark-filter', { state: 'detached', timeout: 5000 }).catch(() => {});
    }
  }

  async fillAllFields() {
    const textInputs = await this.page.$$('input[type="text"]:visible');
    for (let i = 0; i < textInputs.length; i++) {
      await textInputs[i].fill(`Sample Text ${i}`);
    }
    const emailInputs = await this.page.$$('input[type="email"]:visible');
    for (let i = 0; i < emailInputs.length; i++) {
      await emailInputs[i].fill(`test${i}@example.com`);
    }
    const telInputs = await this.page.$$('input[type="tel"]:visible');
    for (let i = 0; i < telInputs.length; i++) {
      await telInputs[i].fill(`123456789${i}`);
    }
    const numberInputs = await this.page.$$('input[type="number"]:visible');
    for (let i = 0; i < numberInputs.length; i++) {
      await numberInputs[i].fill(`${i + 1}`);
    }
    const textareas = await this.page.$$('textarea:visible');
    for (let i = 0; i < textareas.length; i++) {
      await textareas[i].fill(`Sample textarea ${i}`);
    }
    const selects = await this.page.$$('select:visible');
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
  }

  async submitFormIfPresent() {
    const form = await this.page.$('form');
    if (form) {
      const submitBtn = await form.$('input[type="submit"], button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        await this.page.locator('body').isVisible();
      }
    }
  }
}
