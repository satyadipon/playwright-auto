const { test, expect } = require('@playwright/test');
// const { test } = require('../../lamdatest-setup')
const config = require('../../config');
const DesktopLoginPage = require('../../pages/desktop/LoginPage');
const DesktopHomePage = require('../../pages/desktop/HomePage');

test.describe('Desktop Login/Logout Flow', () => {
  /** @type {import('../../pages/desktop/LoginPage')} */
  let loginPage;
  /** @type {import('../../pages/desktop/HomePage')} */
  let homePage;

  test.beforeEach(async ({ page, context }) => {
    loginPage = new DesktopLoginPage(page);
    homePage = new DesktopHomePage(page);
    await loginPage.navigateToLogin();
    // await homePage.handleUSWebsitePopup();
  });

  test('should login and logout successfully with private user on desktop @smoke @desktop @critical', async ({ page }) => {
   const privateUser = config.getCredentials();

    // Verify login form is visible
    expect(await loginPage.isLoginFormVisible()).toBe(true);
    
    // Perform login
    await loginPage.login(privateUser.username, privateUser.password);

    // Verify successful login using desktop page object methods
    await homePage.verifyUserLoggedIn();
    expect(await homePage.isOnHomePage()).toBe(true);

    // Logout using desktop page object
    await homePage.logout();

    // Verify logout using desktop page object methods
    await homePage.verifyUserLoggedOut();
    expect(await homePage.isOnHomePage()).toBe(true);
  });

  // test('should show error message for invalid credentials on desktop', async ({ page }) => {
  //   const invalidUser = { username: 'invalid@test.com', password: 'wrongpassword' };

  //   // Navigate to login page
  //   await loginPage.navigateToLogin();
    
  //   // Verify login form is present
  //   expect(await loginPage.isLoginFormVisible()).toBe(true);
    
  //   // Attempt login with invalid credentials
  //   await loginPage.loginWithInvalidCredentials(invalidUser.username, invalidUser.password);
    
  //   // Verify error message appears and still on login page
  //   await loginPage.verifyLoginError();
  //   expect(await loginPage.isOnLoginPage()).toBe(true);
    
  //   // Take screenshot of error state
  //   await page.screenshot({ path: 'test-output/desktop-login-error.png', fullPage: true });
  // });

  // test('should allow clearing and refilling login form on desktop', async ({ page }) => {
  //   // Navigate to login page
  //   await loginPage.navigateToLogin();
    
  //   // Fill form with some data
  //   await loginPage.fillElementByMultipleSelectors(loginPage.emailInputAlternatives, 'test@example.com');
  //   await loginPage.fillElementByMultipleSelectors(loginPage.passwordInputAlternatives, 'testpassword');
    
  //   // Clear form
  //   await loginPage.clearLoginForm();
    
  //   // Verify form is cleared
  //   const emailValue = await loginPage.getInputValueFromLocator(loginPage.emailInput);
  //   const passwordValue = await loginPage.getInputValueFromLocator(loginPage.passwordInput);
    
  //   expect(emailValue).toBe('');
  //   expect(passwordValue).toBe('');
  // });

  // test('should verify desktop homepage elements are present', async ({ page }) => {
  //   // Verify homepage loads properly
  //   expect(await homePage.isOnHomePage()).toBe(true);
    
  //   // Verify navigation menu is visible (desktop-specific)
  //   expect(await homePage.isNavigationMenuVisible()).toBe(true);
    
  //   // Test logo link functionality
  //   await homePage.clickLogoLink();
  //   expect(await homePage.isOnHomePage()).toBe(true);
    
  //   // Take screenshot for verification
  //   await page.screenshot({ path: 'test-output/desktop-homepage-elements.png', fullPage: true });
  // });
});