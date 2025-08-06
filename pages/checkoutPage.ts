import { Page } from '@playwright/test';
import { log } from '../utils/logger';

export class CheckoutPage {
  private page: Page;
  private firstName = '[data-test="firstName"]';
  private lastName = '[data-test="firstName"]';
  private postalCode = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInfo(): Promise<void> {
    await this.page.fill(this.firstName, 'John');
    await this.page.fill(this.lastName, 'Doe');
    await this.page.fill(this.postalCode, '12345');
    await this.page.click(this.continueButton);
    log('Filled out checkout form');
  }

  async finishCheckout(): Promise<void> {
    await this.page.click(this.finishButton);
    log('Completed checkout');
  }
}
