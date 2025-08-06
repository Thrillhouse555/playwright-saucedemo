import { Page, expect } from '@playwright/test';
import { log } from '../utils/logger';

export class LoginPage {
  private page: Page;
  private usernameField = '[data-test="username"]';
  private passwordField = '[data-test="password"]';
  private loginButton = '[data-test="login-button"]';
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
    const header = this.page.locator('[data-test="primary-header"]');
    await expect(header).toContainText('Swag Labs');
    log('Login successful');
  }

  async assertLoginError(expectedMessage: string): Promise<void> {
    const error = this.page.locator(this.errorMessage); 
    await expect(error).toBeVisible();
    await expect(error).toHaveText(expectedMessage);
    log(`Login failed with expected error message: "${expectedMessage}"`);
  }

  async noDetails(): Promise<void> {
    await this.page.click(this.loginButton);
  }
  
}