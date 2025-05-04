import { test } from '@baseTest';
import { Users } from '@enums';

test('Login', async ({ loginPage, leftMenuPage }) => {
  await loginPage.login(Users.STANDARD_USER);
  await leftMenuPage.selectMenu('Logout');
});
