import { test, expect } from '@playwright/test';

test('cart updates when items are added and removed', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add two items
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('2');

  // Remove one item from the cart
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');

  // Logout
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});