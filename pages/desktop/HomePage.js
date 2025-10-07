const BasePage = require('../BasePage.js');
const config = require('../../config');

class DesktopHomePage extends BasePage {
    constructor(page) {
        super(page);
        
        // Desktop-specific HomePage selectors
        this.signOutButton = this.locator('text=Sign out');
        this.loginButton = this.locator('text=Login');
        this.logoLink = this.getByRole('link', { name: 'Horeca Store' });
        
        // Desktop-specific selectors (if different from mobile)
        this.navigationMenu = this.locator('nav');
        this.userProfileDropdown = this.locator('.user-dropdown, .profile-dropdown');
    }

    async navigateToHomePage() {
        // Use full URL from config
        await this.navigateTo(config.getBaseUrl());
        await this.waitForPageLoadFast();
    }

    async logout() {
        await this.signOutButton.click();
        await this.waitForPageLoadFast();
        console.log('Logout completed successfully');
    }

    async verifyUserLoggedIn() {
        // Check if sign out button is visible using BasePage method with faster timeout
        await this.waitForLocator(this.signOutButton, { state: 'visible', timeout: 5000 });
        
        const isLoginVisible = await this.isVisibleLocator(this.loginButton);
        if (isLoginVisible) {
            throw new Error('Login button still visible - user not logged in');
        }
    }

    async verifyUserLoggedOut() {
        // Check if login button is visible using BasePage method with faster timeout
        await this.waitForLocator(this.loginButton, { state: 'visible', timeout: 5000 });
        
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

    // Desktop-specific methods
    async isNavigationMenuVisible() {
        return await this.isVisibleLocator(this.navigationMenu);
    }

    async clickLogoLink() {
        await this.smartClick(this.logoLink);
    }
}

module.exports = DesktopHomePage;