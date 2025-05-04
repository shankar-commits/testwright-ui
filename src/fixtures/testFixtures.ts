import { LoginPage, BasePage, LeftMenuPage } from '@pages';
import { test as baseTest } from '@playwright/test';

type pageFixtures = {
  loginPage: LoginPage;
  leftMenuPage: LeftMenuPage;
  basePage: BasePage;
};

export const test = baseTest.extend<pageFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  leftMenuPage: async ({ page }, use) => {
    const leftMenuPage = new LeftMenuPage(page);
    await use(leftMenuPage);
  }
});

export { expect, Page } from '@playwright/test';
