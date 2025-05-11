import { BasePage } from './basePage';
import { test, Page, expect } from '@baseTest';

export class InventoryPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  /**
   * Verifies if the item is listed in the inventory and proceeds to add to cart.
   * @param itemName - Item name or array of item names
   */
  async addToCart(itemName: string | string[]): Promise<Item[]> {
    return await test.step(`Adding '${itemName}' to cart`, async () => {
      const itemNameArray = Array.isArray(itemName) ? itemName : [itemName];
      if (itemNameArray.length === 0) {
        throw new Error('Item name is empty');
      }

      let itemList: Item[] = [];

      for (const name of itemNameArray) {
        const itemToChose = this.page.locator('.inventory_item').filter({ hasText: name, visible: true }).first();
        let currentItem: Item = {
          name: name,
          description: await itemToChose.getByTestId('inventory-item-desc').innerText(),
          price: await itemToChose.getByTestId('inventory-item-price').innerText()
        };

        const currentCartCount: number = await this.getCartCount();
        await itemToChose.getByRole('button', { name: 'Add to cart' }).click();
        await expect(itemToChose.getByRole('button', { name: 'Remove' })).toBeVisible();
        const newCartCount: number = await this.getCartCount();
        expect(newCartCount).toBe(currentCartCount + 1);
        itemList.push(currentItem);
      }

      return itemList;
    });
  }

  /**
   *
   * @returns {Promise<number>} - Returns the number of items in the cart
   * @description Returns the number of items in the cart.
   */
  async getCartCount(): Promise<number> {
    return await test.step(`Getting cart count`, async () => {
      const cartBadge = this.page.locator('.shopping_cart_badge');
      if (!(await cartBadge.isVisible({ timeout: 2000 }))) {
        return 0;
      }
      const cartCount = await cartBadge.innerText();
      return parseInt(cartCount) || 0;
    });
  }
}
