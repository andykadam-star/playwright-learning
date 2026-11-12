import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItem(itemName: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
  }
}