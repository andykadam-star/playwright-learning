import { test, expect } from '@playwright/test';
import fs from 'fs';

test.skip(!fs.existsSync('sf-auth.json'), 'Salesforce session file not found');
test.use({ storageState: 'sf-auth.json' });

test('salesforce home page opens with saved login', async ({ page }) => {
    await page.goto('https://orgfarm-a315f663bc-dev-ed.develop.lightning.force.com/lightning/page/home');
    await expect(page).toHaveTitle(/Home/, { timeout: 15000 });
});