import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';

test('wrong password shows error', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('wrong_password');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toContainText('do not match');
});

test.describe('after login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  });

  test('products page is shown', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('add item to cart', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('complete an order', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
    await page.locator('#first-name').fill('Anand');
    await page.locator('#last-name').fill('Test');
    await page.locator('#postal-code').fill('411001');
    await page.locator('#continue').click();
    await page.locator('#finish').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});