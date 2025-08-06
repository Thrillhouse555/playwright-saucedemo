import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { CompletePage } from '../pages/completePage';
import { users } from '../utils/config';

test.describe('Basic E2E Tests', () => {
  test('Standard user - login, add to cart, checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const completePage = new CompletePage(page);

    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.assertLoginSuccess();

    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();

    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo();
    await checkoutPage.finishCheckout();

    await completePage.assertOrderComplete();
  });

  test('Locked out user - should show login error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await loginPage.assertLoginError();
  });
});
