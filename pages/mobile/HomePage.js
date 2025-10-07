const BasePage = require('../BasePage.js');
const config = require('../../config');

class MobileHomePage extends BasePage {
    constructor(page) {
        super(page);
        
        // Mobile-specific HomePage selectors
        this.hamburgerMenu = this.locator('button[aria-label*="menu"], button:has-text("☰"), .hamburger, [data-testid*="menu"]');
        this.mobileMenu = this.locator('.mobile-menu, .side-menu, .nav-menu, [data-testid="mobile-menu"]');
        
        // Login/logout in mobile context
        this.loginButton = this.locator('text=Login');
        this.loginLink = this.locator('a[href*="login"], a:has-text("Login")');
        
        // Profile menu and logout elements for mobile
        this.profileMenuSelectors = [
            '[data-testid*="user"], [data-testid*="account"], [data-testid*="profile"]',
            '[data-testid*="user-menu"], [data-testid*="profile-menu"]',
            '.user-menu, .account-menu, .profile-menu, .user-dropdown, .profile-dropdown',
            '.user-avatar, .profile-avatar, .user-icon, .profile-icon',
            'button[aria-label*="user"], button[aria-label*="account"], button[aria-label*="profile"]',
            'button[aria-label*="menu"], [role="button"][aria-label*="user"]',
            'text="Profile", text="Account", text="My Account", text="User Menu"',
            'button:has-text("Profile"), button:has-text("Account")',
            '[class*="user"][class*="dropdown"], [class*="profile"][class*="dropdown"]',
            'button[class*="user"], button[class*="profile"], button[class*="account"]',
            '.avatar, .user-initials, [class*="avatar"]',
            '.header-user, .nav-user, .menu-user'
        ];
        
        this.logoutSelectors = [
            'text="Sign out"',
            'text="Logout"', 
            'text="Log out"',
            'text="Sign Out"',
            'text="LogOut"',
            'button:has-text("Sign out")',
            'button:has-text("Logout")',
            'button:has-text("Log out")',
            '[data-testid*="signout"], [data-testid*="sign-out"]',
            '[data-testid*="logout"], [data-testid*="log-out"]',
            'a[href*="logout"], a[href*="signout"]',
            'a:has-text("Sign out"), a:has-text("Logout")',
            '.signout, .sign-out, .logout, .log-out',
            '.logout-btn, .signout-btn',
            '.menu-item:has-text("Sign out"), .menu-item:has-text("Logout")',
            '.dropdown-item:has-text("Sign out"), .dropdown-item:has-text("Logout")',
            'li:has-text("Sign out"), li:has-text("Logout")',
            '[role="menuitem"]:has-text("Sign out"), [role="menuitem"]:has-text("Logout")',
            '[role="button"]:has-text("Sign out"), [role="button"]:has-text("Logout")'
        ];
        
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
        // Open hamburger menu if it exists
        if (await this.isVisibleLocator(this.hamburgerMenu)) {
            console.log('Opening mobile hamburger menu');
            await this.smartClick(this.hamburgerMenu);
            await this.waitForTimeout(1000); // Wait for menu to open
            return true;
        }
        return false;
    }

    async navigateToLogin() {
        // Mobile-specific login navigation
        console.log('Looking for mobile login access...');
        
        // First try to open mobile menu
        const menuOpened = await this.openMobileMenu();
        
        // Look for login options
        if (await this.isVisibleLocator(this.loginLink)) {
            console.log('Using direct login link');
            await this.smartClick(this.loginLink);
        } else if (await this.isVisibleLocator(this.loginButton)) {
            console.log('Using login button');
            await this.smartClick(this.loginButton);
        } else {
            console.log('Navigating directly to login URL');
            const config = require('../../config');
            const baseUrl = config.getBaseUrl();
            await this.page.goto(baseUrl + '/login', {
                waitUntil: 'load',
                timeout: 90000
            });
        }
        
        await this.waitForPageLoad();
    }

    /**
     * Performs logout flow for mobile devices
     * @returns {Promise<void>}
     */
    async logout() {
        // Mobile logout flow using BasePage methods
        console.log('Starting mobile logout process...');
        
        try {
            // First, find and click profile menu
            const profileMenu = await this.findElementByMultipleSelectors(this.profileMenuSelectors);
            console.log('Found profile menu, clicking to open dropdown...');
            
            await this.smartClick(profileMenu);
            await this.waitForTimeout(1500); // Wait for dropdown/menu to fully open
            
            // Now find and click logout button
            const signOutButton = await this.findElementByMultipleSelectors(this.logoutSelectors);
            console.log('Found logout button, clicking...');
            
            await this.smartClick(signOutButton);
            await this.waitForPageLoad();
            
        } catch (error) {
            throw new Error(`Mobile logout failed: ${error.message}`);
        }
    }

    /**
     * Verifies that user is successfully logged in
     * @returns {Promise<boolean>} True if user is logged in
     */
    async verifyUserLoggedIn() {
        // Check for profile menu or absence of login button
        try {
            await this.findElementByMultipleSelectors(this.profileMenuSelectors);
            console.log('User appears to be logged in - profile menu found');
            return true;
        } catch (error) {
            // Check if login button is still visible
            const loginVisible = await this.isVisibleLocator(this.loginButton) || await this.isVisibleLocator(this.loginLink);
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
        await this.waitForLocator(this.loginButton.last(), { state: 'visible', timeout: 10000 });

        const loginVisible = await this.isVisibleLocator(this.loginButton.last()) || await this.isVisibleLocator(this.loginLink);
        
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