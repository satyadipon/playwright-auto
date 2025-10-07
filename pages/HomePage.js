const BasePage = require('./BasePage.js');
const config = require('../config');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        
        // HomePage selectors - based on manual testing
        this.signOutButton = this.locator('text=Sign out');
        this.loginButton = this.locator('text=Login');
        this.logoLink = this.getByRole('link', { name: 'Horeca Store' });
    }

    async navigateToHomePage() {
        // Use full URL from config
        await this.navigateTo(config.getBaseUrl());
    }

    async logout() {
        // First, try to find and click profile menu if it exists
        const profileMenuSelectors = [
          '[data-testid*="user"], [data-testid*="account"], [data-testid*="profile"]',
          '.user-menu, .account-menu, .profile-menu, .user-dropdown, .profile-dropdown',
          'button[aria-label*="user"], button[aria-label*="account"], button[aria-label*="profile"]',
          'text="Profile", text="Account", text="My Account"',
          '.avatar, .user-initials, [class*="avatar"]'
        ];
        
        let profileMenu = null;
        for (const selector of profileMenuSelectors) {
          const element = this.page.locator(selector).first();
          if (await element.isVisible()) {
            const text = await element.textContent();
            // Skip if it contains "Login" text (we want logged-in user menu)
            if (!text || !text.toLowerCase().includes('login')) {
              profileMenu = element;
              console.log('Found profile menu for logout:', text);
              break;
            }
          }
        }
        
        // Click profile menu to open dropdown if found
        if (profileMenu) {
          await profileMenu.click();
          await this.page.waitForTimeout(1000); // Wait for dropdown to open
        }
        
        // Now look for logout button (either directly visible or in opened menu)
        const logoutSelectors = [
          'text="Sign out"',
          'text="Logout"', 
          'text="Log out"',
          'button:has-text("Sign out")',
          'button:has-text("Logout")',
          '[data-testid*="signout"], [data-testid*="logout"]',
          'a[href*="logout"]',
          '.signout, .logout',
          '.menu-item:has-text("Sign out"), .dropdown-item:has-text("Logout")',
          '[role="menuitem"]:has-text("Sign out")'
        ];
        
        let signOutButton = null;
        for (const selector of logoutSelectors) {
          const element = this.page.locator(selector).first();
          if (await element.isVisible()) {
            signOutButton = element;
            console.log('Found logout button:', await element.textContent());
            break;
          }
        }
        
        if (!signOutButton) {
          throw new Error('Logout button not found in profile menu or main interface');
        }
        
        // Click sign out button
        await signOutButton.click();
        
        // Wait for logout to complete (stays on homepage)
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyUserLoggedIn() {
        // Check if sign out button is visible using BasePage method
        await this.waitForLocator(this.signOutButton, { state: 'visible' });
        
        const isLoginVisible = await this.isVisibleLocator(this.loginButton);
        if (isLoginVisible) {
            throw new Error('Login button still visible - user not logged in');
        }
    }

    async verifyUserLoggedOut() {
        // Check if login button is visible using BasePage method
        await this.waitForLocator(this.loginButton, { state: 'visible' });
        
        const isSignOutVisible = await this.isVisibleLocator(this.signOutButton);
        if (isSignOutVisible) {
            throw new Error('Sign out button still visible - user not logged out');
        }
    }

    async isOnHomePage() {
        const url = await this.getCurrentUrl();
        const baseUrl = config.getBaseUrl();
        return url === baseUrl || url === baseUrl.replace(/\/$/, '') || url.endsWith('/');
    }
}

module.exports = HomePage;