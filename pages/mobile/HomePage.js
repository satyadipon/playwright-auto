const BasePage = require('../BasePage.js');
const MobileNavigationBarPage = require('./NavigationBarPage.js');
const config = require('../../config');

class MobileHomePage extends BasePage {
    constructor(page) {
        super(page);
        this.navigationBar = new MobileNavigationBarPage(page);
        
        // Mobile-specific HomePage selectors
        this.hamburgerMenu = this.locator('button[aria-label*="menu"], button:has-text("☰"), .hamburger, [data-testid*="menu"]');
        this.mobileMenu = this.locator('.mobile-menu, .side-menu, .nav-menu, [data-testid="mobile-menu"]');
        
        // Login/logout in mobile context
        this.loginButton = this.getByRole('button', { name: 'Login' });
        this.logoutButton = this.getByText('Sign out').last();
        this.loginLink = this.locator('a[href*="login"], a:has-text("Login")');
        
        
        // Mobile-specific elements
        this.logoLink = this.getByRole('link', { name: 'Horeca Store' });
    }

    async navigateToHomePage() {
        // Use full URL for LambdaTest compatibility
        console.log(config.getBaseUrl());        
        const baseUrl = config.getBaseUrl();
        await this.navigateTo(baseUrl + '/');
        await this.waitForPageLoad();
    }

    async openMobileMenu() {
        return await this.navigationBar.openMobileMenu();
    }

    async navigateToLogin() {
        // Use navigation bar for mobile login navigation
        await this.navigationBar.clickMobileLoginLink();
    }

    /**
     * Performs logout flow for mobile devices
     * @returns {Promise<void>}
     */
    async logout() {
            await this.smartClick(this.navigationBar.bottomNav.profileNavButton);
            await this.smartClick(this.logoutButton);
            await this.waitForPageLoad();
    }

    /**
     * Verifies that user is successfully logged in
     * @returns {Promise<boolean>} True if user is logged in
     */
    async verifyUserLoggedIn() {
        // Check for profile menu or absence of login button
        try {
            await this.findElementByMultipleSelectors(this.profileMenu, { timeout: 10000 });
            console.log('User appears to be logged in - profile menu found');
            return true;
        } catch (error) {
            // Check if login button is still visible
            const loginVisible = await this.isVisibleLocator(this.loginButton)
            if (loginVisible) {
                throw new Error('Login button still visible - user not logged in');
            }
            return true;
        }
    }

    /**
     * Verifies that user is successfully logged out
     * @returns {Promise<boolean>} True if user is logged out
     */
    async verifyUserLoggedOut() {
        // Check if login button is visible
        await this.waitForLocator(this.loginButton, { state: 'visible', timeout: 10000 });

        const loginVisible = await this.isVisibleLocator(this.loginButton.last())
        
        if (!loginVisible) {
            throw new Error('Login button not visible - user might still be logged in');
        }
        
        console.log('User successfully logged out - login option visible');
        return true;
    }

    async isOnHomePage() {
        const url = await this.getCurrentUrl();
        const baseUrl = config.getBaseUrl();
        return url === baseUrl || url === baseUrl.replace(/\/$/, '') || url.endsWith('/');
    }

    // Mobile-specific methods
    async isMobileMenuVisible() {
        return await this.isVisibleLocator(this.mobileMenu);
    }

    async closeMobileMenu() {
        // Look for close button or click outside menu
        const closeButton = this.locator('button[aria-label*="close"], .close-menu, .menu-close');
        if (await this.isVisibleLocator(closeButton)) {
            await this.smartClick(closeButton);
        } else {
            // Click outside menu area (on body)
            await this.page.mouse.click(10, 10);
        }
        await this.waitForTimeout(500);
    }
}

module.exports = MobileHomePage;