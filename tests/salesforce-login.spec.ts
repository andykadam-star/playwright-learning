import { test, expect } from '@playwright/test';

test.use({ storageState: 'sf-auth.json' });

test('salesforce home page opens with saved login', async ({ page }) => {
    await page.goto('https://orgfarm-a315f663bc-dev-ed.develop.lightning.force.com/lightning/page/home');
    await expect(page).toHaveTitle(/Home/, { timeout: 15000 });
});