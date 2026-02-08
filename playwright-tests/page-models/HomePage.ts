import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.cttexpress.com');
  }

  async acceptCookiesIfPresent() {
    const aceptarBtn = await this.page.$('button, input[type="button"], input[type="submit"]');
    if (aceptarBtn) {
      const text = await aceptarBtn.innerText();
      if (text && text.toLowerCase().includes('aceptar')) {
        await aceptarBtn.click();
      }
    }
  }

  async navIsVisible() {
    await this.page.waitForSelector('nav', { state: 'visible' });
    const navLinks = await this.page.$$('nav a');
    return navLinks.length > 0;
  }

  async navContainsEnvios() {
    const nav = await this.page.$('nav');
    if (!nav) return false;
    const text = await nav.textContent();
    return text && text.includes('Envíos');
  }

  async titleContainsCTT() {
    const title = await this.page.title();
    return title.includes('CTT');
  }

  async bodyIsVisible() {
    return await this.page.isVisible('body');
  }

  async urlContainsCTTExpress() {
    const url = this.page.url();
    return url.includes('cttexpress');
  }

  async clickEmpresasSubmenu() {
    await this.page.hover('a[href="/envios/"]');
    const submenu = await this.page.$('a[href="/envios/"]');
    if (submenu) {
      const ul = await submenu.evaluateHandle(el => el.parentElement?.querySelector('ul'));
      if (ul) {
        const firstLink = await ul.$('a');
        if (firstLink) {
          await firstLink.click();
        }
      }
    }
  }

  async urlContainsEnvios() {
    const url = this.page.url();
    return url.includes('/envios');
  }

  async clickParticularesSubmenu() {
    await this.page.hover('a[role="link"][aria-disabled="true"]');
    const submenu = await this.page.$('a[role="link"][aria-disabled="true"]');
    if (submenu) {
      const ul = await submenu.evaluateHandle(el => el.parentElement?.querySelector('ul'));
      if (ul) {
        const firstLink = await ul.$('a');
        if (firstLink) {
          await firstLink.click();
        }
      }
    }
  }

  async urlContainsServicios() {
    const url = this.page.url();
    return url.includes('/servicios');
  }
}
