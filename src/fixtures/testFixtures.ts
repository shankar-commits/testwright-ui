import { LoginPage, BasePage, LeftMenuPage, InventoryPage, CartPage, CheckoutPage } from '@pages';
import { test as baseTest } from '@playwright/test';

type pageFixtures = {
  loginPage: LoginPage;
  leftMenuPage: LeftMenuPage;
  basePage: BasePage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
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
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  }
});

export { expect, Page } from '@playwright/test';
