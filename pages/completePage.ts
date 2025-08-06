import { Page, expect } from '@playwright/test';
import { log } from '../utils/logger';

export class CompletePage {
  private page: Page;
  private completeHeader = '[data-test="title"]';
  private burgerButton = '#react-burger-menu-btn'
  private logoutLink = '[data-test="logout-sidebar-link"]'

  constructor(page: Page) {
    this.page = page;
  }

  async assertOrderComplete(): Promise<void> {
    await expect(this.page.locator(this.completeHeader)).toContainText('Checkout: Complete!');
    log('Order completed successfully');
  }

  async logOut(): Promise<void> {
    await this.page.click(this.burgerButton);
    await this.page.click(this.logoutLink);
    await expect(this.page).toHaveURL('/');
    log('Log out successful');
  }
}
