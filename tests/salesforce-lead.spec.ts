import { test, expect } from '@playwright/test';
import fs from 'fs';
import { SfLeadPage } from '../pages/SfLeadPage';

test.skip(!fs.existsSync('sf-auth.json'), 'Salesforce session file not found');
test.use({ storageState: 'sf-auth.json' });
test.setTimeout(90000);

test('create a new lead with last name and company', async ({ page }) => {
  const leadPage = new SfLeadPage(page);
  const leadName = `Demo Lead ${Date.now()}`;

  await leadPage.openNewLeadForm();
  await leadPage.fillLead(leadName, 'Test Company Pvt Ltd');
  await leadPage.save();

  await expect(leadPage.leadNameHeader).toHaveText(leadName, { timeout: 15000 });
});

test('lead cannot be saved without last name', async ({ page }) => {
  const leadPage = new SfLeadPage(page);

  await leadPage.openNewLeadForm();
  await leadPage.fillLead('', 'Test Company Pvt Ltd');
  await leadPage.save();

  await expect(leadPage.requiredFieldError).toBeVisible({ timeout: 15000 });
  await expect(leadPage.errorDialog).toBeVisible();
});