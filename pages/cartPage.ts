import { Page } from '@playwright/test';
import { log } from '../utils/logger';

export class CartPage {
  private page: Page;
  private checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click(this.checkoutButton);
    log('Proceeded to checkout');
  }
}
