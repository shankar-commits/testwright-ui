import { Users } from '@enums';
import { BasePage } from './basePage.js';
import { test, Page, expect } from '@baseTest';

export class LoginPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  /**
   * Logs in to the application with the provided username.
   * @param userName - The username to log in with.
   * @description This method fills the login form and clicks on the login button.
   */
  async login(userName: Users): Promise<void> {
    await test.step(`Logging in as '${userName}'`, async () => {
      await this.page.goto('');
      await this.page.getByPlaceholder('Username').fill(userName);
      await this.page.getByPlaceholder('Password').fill('secret_sauce');
      await this.page.getByTestId('login-button').click();
      await expect(this.page.locator('#shopping_cart_container')).toBeVisible();
    });
  }
}
