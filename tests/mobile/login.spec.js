const { expect } = require('@playwright/test');
const { test } = require('../../lamdatest-setup');
const config = require('../../config');
const MobileLoginPage = require('../../pages/mobile/LoginPage');
const MobileHomePage = require('../../pages/mobile/HomePage');
const MobileNavigationBarPage = require('../../pages/mobile/NavigationBarPage');


test.describe('Mobile Login/Logout Flow', () => {
  /** @type {import('../../pages/mobile/LoginPage')} */
  let loginPage;
  /** @type {import('../../pages/mobile/HomePage')} */
  let homePage;
  /** @type {import('../../pages/mobile/NavigationBarPage')} */
  let navigationBar;


  test.beforeEach(async ({ page }) => {
    loginPage = new MobileLoginPage(page);
    homePage = new MobileHomePage(page);
    navigationBar = new MobileNavigationBarPage(page);

    // Navigate to homepage first
    await homePage.navigateToHomePage();
  });

  test('should login and logout successfully with private user on mobile @smoke @mobile @critical', async ({ page, browserName }) => {
    console.log(`Testing on browser: ${browserName}`);
    
    const privateUser = config.getCredentials();

    // Navigate to login page using mobile page objects (this will use bottom navigation)
    await loginPage.navigateToLogin();
    
    // Verify login form is visible
    expect(await loginPage.isLoginFormVisible()).toBe(true);
    
    // Perform login using mobile page object
    await loginPage.login(privateUser.username, privateUser.password);

    // Verify successful login using mobile page object
    await homePage.verifyUserLoggedIn();
    expect(await homePage.isOnHomePage()).toBe(true);

    // Perform logout using mobile page object
    await homePage.logout();

    // Verify logout using mobile page object
    await homePage.verifyUserLoggedOut();
    
    console.log('Mobile login/logout test completed successfully');
  });

  // test('should verify bottom navigation functionality @mobile @navigation', async ({ page }) => {
  //   // Verify bottom navigation is visible
  //   const bottomVerification = await navigationBar.verifyBottomNavigation();
  //   console.log('Bottom navigation verification:', bottomVerification);
    
  //   // Test different bottom navigation buttons
  //   console.log('Testing bottom Home button...');
  //   await navigationBar.clickBottomHome();
  //   expect(await homePage.isOnHomePage()).toBe(true);
    
  //   console.log('Testing bottom Search button...');
  //   await navigationBar.clickBottomSearch();
  //   // Add search page verification if needed
    
  //   console.log('Testing bottom Cart button...');
  //   await navigationBar.clickBottomCart();
  //   // Add cart page verification if needed
    
  //   console.log('Testing bottom Profile button (should navigate to login)...');
  //   await navigationBar.clickBottomProfile();
  //   // Should navigate to login page
  //   expect(await loginPage.isOnLoginPage()).toBe(true);
    
  //   console.log('Bottom navigation test completed successfully');
  // });

  // test('should show error message for invalid credentials on mobile', async ({ page }) => {
  //   const invalidUser = { username: 'invalid@test.com', password: 'wrongpassword' };

  //   // Navigate to login
  //   await homePage.navigateToLogin();

  //   // Wait for login form
  //   await loginPage.waitForLoginForm();
    
  //   // Attempt login with invalid credentials
  //   await loginPage.loginWithInvalidCredentials(invalidUser.username, invalidUser.password);
    
  //   // Verify error message appears and still on login page
  //   await loginPage.verifyLoginError();
  //   expect(await loginPage.isOnLoginPage()).toBe(true);
  // });

  // test('should verify mobile navigation elements are present', async ({ page }) => {
  //   // Verify homepage loads properly
  //   expect(await homePage.isOnHomePage()).toBe(true);
    
  //   // Take screenshot for verification
  //   await homePage.takeHomepageScreenshot(`${prefix}-navigation-check`);
    
  //   // Test mobile menu functionality if available
  //   const menuOpened = await homePage.openMobileMenu();
  //   if (menuOpened) {
  //     await page.screenshot({ path: `test-output/${prefix}-mobile-menu-open.png`, fullPage: true });
  //     console.log(`${prefix}: Mobile menu opened successfully`);
  //   } else {
  //     console.log(`${prefix}: No mobile menu found or menu opening failed`);
  //   }
  // });
});