import { test, expect } from '@playwright/test';
import { EnvioRecogidaPage } from './page-models/EnvioRecogidaPage';
import { HomePage } from './page-models/HomePage';

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

test.describe('CTTexpress Full Website Smoke Test', () => {
  let home: HomePage;
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
    await home.acceptCookiesIfPresent();
  });

  test('should display the main menu on the homepage', async ({ page }) => {
    expect(await home.navIsVisible()).toBeTruthy();
    expect(await home.navContainsEnvios()).toBeTruthy();
  });

  test('should load the homepage and have a title that contains CTT', async ({ page }) => {
    expect(await home.titleContainsCTT()).toBeTruthy();
    expect(await home.bodyIsVisible()).toBeTruthy();
    expect(await home.urlContainsCTTExpress()).toBeTruthy();
  });

  test('should have a visible body element', async ({ page }) => {
    expect(await home.bodyIsVisible()).toBeTruthy();
  });

  test('should click the Envíos para empresas submen link and see the page', async ({ page }) => {
    await home.clickEmpresasSubmenu();
    expect(await home.bodyIsVisible()).toBeTruthy();
    expect(await home.urlContainsEnvios()).toBeTruthy();
  });

  test('should click the Envios para particulares submenu link and see the page', async ({ page }) => {
    await home.clickParticularesSubmenu();
    expect(await home.bodyIsVisible()).toBeTruthy();
    expect(await home.urlContainsServicios()).toBeTruthy();
  });
});
