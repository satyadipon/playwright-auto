const BasePage = require('../BasePage.js');
const config = require('../../config');

class MobileLoginPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Mobile-specific login page selectors with fallbacks
        this.emailInputSelectors = [
            'input[type="email"]',
            'input[placeholder*="email"]',
            'input[name*="email"]',
            '#email',
            '[data-testid="email"]',
            '[data-testid*="email"]',
            '.email-input'
        ];
        
        this.passwordInputSelectors = [
            'input[type="password"]',
            'input[placeholder*="password"]',
            'input[name*="password"]',
            '#password',
            '[data-testid="password"]',
            '[data-testid*="password"]',
            '.password-input'
        ];
        
        this.loginButtonSelectors = [
            'button[type="submit"]',
            'button:has-text("Login")',
            'button:has-text("Log in")',
            'button:has-text("Sign in")',
            'button:has-text("Submit")',
            'input[type="submit"]',
            '[role="button"]:has-text("Login")',
            '[role="button"]:has-text("Log in")',
            '[data-testid="login-button"]',
            '[data-testid*="login"]',
            '[data-testid*="submit"]',
            '.login-button',
            '.login-btn',
            '.submit-button',
            '.submit-btn',
            'button[class*="login"]',
            'button[class*="submit"]',
            'form button[type="submit"]',
            'form button:last-child',
            'button[aria-label*="login"]',
            'button[aria-label*="sign in"]'
        ];
        
        // Primary selectors (fallback to element finding if these fail)
        this.emailInput = this.getByRole('textbox', { name: 'Enter your email address' });
        this.passwordInput = this.getByRole('textbox', { name: 'Enter your Password' });
        this.loginButton = this.getByRole('button', { name: 'Login' });
        this.errorMessage = this.locator('text=Login failed. wrong email or password');
        
        // Mobile navigation elements
        this.loginLink = this.locator('text=Login').first();
    }

    async navigateToLogin() {
        try {
            // Try clicking login link first
            await this.smartClick(this.loginLink);
            const loginUrl = `${config.getBaseUrl()}/login`;
            await this.waitForURL( '/login');
            await this.waitForPageLoad();
        } catch (error) {
            // Fallback to direct navigation
            const loginUrl = `${config.getBaseUrl()}/login`;
            await this.waitForPageLoad();
        }
    }

    /**
     * Waits for login form elements to be visible and ready
     * @returns {Promise<void>}
     */
    async waitForLoginForm() {
        // Wait for login form to be visible with mobile-friendly approach
        console.log('Waiting for mobile login form elements...');
        
        try {
            // Try primary selectors first
            await this.waitForLocator(this.emailInput, { state: 'visible', timeout: 5000 });
            return true;
        } catch (error) {
            // Fallback to alternative selectors
            await this.waitForSelector('input[type="email"], input[placeholder*="email"], input[name*="email"]', { timeout: 10000 });
            return true;
        }
    }

    /**
     * Performs login with provided credentials
     * @param {string} email - User email address
     * @param {string} password - User password
     * @returns {Promise<void>}
     */
    async login(email, password) {
        // Wait for form to be ready
        await this.waitForLoginForm();
        
        try {
            console.log('Attempting login with primary selectors...');
            
            // Fill email field
            await this.fillLocator(this.emailInput, email);
            console.log('Email field filled successfully');
            
            // Fill password field
            await this.fillLocator(this.passwordInput, password);
            console.log('Password field filled successfully');
            
            // iOS-specific: Ensure keyboard is dismissed and form is ready
            await this.handleIOSKeyboardAndFocus();
            
            // Wait a moment for UI to stabilize
            await this.waitForTimeout(1000);
            
            // Try clicking login button with enhanced iOS handling
            await this.clickLoginButtonWithIOSFallback();
            
        } catch (error) {
            console.log('Primary selectors failed, trying alternative selectors...');
            console.log('Error details:', error.message);
            
            // Fallback to alternative selectors using BasePage methods
            await this.fillElementByMultipleSelectors(this.emailInputSelectors, email);
            await this.fillElementByMultipleSelectors(this.passwordInputSelectors, password);
            
            // iOS-specific handling for alternative selectors
            await this.handleIOSKeyboardAndFocus();
            
            await this.waitForTimeout(1000);
            
            // Enhanced click with multiple strategies
            await this.clickLoginButtonMultipleStrategies();
        }
        
        // Wait for navigation to complete (successful login redirects to homepage)
        console.log('Waiting for login to complete...');
        await this.waitForURL('/', { timeout: 15000 });
        await this.waitForPageLoad();
        console.log('Login completed successfully');
    }

    /**
     * Handle iOS-specific keyboard and focus issues
     */
    async handleIOSKeyboardAndFocus() {
        try {
            // Blur active element to dismiss keyboard on iOS
            await this.page.evaluate(() => {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            });
            
            // Additional iOS-specific keyboard dismissal
            if (this.isMobileViewport()) {
                // Try to tap somewhere safe to dismiss keyboard
                await this.page.tap('body');
                await this.waitForTimeout(500);
                
                // Scroll to ensure login button is visible
                await this.page.evaluate(() => {
                    const loginButton = document.querySelector('button[type="submit"], button:has-text("Login"), [role="button"]:has-text("Login")');
                    if (loginButton) {
                        loginButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
                await this.waitForTimeout(500);
            }
        } catch (error) {
            console.log('iOS keyboard handling failed, continuing...', error.message);
        }
    }

    /**
     * Click login button with iOS-specific fallbacks
     */
    async clickLoginButtonWithIOSFallback() {
        try {
            // Strategy 1: Normal smart click
            console.log('Trying normal smart click on login button...');
            await this.smartClick(this.loginButton);
            console.log('Smart click successful');
        } catch (error) {
            console.log('Smart click failed, trying alternative click strategies...');
            await this.clickLoginButtonMultipleStrategies();
        }
    }

    /**
     * Multiple click strategies for login button
     */
    async clickLoginButtonMultipleStrategies() {
        const strategies = [
            {
                name: 'Multiple selector click',
                action: () => this.clickElementByMultipleSelectors(this.loginButtonSelectors)
            },
            {
                name: 'Force click',
                action: async () => {
                    const button = await this.findElementByMultipleSelectors(this.loginButtonSelectors);
                    await button.click({ force: true });
                }
            },
            {
                name: 'Tap gesture',
                action: async () => {
                    const button = await this.findElementByMultipleSelectors(this.loginButtonSelectors);
                    const box = await button.boundingBox();
                    if (box) {
                        await this.page.tap(`${box.x + box.width / 2}, ${box.y + box.height / 2}`);
                    }
                }
            },
            {
                name: 'JavaScript click',
                action: async () => {
                    await this.page.evaluate(() => {
                        const selectors = [
                            'button[type="submit"]',
                            'button:has-text("Login")',
                            'input[type="submit"]',
                            '[role="button"]:has-text("Login")',
                            '[data-testid="login-button"]'
                        ];
                        
                        for (const selector of selectors) {
                            const element = document.querySelector(selector);
                            if (element && element.offsetParent !== null) {
                                element.click();
                                return;
                            }
                        }
                        throw new Error('No clickable login button found');
                    });
                }
            },
            {
                name: 'Form submit',
                action: async () => {
                    await this.page.evaluate(() => {
                        const form = document.querySelector('form');
                        if (form) {
                            form.submit();
                        } else {
                            throw new Error('No form found for submission');
                        }
                    });
                }
            }
        ];

        for (const strategy of strategies) {
            try {
                console.log(`Trying strategy: ${strategy.name}`);
                await strategy.action();
                console.log(`Strategy ${strategy.name} succeeded`);
                return; // Success, exit the function
            } catch (error) {
                console.log(`Strategy ${strategy.name} failed:`, error.message);
                await this.waitForTimeout(500); // Small delay between strategies
            }
        }
        
        throw new Error('All login button click strategies failed');
    }

    async loginWithInvalidCredentials(email, password) {
        // Wait for form to be ready
        await this.waitForLoginForm();
        
        try {
            // Try primary selectors first
            await this.fillLocator(this.emailInput, email);
            await this.fillLocator(this.passwordInput, password);
            await this.smartClick(this.loginButton);
        } catch (error) {
            // Fallback to alternative selectors
            await this.fillElementByMultipleSelectors(this.emailInputSelectors, email);
            await this.fillElementByMultipleSelectors(this.passwordInputSelectors, password);
            await this.clickElementByMultipleSelectors(this.loginButtonSelectors);
        }
        
        // Wait a moment for error to appear
        await this.waitForTimeout(2000);
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

    // Mobile-specific methods
    async clearLoginForm() {
        try {
            await this.fillLocator(this.emailInput, '');
            await this.fillLocator(this.passwordInput, '');
        } catch (error) {
            // Use alternative selectors
            await this.fillElementByMultipleSelectors(this.emailInputSelectors, '');
            await this.fillElementByMultipleSelectors(this.passwordInputSelectors, '');
        }
    }

    async isLoginFormVisible() {
        try {
            const emailVisible = await this.isVisibleLocator(this.emailInput);
            const passwordVisible = await this.isVisibleLocator(this.passwordInput);
            const buttonVisible = await this.isVisibleLocator(this.loginButton);
            return emailVisible && passwordVisible && buttonVisible;
        } catch (error) {
            // Check with alternative selectors
            try {
                const emailElement = await this.findElementByMultipleSelectors(this.emailInputSelectors);
                const passwordElement = await this.findElementByMultipleSelectors(this.passwordInputSelectors);
                const buttonElement = await this.findElementByMultipleSelectors(this.loginButtonSelectors);
                
                const emailVisible = await this.isVisibleLocator(emailElement);
                const passwordVisible = await this.isVisibleLocator(passwordElement);
                const buttonVisible = await this.isVisibleLocator(buttonElement);
                
                return emailVisible && passwordVisible && buttonVisible;
            } catch (err) {
                return false;
            }
        }
    }

    // Enhanced mobile input methods
    async focusEmailInput() {
        try {
            const emailElement = await this.findElementByMultipleSelectors(this.emailInputSelectors);
            await emailElement.focus();
        } catch (error) {
            console.log('Could not focus email input:', error.message);
        }
    }

    async focusPasswordInput() {
        try {
            const passwordElement = await this.findElementByMultipleSelectors(this.passwordInputSelectors);
            await passwordElement.focus();
        } catch (error) {
            console.log('Could not focus password input:', error.message);
        }
    }

}

module.exports = MobileLoginPage;