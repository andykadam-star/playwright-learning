import { type Page, type Locator } from '@playwright/test';

export const SF_URL = 'https://orgfarm-a315f663bc-dev-ed.develop.lightning.force.com';

export class SfLeadPage {
  readonly page: Page;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly saveButton: Locator;
  readonly leadNameHeader: Locator;
  readonly requiredFieldError: Locator;
  readonly errorDialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.companyInput = page.getByRole('textbox', { name: 'Company' });
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.leadNameHeader = page.locator('lightning-formatted-name');
    this.requiredFieldError = page.getByText('Complete this field.');
    this.errorDialog = page.getByText('We hit a snag.');
  }

  async openNewLeadForm() {
    await this.page.goto(`${SF_URL}/lightning/o/Lead/new`);
  }

  async fillLead(lastName: string, company: string) {
    if (lastName) {
      await this.lastNameInput.fill(lastName);
    }
    await this.companyInput.fill(company);
  }

  async save() {
    await this.saveButton.click();
  }
}