import { BasePage } from './basePage';
import { test, Page, expect } from '@baseTest';
import { CartPage } from './cartPage';

export class CheckoutPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  /**
   *
   * @param items - Item name or array of item names to check if they are listed in the cart
   * @description This method fills the checkout form and clicks on the finish button.
   */
  async doCheckout(items: Item | Item[]): Promise<void> {
    await test.step(`Checking out`, async () => {
      await this.page.getByTestId('firstName').fill('Jack');
      await this.page.getByTestId('lastName').fill('Sparrow');
      await this.page.getByTestId('postalCode').fill('613423');
      await this.page.getByTestId('continue').click();

      await new CartPage(this.page).checkIfItemListed(items);
      await this.page.getByRole('button', { name: 'Finish' }).click();
      await expect(this.page).toHaveURL(/checkout-complete/);
      await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
    });
  }
}
