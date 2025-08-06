import { Page } from '@playwright/test';
import { log } from '../utils/logger';

export class InventoryPage {
  private page: Page;
  private cartIcon = '.shopping_cart_link';
  private addBackpackButton = '#add-to-cart-sauce-labs-backpack';

  constructor(page: Page) {
    this.page = page;
  }

  async addItemToCart(): Promise<void> {
    await this.page.click(this.addBackpackButton);
    log('Added item to cart');
  }

  async goToCart(): Promise<void> {
    await this.page.click(this.cartIcon);
    log('Navigated to cart');
  }
}
