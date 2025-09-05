import { expect, test } from '@baseTest';
import { Users } from '@enums';

test('E2E test', async ({ page, loginPage, leftMenuPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.login(Users.STANDARD_USER);
  const itemList: Item[] = await inventoryPage.addToCart(['Sauce Labs Backpack']);
  await cartPage.checkoutItems(itemList);
  await checkoutPage.doCheckout(itemList);
  await page.goto('inventory.html');

  expect(await inventoryPage.getCartCount()).toBe(0);

  await leftMenuPage.selectMenu('Logout');
  await expect(page.getByTestId('login-button')).toBeVisible();
});

test('Visual regression test', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveScreenshot('loginPage');
});
