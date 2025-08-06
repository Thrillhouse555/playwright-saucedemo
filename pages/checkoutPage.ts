import { Page } from '@playwright/test';
import { log } from '../utils/logger';

export class CheckoutPage {
  private page: Page;
  private firstName = '#first-name';
  private lastName = '#last-name';
  private zipCode = '#postal-code';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInfo(): Promise<void> {
    await this.page.fill(this.firstName, 'John');
    await this.page.fill(this.lastName, 'Doe');
    await this.page.fill(this.zipCode, '12345');
    await this.page.click(this.continueButton);
    log('Filled out checkout form');
  }

  async finishCheckout(): Promise<void> {
    await this.page.click(this.finishButton);
    log('Completed checkout');
  }
}
