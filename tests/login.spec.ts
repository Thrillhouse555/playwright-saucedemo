import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { users } from '../utils/config';

test.describe('Login E2E Tests', () => {

  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Standard user - login, add to cart, checkout', async ({ page }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.assertLoginSuccess();
  });

  test('Locked out user - show login error', async ({ page }) => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await loginPage.assertLoginError('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Wrong password - show login error', async ({ page }) => {
    await loginPage.login(users.incorrectPasswordUser.username, users.incorrectPasswordUser.password);
    await loginPage.assertLoginError('Epic sadface: Username and password do not match any user in this service');
  });

  test('Problem User - show login error', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(users.problemUser.username, users.problemUser.password);
    await inventoryPage.checkItemImage('[data-test="inventory-item-sauce-labs-backpack-img"]', '/static/media/sl-404.168b1cce.jpg');
  });

  test('Standard user - login, log out', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.assertLoginSuccess();
    await inventoryPage.logOut();
  });

  test('Standard user - no login details', async ({ page }) => {
    await loginPage.noDetails();
    await loginPage.assertLoginError('Epic sadface: Username is required');
  });

});
