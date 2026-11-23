import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('valid user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(inventoryPage.title).toHaveText('Products');
});

test('wrong password shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_password');

  await expect(loginPage.errorMessage).toContainText('do not match');
});

test('adding items updates the cart count', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItem('sauce-labs-backpack');
  await inventoryPage.addItem('sauce-labs-bike-light');

  await expect(inventoryPage.cartLink).toHaveText('2');
});