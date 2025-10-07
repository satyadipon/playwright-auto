/**
 * Base Page class with common page operations
 * Provides unified interface for both desktop and mobile page interactions
 */
class BasePage {
    constructor(page) {
        if (!page) {
            throw new Error('Page instance is required in constructor.');
        }
        this.page = page;
    }

    async navigateTo(url) {
        try {
            console.log(`Navigating to: ${url}`);
            await this.page.goto(url, {
                waitUntil: 'load',  // Use 'load' for BrowserStack compatibility
                timeout: 90000
            });
            console.log(`Successfully navigated to: ${url}`);
        } catch (error) {
            console.log(`Navigation failed with load strategy for: ${url}`);
            throw new Error(`Navigation failed: ${error.message}`);
        }
    }

    async waitForPageLoad() {
        try {
            console.log('Waiting for page to load...');
            
            // First wait for DOM to be ready
            await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
            console.log('DOM content loaded');
            
            // Then wait for network to be idle (with reduced timeout)
            // try {
            //     await this.page.waitForLoadState('networkidle', { timeout: 10000 });
            //     console.log('Network idle achieved');
            // } catch (networkError) {
            //     console.log('Network idle timeout, but continuing...', networkError.message);
            // }
            
            // Reduced delay to ensure interactive elements are ready
            await this.page.waitForTimeout(500);
            console.log('Page load completed');
            
        } catch (error) {
            console.log('Page load wait failed:', error.message);
            // Continue anyway as the page might still be functional
        }
    }

    async waitForPageLoadFast() {
        try {
            console.log('Waiting for page to load (fast mode)...');
            
            // Wait for DOM to be ready with shorter timeout
            await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
            console.log('DOM content loaded');
            
            // Skip networkidle for faster execution
            await this.page.waitForTimeout(300);
            console.log('Fast page load completed');
            
        } catch (error) {
            console.log('Fast page load wait failed:', error.message);
            // Continue anyway as the page might still be functional
        }
    }

    async click(selector) {
        await this.page.click(selector);
    }

    async clickLocator(locator) {
        await locator.click();
    }

    async fill(selector, text) {
        await this.page.fill(selector, text);
    }

    async fillLocator(locator, text) {
        await locator.fill(text);
    }

    async getText(selector) {
        return await this.page.textContent(selector);
    }

    async getTextFromLocator(locator) {
        return await locator.textContent();
    }

    async isVisible(selector) {
        return await this.page.isVisible(selector);
    }

    async isVisibleLocator(locator) {
        return await locator.isVisible();
    }

    async waitForSelector(selector, options = {}) {
        return await this.page.waitForSelector(selector, options);
    }

    async waitForLocator(locator, options = {}) {
        return await locator.waitFor(options);
    }

    async getTitle() {
        return await this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async getAttribute(selector, attribute) {
        return await this.page.getAttribute(selector, attribute);
    }

    async getAttributeFromLocator(locator, attribute) {
        return await locator.getAttribute(attribute);
    }

    async selectOption(selector, option) {
        await this.page.selectOption(selector, option);
    }

    async selectOptionFromLocator(locator, option) {
        await locator.selectOption(option);
    }

    async check(selector) {
        await this.page.check(selector);
    }

    async checkLocator(locator) {
        await locator.check();
    }

    async uncheck(selector) {
        await this.page.uncheck(selector);
    }

    async uncheckLocator(locator) {
        await locator.uncheck();
    }

    async isChecked(selector) {
        return await this.page.isChecked(selector);
    }

    async isCheckedLocator(locator) {
        return await locator.isChecked();
    }

    async hover(selector) {
        await this.page.hover(selector);
    }

    async hoverLocator(locator) {
        await locator.hover();
    }

    async scrollIntoView(selector) {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    async scrollIntoViewLocator(locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    async getInnerText(selector) {
        return await this.page.innerText(selector);
    }

    async getInnerTextFromLocator(locator) {
        return await locator.innerText();
    }

    async getInputValue(selector) {
        return await this.page.inputValue(selector);
    }

    async getInputValueFromLocator(locator) {
        return await locator.inputValue();
    }

    async pressKey(key) {
        await this.page.keyboard.press(key);
    }

    async type(text, options = {}) {
        await this.page.keyboard.type(text, options);
    }

    async waitForTimeout(timeout) {
        await this.page.waitForTimeout(timeout);
    }

    async reload() {
        await this.page.reload();
    }

    async goBack() {
        await this.page.goBack();
    }

    async goForward() {
        await this.page.goForward();
    }

    // Locator helpers
    locator(selector) {
        return this.page.locator(selector);
    }

    getByRole(role, options = {}) {
        return this.page.getByRole(role, options);
    }

    getByText(text, options = {}) {
        return this.page.getByText(text, options);
    }

    getByLabel(text, options = {}) {
        return this.page.getByLabel(text, options);
    }

    getByPlaceholder(text, options = {}) {
        return this.page.getByPlaceholder(text, options);
    }

    getByTestId(testId) {
        return this.page.getByTestId(testId);
    }

    // Wait helpers
    async waitForURL(url, options = {}) {
        await this.page.waitForURL(url, options);
    }

    async waitForFunction(fn, options = {}) {
        return await this.page.waitForFunction(fn, options);
    }

    // Get page object
    getPage() {
        return this.page;
    }

    // Enhanced interaction methods for robust element finding

    /**
     * Find element using multiple selector strategies
     * @param {Array<string>} selectors - Array of selectors to try
     * @param {Object} options - Options for waiting
     * @returns {Locator} First visible locator found
     */
    async findElementByMultipleSelectors(selectors, options = { timeout: 5000 }) {
        for (const selector of selectors) {
            try {
                const element = this.page.locator(selector).first();
                if (await element.isVisible({ timeout: 500 })) {
                    return element;
                }
            } catch (error) {
                // Continue to next selector
                continue;
            }
        }
        throw new Error(`No element found with any of the provided selectors: ${selectors.join(', ')}`);
    }

    /**
     * Click element with retry and multiple selector strategies
     * @param {Array<string>} selectors - Array of selectors to try
     * @param {Object} options - Click options
     */
    async clickElementByMultipleSelectors(selectors, options = {}) {
        const element = await this.findElementByMultipleSelectors(selectors);
        await this.clickLocator(element);
    }

    /**
     * Fill input element using multiple selector strategies
     * @param {Array<string>} selectors - Array of selectors to try
     * @param {string} text - Text to fill
     */
    async fillElementByMultipleSelectors(selectors, text) {
        const element = await this.findElementByMultipleSelectors(selectors);
        await this.fillLocator(element, text);
    }

    /**
     * Get viewport information
     * @returns {Object} Viewport size
     */
    getViewportSize() {
        return this.page.viewportSize();
    }

    /**
     * Check if running on mobile viewport
     * @returns {boolean} True if mobile viewport
     */
    isMobileViewport() {
        const viewport = this.getViewportSize();
        return viewport && viewport.width < 768; // Common mobile breakpoint
    }

    /**
     * Wait for element to be in stable state (not animating)
     * @param {Locator} locator - Element locator
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForElementStable(locator, timeout = 1000) {
        await this.waitForTimeout(200); // Reduced initial wait
        await locator.waitFor({ state: 'visible', timeout });
        await this.waitForTimeout(200); // Reduced stability wait
    }

    /**
     * Smart click that handles different element states
     * @param {Locator} locator - Element locator
     * @param {Object} options - Click options
     */
    async smartClick(locator, options = {}) {
        await this.waitForElementStable(locator);
        await this.scrollIntoViewLocator(locator);
        await this.clickLocator(locator);
    }

    /**
     * Set UAE region preferences in browser storage
     * This helps websites remember the user's region choice
     */
    async setUAERegionPreferences() {
        try {
            // Set localStorage values that might prevent popup
            await this.page.evaluate(() => {
                localStorage.setItem('region', 'UAE');
                localStorage.setItem('country', 'AE');
                localStorage.setItem('locale', 'en-AE');
                localStorage.setItem('currency', 'AED');
                localStorage.setItem('user_region', 'UAE');
                localStorage.setItem('preferred_region', 'UAE');
                localStorage.setItem('site_region', 'UAE');
                localStorage.setItem('dismiss_region_popup', 'true');
                localStorage.setItem('region_popup_dismissed', 'true');
                localStorage.setItem('user_country_choice', 'AE');
            });

            // Set sessionStorage values
            await this.page.evaluate(() => {
                sessionStorage.setItem('region', 'UAE');
                sessionStorage.setItem('country', 'AE');
                sessionStorage.setItem('user_region', 'UAE');
                sessionStorage.setItem('dismiss_region_popup', 'true');
            });

            console.log('UAE region preferences set in browser storage');
            return true;
        } catch (error) {
            console.log('Error setting UAE region preferences:', error.message);
            return false;
        }
    }

    /**
     * Set cookies to indicate UAE region preference
     */
    async setUAERegionCookies() {
        try {
            const cookies = [
                { name: 'region', value: 'UAE', domain: '.horecastore.com', path: '/' },
                { name: 'country', value: 'AE', domain: '.horecastore.com', path: '/' },
                { name: 'locale', value: 'en-AE', domain: '.horecastore.com', path: '/' },
                { name: 'currency', value: 'AED', domain: '.horecastore.com', path: '/' },
                { name: 'user_region', value: 'UAE', domain: '.horecastore.com', path: '/' },
                { name: 'preferred_region', value: 'UAE', domain: '.horecastore.com', path: '/' },
                { name: 'dismiss_region_popup', value: 'true', domain: '.horecastore.com', path: '/' },
                { name: 'region_popup_dismissed', value: 'true', domain: '.horecastore.com', path: '/' },
                { name: 'user_country_choice', value: 'AE', domain: '.horecastore.com', path: '/' }
            ];

            await this.page.context().addCookies(cookies);
            console.log('UAE region cookies set successfully');
            return true;
        } catch (error) {
            console.log('Error setting UAE region cookies:', error.message);
            return false;
        }
    }

    /**
     * Initialize page with UAE region settings
     * Call this before navigating to any page
     */
    async initializeUAERegion() {
        console.log('Initializing UAE region settings...');
        await this.setUAERegionCookies();
        await this.setUAERegionPreferences();
        
        // Also set geolocation programmatically
        await this.page.context().setGeolocation({ longitude: 55.2708, latitude: 25.2048 });
        console.log('UAE region initialization complete');
    }

    /**
     * Handle US Website Switch Popup
     * Checks if the popup exists and clicks "No" button to stay on UAE site
     */
    async handleUSWebsitePopup() {
        try {
            // Wait briefly for popup to appear
            // await this.page.waitForTimeout(2000);
            
            // Check if the popup heading exists
            const popupHeading = this.page.locator('h2:has-text("Switch to US Website?")');
            const isPopupVisible = await popupHeading.isVisible({ timeout: 3000 });
            
            if (isPopupVisible) {
                console.log('US Website popup detected - clicking "No" to stay on UAE site');
                
                // Click the "No, stay on UAE site" button
                const noButton = this.page.locator('button:has-text("No, stay on UAE site")');
                await noButton.click();
                
                // Wait for popup to disappear
                // await popupHeading.waitFor({ state: 'detached', timeout: 5000 });
                console.log('US Website popup dismissed successfully');
                
                // Set region preferences after dismissing popup
                // await this.setUAERegionPreferences();
                
                return true;
            } else {
                console.log('No US Website popup detected');
                return false;
            }
        } catch (error) {
            console.log('Error handling US Website popup:', error.message);
            return false;
        }
    }

    /**
     * Alternative popup handling using multiple selector strategies
     * More robust fallback method
     */
    async handleUSWebsitePopupRobust() {
        try {
            console.log('Checking for US Website popup...');
            
            // Multiple strategies to detect and handle the popup
            const popupSelectors = [
                'button:has-text("No, stay on UAE site")',
                'button[text*="No, stay"]',
                '[role="dialog"] button:has-text("No")',
                'div:has-text("Switch to US Website?") ~ * button:has-text("No")'
            ];
            
            for (const selector of popupSelectors) {
                try {
                    const element = this.page.locator(selector);
                    const isVisible = await element.isVisible({ timeout: 2000 });
                    
                    if (isVisible) {
                        console.log(`Found popup using selector: ${selector}`);
                        await element.click();
                        console.log('Clicked "No" button successfully');
                        
                        // Wait a bit for popup to close
                        await this.page.waitForTimeout(1000);
                        return true;
                    }
                } catch (selectorError) {
                    // Continue to next selector
                    continue;
                }
            }
            
            console.log('No US Website popup found with any selector');
            return false;
            
        } catch (error) {
            console.log('Error in robust popup handling:', error.message);
            return false;
        }
    }
}

module.exports = BasePage;
