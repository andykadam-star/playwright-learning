import { test, expect } from '@playwright/test';
import fs from 'fs';

const SF_URL = 'https://orgfarm-a315f663bc-dev-ed.develop.lightning.force.com';

test.skip(!fs.existsSync('sf-auth.json'), 'Salesforce session file not found');
test.use({ storageState: 'sf-auth.json' });
test.setTimeout(90000);

test('create a new lead with last name and company', async ({ page }) => {
  const leadName = `Demo Lead ${Date.now()}`;

  await page.goto(`${SF_URL}/lightning/o/Lead/new`);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(leadName);
  await page.getByRole('textbox', { name: 'Company' }).fill('Test Company Pvt Ltd');
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  await expect(page.locator('lightning-formatted-name')).toHaveText(leadName, { timeout: 15000 });
});

test('lead cannot be saved without last name', async ({ page }) => {
  await page.goto(`${SF_URL}/lightning/o/Lead/new`);
  await page.getByRole('textbox', { name: 'Company' }).fill('Test Company Pvt Ltd');
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  await expect(page.getByText('Complete this field.')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('We hit a snag.')).toBeVisible();
});