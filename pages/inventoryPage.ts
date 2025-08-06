import { Page, expect } from '@playwright/test';
import { log } from '../utils/logger';

export class InventoryPage {
  private page: Page;
  private cartIcon = '.shopping_cart_link';
  private addBackpackButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private burgerButton = '#react-burger-menu-btn'
  private logoutLink = '[data-test="logout-sidebar-link"]'

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

  async checkItemImage(expectedItem: string, expectedUrl: string): Promise<void> {
    await expect(this.page.locator(expectedItem)).toHaveAttribute('src', expectedUrl);
    log('Checked item image')
  }

  async logOut(): Promise<void> {
    await this.page.click(this.burgerButton);
    await this.page.click(this.logoutLink);
    await expect(this.page).toHaveURL('/');
    log('Log out successful');
  }

}
