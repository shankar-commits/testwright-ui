import { BasePage } from './basePage';
import { test, Page, expect } from '@baseTest';

export class CartPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  /**
   * Verifies if the item is listed in the cart and proceeds to click on checkout button.
   * @param items - Item name or array of item names to check if they are listed in the cart
   */
  async checkoutItems(items: Item | Item[]): Promise<void> {
    await test.step(`Checking out items from cart`, async () => {
      await this.page.getByTestId('shopping-cart-link').click();
      await this.checkIfItemListed(items);
      await this.page.getByRole('button', { name: 'Checkout' }).click();
      await expect(this.page).toHaveURL(/checkout-step-one/);
    });
  }

  /**
   * Verifies if the item is listed in the cart.
   * @param items - Item name or array of item names to check if they are listed in the cart
   */
  async checkIfItemListed(items: Item | Item[]): Promise<void> {
    await test.step(`Verifying if ${items} is listed in Cart`, async () => {
      const itemNameArray = Array.isArray(items) ? items : [items];
      if (itemNameArray.length === 0) {
        throw new Error('Item name is empty');
      }

      for (const currentItem of itemNameArray) {
        const itemToCheck = this.page
          .locator('.cart_item')
          .filter({ has: this.page.getByTestId('inventory-item-name'), visible: true })
          .first();

        await expect(itemToCheck).toBeVisible();
        await expect(itemToCheck.getByTestId('inventory-item-desc')).toHaveText(currentItem.description);
        await expect(itemToCheck.getByTestId('inventory-item-price')).toHaveText(currentItem.price);
      }
    });
  }
}
