import { BasePage } from './basePage';
import { test, Page, expect } from '@baseTest';

export class LeftMenuPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  async selectMenu(menuItem: 'All Items' | 'About' | 'Logout' | 'Reset App State'): Promise<void> {
    await test.step(`Selecting ${menuItem} from left panel`, async () => {
      await this.page.getByRole('button', { name: 'Open Menu' }).click();
      await this.page.getByRole('link', { name: menuItem }).click();
      await expect(this.page.locator('.bm-menu')).not.toBeVisible();
    });
  }
}
