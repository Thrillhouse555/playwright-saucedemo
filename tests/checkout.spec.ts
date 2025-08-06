import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { CompletePage } from '../pages/completePage';
import { users } from '../utils/config';

test.describe('Checkout E2E Tests', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Standard user - login, add to cart, checkout, then logout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const completePage = new CompletePage(page);
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.assertLoginSuccess();
    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo();
    await checkoutPage.finishCheckout();
    await completePage.assertOrderComplete();
    await completePage.logOut();
  });

  test('Standard user - login, add to cart, remove from cart from inventory page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const completePage = new CompletePage(page);
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.assertLoginSuccess();
    await inventoryPage.addItemToCart();
    await inventoryPage.checkCart('1');
    await inventoryPage.removeItemToCart();
    await inventoryPage.checkCart('');
  });

});
