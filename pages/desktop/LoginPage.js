const BasePage = require('../BasePage.js');
const config = require('../../config');

class DesktopLoginPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Desktop-specific login page selectors
        this.emailInput = this.getByRole('textbox', { name: 'Enter your email address' });
        this.passwordInput = this.getByRole('textbox', { name: 'Enter your Password' });
        this.loginButton = this.getByRole('button', { name: 'Login' });
        this.errorMessage = this.locator('text=Login failed. wrong email or password');
        this.loginLink = this.locator('text=Login').first();
        
    }

    async navigateToLogin() {
        try {
            // Click login link from header using BasePage method
            await this.smartClick(this.loginLink);
            // Use full URL with current config
            const loginUrl = `${config.getBaseUrl()}/login`;
            await this.waitForURL('/login');
            await this.waitForPageLoad();
        } catch (error) {
            // Fallback: navigate directly to login URL with full path
            const loginUrl = `${config.getBaseUrl()}/login`;
            await this.navigateTo(loginUrl);
            await this.waitForPageLoad();
        }
    }

    async login(email, password) {
            await this.fillLocator(this.emailInput, email);
            await this.fillLocator(this.passwordInput, password);
            await this.smartClick(this.loginButton);
        
        // Wait for navigation to complete (successful login redirects to homepage)
        // await this.waitForURL('/', { timeout: 15000 });
        await this.waitForPageLoad();
    }

    async loginWithInvalidCredentials(email, password) {
        try {
            // Fill credentials and attempt login using BasePage methods
            await this.fillLocator(this.emailInput, email);
            await this.fillLocator(this.passwordInput, password);
            await this.smartClick(this.loginButton);
        } catch (error) {
            // Fallback to alternative selectors
            await this.fillElementByMultipleSelectors(this.emailInputAlternatives, email);
            await this.fillElementByMultipleSelectors(this.passwordInputAlternatives, password);
            await this.clickElementByMultipleSelectors(this.loginButtonAlternatives);
        }
    }

    async verifyLoginError() {
        // Verify error message appears using BasePage method
        await this.waitForLocator(this.errorMessage, { state: 'visible', timeout: 5000 });
        
        // Verify still on login page
        const url = await this.getCurrentUrl();
        if (!url.includes('/login')) {
            throw new Error('Expected to stay on login page after failed login');
        }
    }

    async isOnLoginPage() {
        const url = await this.getCurrentUrl();
        return url.includes('/login');
    }

    // Desktop-specific methods
    async clearLoginForm() {
        await this.fillLocator(this.emailInput, '');
        await this.fillLocator(this.passwordInput, '');
    }

    async isLoginFormVisible() {
        const emailVisible = await this.isVisibleLocator(this.emailInput);
        const passwordVisible = await this.isVisibleLocator(this.passwordInput);
        const buttonVisible = await this.isVisibleLocator(this.loginButton);
        
        return emailVisible && passwordVisible && buttonVisible;
    }
}

module.exports = DesktopLoginPage;