import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const invalidLogins = [
  { name: 'wrong password',  username: 'standard_user',   password: 'wrong_password', error: 'do not match' },
  { name: 'locked out user', username: 'locked_out_user', password: 'secret_sauce',   error: 'locked out' },
  { name: 'empty username',  username: '',                password: 'secret_sauce',   error: 'Username is required' },
  { name: 'empty password',  username: 'standard_user',   password: '',               error: 'Password is required' },
  { name: 'unknown user',    username: 'unknown_user',    password: 'secret_sauce',   error: 'do not match' },
];

for (const data of invalidLogins) {
  test(`login fails: ${data.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(data.username, data.password);

    await expect(loginPage.errorMessage).toContainText(data.error);
  });
}