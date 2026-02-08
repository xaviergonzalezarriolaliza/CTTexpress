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
    const empresasLink = this.page.locator('a[href="/envios/"]');
    try {
      if (await empresasLink.isVisible()) {
        await empresasLink.scrollIntoViewIfNeeded();
        await empresasLink.hover();
        await this.page.waitForTimeout(500); // Extra wait for menu animation
        const submenu = empresasLink.locator('..').locator('ul a');
        await submenu.first().waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
        await submenu.first().scrollIntoViewIfNeeded();
        await submenu.first().click({ force: true });
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500); // Wait for navigation
      }
    } catch (e) {
      console.error('Empresas submenu click failed:', e);
    }
  }

  async urlContainsEnvios() {
    const url = this.page.url();
    return url.includes('/envios');
  }

  async clickParticularesSubmenu() {
    const particularesLink = this.page.locator('a[role="link"][aria-disabled="true"]');
    try {
      if (await particularesLink.isVisible()) {
        await particularesLink.scrollIntoViewIfNeeded();
        await particularesLink.hover();
        await this.page.waitForTimeout(500); // Extra wait for menu animation
        const submenu = particularesLink.locator('..').locator('ul a');
        await submenu.first().waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
        await submenu.first().scrollIntoViewIfNeeded();
        await submenu.first().click({ force: true });
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500); // Wait for navigation
      }
    } catch (e) {
      console.error('Particulares submenu click failed:', e);
    }
  }

  async urlContainsServicios() {
    const url = this.page.url();
    return url.includes('/servicios');
  }
}
