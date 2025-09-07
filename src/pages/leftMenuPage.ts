import { BasePage } from './basePage.js';
import { test, Page, expect } from '@baseTest';

export class LeftMenuPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  /**
   *
   * @param menuItem - Menu item to select from the left panel
   * @description This method selects a menu item from the left panel.
   */
  async selectMenu(menuItem: 'All Items' | 'About' | 'Logout' | 'Reset App State'): Promise<void> {
    await test.step(`Selecting ${menuItem} from left panel`, async () => {
      await this.page.getByRole('button', { name: 'Open Menu' }).click();
      await this.page.getByRole('link', { name: menuItem }).click();
      await expect(this.page.locator('.bm-menu')).not.toBeVisible();
    });
  }
}
