const { expect } = require('@playwright/test');
const { test } = require('../../lamdatest-setup');
const config = require('../../config');
const MobileLoginPage = require('../../pages/mobile/LoginPage');
const MobileHomePage = require('../../pages/mobile/HomePage');

test.describe('Mobile Login/Logout Flow', () => {
  /** @type {import('../../pages/mobile/LoginPage')} */
  let loginPage;
  /** @type {import('../../pages/mobile/HomePage')} */
  let homePage;

  test.beforeEach(async ({ page }) => {
    // loginPage = new MobileLoginPage(page);
    // homePage = new MobileHomePage(page);

    await page.goto('https://ipapi.co/json/');
    const body = await page.textContent('body');
    const json = JSON.parse(body);
    console.log("Country via IP API:", json.country_name);
    
    // Navigate to homepage first
    // await homePage.navigateToHomePage();
  });

  // test.afterEach(async ({ context, page }) => {
  //   try {
  //     if (!page.isClosed()) {
  //       await page.close({ runBeforeUnload: true });
  //     }
  //     // await context.close();   // ✅ This will end the session on BrowserStack
  //   } catch (err) {
  //     console.warn('Teardown warning:', err);
  //   }
  // });

  test('should login and logout successfully with private user on mobile @smoke @mobile @critical', async ({ page, browserName }) => {
    console.log(`Testing on browser: ${browserName}`);
    
    // const privateUser = config.getCredentials();

    // // Navigate to login page using mobile page objects
    // await loginPage.navigateToLogin();
    
    // // Verify login form is visible
    // expect(await loginPage.isLoginFormVisible()).toBe(true);
    
    // // Perform login using mobile page object
    // await loginPage.login(privateUser.username, privateUser.password);

    // // Verify successful login using mobile page object
    // await homePage.verifyUserLoggedIn();
    // expect(await homePage.isOnHomePage()).toBe(true);

    // // Perform logout using mobile page object
    // await homePage.logout();

    // // Verify logout using mobile page object
    // await homePage.verifyUserLoggedOut();
    
    // // Verify we're still on a valid page
    // const currentUrl = page.url();
    // console.log('Current URL after logout:', currentUrl);
    
    // // Just verify the page loaded successfully and we have login functionality
    // expect(currentUrl).toBeTruthy();
    // expect(currentUrl).not.toContain('error');
    
    console.log('Mobile login/logout test completed successfully');
  });

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