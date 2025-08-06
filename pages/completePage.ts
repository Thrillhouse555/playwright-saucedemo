import { Page, expect } from '@playwright/test';
import { log } from '../utils/logger';

export class CompletePage {
  private page: Page;
  private completeHeader = '[data-test="title"]';

  constructor(page: Page) {
    this.page = page;
  }

  async assertOrderComplete(): Promise<void> {
    await expect(this.page.locator(this.completeHeader)).toHaveText('Thank you for your order!');
    log('Order completed successfully');
  }
}
