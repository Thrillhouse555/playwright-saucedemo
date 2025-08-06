import { Page, expect } from '@playwright/test';
import { log } from '../utils/logger';

export class LoginPage {
  private page: Page;
  private usernameField = '#user-name';
  private passwordField = '#password';
  private loginButton = '#login-button';
  private errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    log('Navigated to login page');
  }

  async login(username: string, password: string): Promise<void> {
    log(`Attempting login as ${username}`);
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  async assertLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    log('Login successful');
  }

  async assertLoginError(): Promise<void> {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    log('Login failed with error');
  }
}