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
    let retries = 3;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        if (await empresasLink.isVisible()) {
          await empresasLink.scrollIntoViewIfNeeded();
          await empresasLink.hover();
          await this.page.waitForTimeout(500);
          const submenu = empresasLink.locator('..').locator('ul a');
          // Wait for submenu to be attached and visible
          await submenu.first().waitFor({ state: 'attached', timeout: 2000 }).catch(() => {});
          await submenu.first().waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
          if (await submenu.first().isVisible()) {
            await submenu.first().scrollIntoViewIfNeeded();
            await submenu.first().click({ force: true });
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(500);
            return;
          } else {
            console.warn(`Empresas submenu not visible, retrying hover action (attempt ${attempt})`);
            await this.page.waitForTimeout(500);
          }
        }
      } catch (e) {
        console.error(`Empresas submenu click failed (attempt ${attempt}):`, e);
        await this.page.waitForTimeout(500);
      }
    }
    throw new Error('Empresas submenu click failed after retries');
  }

  async urlContainsEnvios() {
    const url = this.page.url();
    return url.includes('/envios');
  }

  async clickParticularesSubmenu() {
    const particularesLink = this.page.locator('a[role="link"][aria-disabled="true"]');
    let retries = 3;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        if (await particularesLink.isVisible()) {
          await particularesLink.scrollIntoViewIfNeeded();
          await particularesLink.hover();
          await this.page.waitForTimeout(500);
          const submenu = particularesLink.locator('..').locator('ul a');
          await submenu.first().waitFor({ state: 'attached', timeout: 2000 }).catch(() => {});
          await submenu.first().waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
          if (await submenu.first().isVisible()) {
            await submenu.first().scrollIntoViewIfNeeded();
            await submenu.first().click({ force: true });
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(500);
            return;
          } else {
            console.warn(`Particulares submenu not visible, retrying hover action (attempt ${attempt})`);
            await this.page.waitForTimeout(500);
          }
        }
      } catch (e) {
        console.error(`Particulares submenu click failed (attempt ${attempt}):`, e);
        await this.page.waitForTimeout(500);
      }
    }
    throw new Error('Particulares submenu click failed after retries');
  }

  async urlContainsServicios() {
    const url = this.page.url();
    return url.includes('/servicios');
  }
}
