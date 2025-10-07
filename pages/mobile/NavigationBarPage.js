/**
 * Mobile NavigationBar Page Object
 * Handles mobile-specific        // Alternative bottom navigation selectors for flexibility
        this.bottomNavAlternative = {
            home: this.locator('[data-testid="nav-home"], .nav-home, .bottom-nav-home, .footer-nav-home, button[aria-label*="Home"]'),
            menu: this.locator('[data-testid="nav-menu"], .nav-menu, .bottom-nav-menu, .footer-nav-menu, button[aria-label*="Menu"]'),
            search: this.locator('[data-testid="nav-search"], .nav-search, .bottom-nav-search, .footer-nav-search, button[aria-label*="Search"]'),
            cart: this.locator('[data-testid="nav-cart"], .nav-cart, .bottom-nav-cart, .footer-nav-cart, button[aria-label*="Cart"]'),
            profile: this.locator('[data-testid="nav-profile"], .nav-profile, .bottom-nav-profile, .footer-nav-profile, button[aria-label*="Profile")')
        };ion including hamburger menus, mobile dropdowns, and touch interactions
 */
const BasePage = require('../BasePage');

class MobileNavigationBarPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Mobile-specific navigation elements
        this.hamburgerMenu = this.locator('button[aria-label*="menu"], button:has-text("☰"), .hamburger, [data-testid*="menu"]');
        this.mobileMenu = this.locator('.mobile-menu, .side-menu, .nav-menu, [data-testid="mobile-menu"]');
        this.mobileMenuOverlay = this.locator('.menu-overlay, .mobile-overlay, .backdrop');
        this.closeMenuButton = this.locator('button[aria-label*="close"], .close-menu, .menu-close, .close-btn');
        
        // Logo elements
        this.logo = this.locator('a[href="/"]').first();
        this.logoImage = this.locator('img[alt*="Horeca Store"], img[alt*="logo"]').first();
        
        // Mobile navigation items (within hamburger menu)
        this.mobileNavItems = {
            kitchenEquipment: this.locator('a[href*="/kitchen-equipment"]').filter({ hasText: 'Kitchen Equipment' }),
            refrigeration: this.locator('a[href*="/refrigeration"]').filter({ hasText: 'Refrigeration' }),
            tableware: this.locator('a[href*="/tableware"]').filter({ hasText: 'Tableware' }),
            kitchenSupplies: this.locator('a[href*="/kitchen-supplies"]').filter({ hasText: 'Kitchen Supplies' }),
            hotelSupplies: this.locator('a[href*="/hotel-supplies"]').filter({ hasText: 'Hotel Supplies' }),
            furniture: this.locator('a[href*="/furniture"]').filter({ hasText: 'Furniture' }),
            foodAndBeverage: this.locator('a[href*="/restaurant-food-supplies"]').filter({ hasText: 'Food and Beverage' })
        };
        
        // Mobile secondary navigation
        this.mobileSecondaryNavItems = {
            ourStory: this.locator('a[href*="/pages/about-us"]').filter({ hasText: 'Our Story' }),
            blogs: this.locator('a[href*="/blog"]').filter({ hasText: 'Blogs' }),
            contactUs: this.locator('a[href*="/pages/contact-us"]').filter({ hasText: 'Contact us' })
        };
        
        // Mobile search functionality
        this.mobileSearchToggle = this.locator('button[aria-label*="search"], .search-toggle, [data-testid="search-toggle"]');
        this.mobileSearchBox = this.locator('input[placeholder*="Search"], textbox[placeholder*="Search"]');
        this.mobileSearchButton = this.locator('button:has-text("Search"), .search-btn');
        this.mobileSearchContainer = this.locator('.mobile-search, .search-container, [data-testid="mobile-search"]');
        
        // Mobile user account elements
        this.mobileLoginLink = this.locator('text="Login"').first();
        this.mobileRegisterLink = this.locator('text="Register", a[href*="register"], a[href*="signup"]');
        
        // Mobile cart and wishlist (usually in top bar or hamburger menu)
        this.mobileWishlistIcon = this.locator('[data-testid="wishlist"], .wishlist, a[href*="wishlist"], img[alt*="wishlist"]');
        this.mobileCartIcon = this.locator('[data-testid="cart"], .cart, a[href*="cart"], img[alt*="cart"]');
        this.mobileCartCount = this.locator('.cart-count, .cart-badge, [data-testid="cart-count"]');
        this.mobileWishlistCount = this.locator('.wishlist-count, .wishlist-badge, [data-testid="wishlist-count"]');
        
        // Mobile category expand/collapse buttons
        this.categoryExpandButtons = this.locator('.category-expand, .expand-btn, [aria-expanded]');

        // Bottom Navigation Elements (Bottom Navigation Bar)
        this.bottomNav = {
            homeNavButton: this.locator('a:has-text("Home")'),
            menuNavButton: this.getByRole('button', { name: 'Menu' }),
            searchNavButton: this.getByRole('button', { name: 'Search' }),
            cartNavButton: this.locator('a:has-text("Cart")'),
            profileNavButton: this.getByRole('button', { name: 'Profile' })
        };

        // Bottom navigation container
        this.bottomNavContainer = this.locator('.bottom-nav, .mobile-bottom-nav, .footer-nav, [data-testid="bottom-navigation"]');
    }
    
    /**
     * Navigate to homepage using page.goto with full URL
     */
    async navigateToHomepage() {
        const config = require('../../config');
        const baseUrl = config.getBaseUrl();
        await this.page.goto(baseUrl + '/', {
            waitUntil: 'load',
            timeout: 90000
        });
        await this.waitForPageLoad();
    }
    
    /**
     * Open mobile hamburger menu
     */
    async openMobileMenu() {
        if (await this.isVisibleLocator(this.hamburgerMenu)) {
            console.log('Opening mobile hamburger menu');
            await this.smartClick(this.hamburgerMenu);
            await this.waitForTimeout(1000); // Wait for menu animation
            return true;
        }
        return false;
    }
    
    /**
     * Close mobile menu
     */
    async closeMobileMenu() {
        // Try close button first
        if (await this.isVisibleLocator(this.closeMenuButton)) {
            await this.smartClick(this.closeMenuButton);
        } else if (await this.isVisibleLocator(this.mobileMenuOverlay)) {
            // Click on overlay to close
            await this.smartClick(this.mobileMenuOverlay);
        } else {
            // Click hamburger again to close
            if (await this.isVisibleLocator(this.hamburgerMenu)) {
                await this.smartClick(this.hamburgerMenu);
            }
        }
        await this.waitForTimeout(500);
    }
    
    /**
     * Click on logo to go to homepage using BasePage method
     */
    async clickLogo() {
        await this.smartClick(this.logo);
        await this.waitForPageLoad();
    }
    
    /**
     * Click on a main navigation item in mobile menu
     * @param {string} navItem - The navigation item to click
     */
    async clickMobileNavItem(navItem) {
        // Open menu first
        await this.openMobileMenu();
        
        const navElement = this.mobileNavItems[navItem];
        if (!navElement) {
            throw new Error(`Mobile navigation item '${navItem}' not found. Available items: ${Object.keys(this.mobileNavItems).join(', ')}`);
        }
        
        // Wait for element to be visible in menu
        await this.waitForElementStable(navElement);
        await this.smartClick(navElement);
        await this.waitForPageLoad();
    }
    
    /**
     * Click on a secondary navigation item in mobile menu
     * @param {string} navItem - The secondary navigation item to click
     */
    async clickMobileSecondaryNavItem(navItem) {
        // Open menu first
        await this.openMobileMenu();
        
        const navElement = this.mobileSecondaryNavItems[navItem];
        if (!navElement) {
            throw new Error(`Mobile secondary navigation item '${navItem}' not found`);
        }
        
        await this.waitForElementStable(navElement);
        await this.smartClick(navElement);
        await this.waitForPageLoad();
    }
    
    /**
     * Expand a category in mobile menu (if collapsible)
     * @param {string} category - The category to expand
     */
    async expandMobileCategory(category) {
        await this.openMobileMenu();
        
        // Look for expand button next to category
        const categoryElement = this.mobileNavItems[category];
        if (categoryElement) {
            // Look for expand button near the category
            const expandButton = this.locator(`[aria-expanded="false"]`).near(categoryElement).first();
            if (await this.isVisibleLocator(expandButton)) {
                await this.smartClick(expandButton);
                await this.waitForTimeout(500); // Wait for expansion animation
                return true;
            }
        }
        return false;
    }
    
    /**
     * Open mobile search
     */
    async openMobileSearch() {
        if (await this.isVisibleLocator(this.mobileSearchToggle)) {
            await this.smartClick(this.mobileSearchToggle);
            await this.waitForElementStable(this.mobileSearchBox);
            return true;
        }
        return false;
    }
    
    /**
     * Perform search on mobile using BasePage methods
     * @param {string} query - The search term to enter
     */
    async performMobileSearch(query) {
        // Try to open search if needed
        await this.openMobileSearch();
        
        // Fill search box
        if (await this.isVisibleLocator(this.mobileSearchBox)) {
            await this.fillLocator(this.mobileSearchBox, query);
            
            // Try search button or Enter key
            if (await this.isVisibleLocator(this.mobileSearchButton)) {
                await this.smartClick(this.mobileSearchButton);
            } else {
                await this.pressKey('Enter');
            }
        } else {
            // Fallback: look in mobile menu
            await this.openMobileMenu();
            const searchInMenu = this.locator('input[placeholder*="Search"]').first();
            if (await this.isVisibleLocator(searchInMenu)) {
                await this.fillLocator(searchInMenu, query);
                await this.pressKey('Enter');
            }
        }
        
        await this.waitForPageLoad();
    }
    
    /**
     * Click on mobile cart icon using BasePage methods
     */
    async clickMobileCartIcon() {
        if (await this.isVisibleLocator(this.mobileCartIcon)) {
            await this.smartClick(this.mobileCartIcon);
        } else {
            // Look in mobile menu
            await this.openMobileMenu();
            const cartInMenu = this.locator('a[href*="cart"], .cart').first();
            if (await this.isVisibleLocator(cartInMenu)) {
                await this.smartClick(cartInMenu);
            }
        }
        await this.waitForPageLoad();
    }
    
    /**
     * Click on mobile wishlist icon using BasePage methods
     */
    async clickMobileWishlistIcon() {
        if (await this.isVisibleLocator(this.mobileWishlistIcon)) {
            await this.smartClick(this.mobileWishlistIcon);
        } else {
            // Look in mobile menu
            await this.openMobileMenu();
            const wishlistInMenu = this.locator('a[href*="wishlist"], .wishlist').first();
            if (await this.isVisibleLocator(wishlistInMenu)) {
                await this.smartClick(wishlistInMenu);
            }
        }
        await this.waitForPageLoad();
    }
    
    /**
     * Verify mobile navigation bar is loaded and visible using BasePage methods
     */
    async verifyMobileNavigationBarLoaded() {
        const verifications = {};
        
        // Check essential mobile elements
        verifications.logo = await this.isVisibleLocator(this.logo);
        verifications.hamburgerMenu = await this.isVisibleLocator(this.hamburgerMenu);
        
        // Check if we can open menu and see nav items
        const menuOpened = await this.openMobileMenu();
        verifications.canOpenMenu = menuOpened;
        
        if (menuOpened) {
            // Check main navigation items in mobile menu
            for (const [key, locator] of Object.entries(this.mobileNavItems)) {
                verifications[`mobileNav_${key}`] = await this.isVisibleLocator(locator.first());
            }
            
            // Close menu after verification
            await this.closeMobileMenu();
        }
        
        return verifications;
    }
    
    /**
     * Get mobile cart count using BasePage methods
     */
    async getMobileCartCount() {
        try {
            if (await this.isVisibleLocator(this.mobileCartCount)) {
                return await this.getTextFromLocator(this.mobileCartCount);
            }
            return '0';
        } catch (error) {
            return '0';
        }
    }
    
    /**
     * Get mobile wishlist count using BasePage methods
     */
    async getMobileWishlistCount() {
        try {
            if (await this.isVisibleLocator(this.mobileWishlistCount)) {
                return await this.getTextFromLocator(this.mobileWishlistCount);
            }
            return '0';
        } catch (error) {
            return '0';
        }
    }
    
    /**
     * Check if mobile menu is currently open
     */
    async isMobileMenuOpen() {
        return await this.isVisibleLocator(this.mobileMenu) || 
               await this.isVisibleLocator(this.mobileMenuOverlay);
    }
    
    /**
     * Get all available mobile navigation items for reference
     */
    getAvailableMobileNavItems() {
        return {
            mobileNavItems: Object.keys(this.mobileNavItems),
            mobileSecondaryNavItems: Object.keys(this.mobileSecondaryNavItems)
        };
    }

    // Bottom Navigation Methods

    /**
     * Click on Home bottom navigation button
     */
    async clickBottomHome() {
        await this.smartClick(this.bottomNav.homeNavButton);
        await this.waitForPageLoad();
    }

    /**
     * Click on Menu bottom navigation button (opens hamburger menu)
     */
    async clickBottomMenu() {
            await this.smartClick(this.bottomNav.menuNavButton);
        await this.waitForTimeout(1000); // Wait for menu to open
    }

    /**
     * Click on Search bottom navigation button
     */
    async clickBottomSearch() {
            await this.smartClick(this.bottomNav.searchNavButton);
        await this.waitForPageLoad();
    }

    /**
     * Click on Cart bottom navigation button
     */
    async clickBottomCart() {
            await this.smartClick(this.bottomNav.cartNavButton);
        await this.waitForPageLoad();
    }

    /**
     * Click on Profile bottom navigation button (navigates to login if not logged in)
     */
    async clickBottomProfile() {
            await this.smartClick(this.bottomNav.profileNavButton);
        await this.waitForPageLoad();
    }

    /**
     * Navigate to login using bottom profile button
     */
    async navigateToLoginViaBottom() {
        await this.clickBottomProfile();
    }

    /**
     * Verify bottom navigation is visible and functional
     */
    async verifyBottomNavigation() {
        const verifications = {};
        
        // Check if bottom navigation container is visible
        verifications.bottomContainer = await this.isVisibleLocator(this.bottomNavContainer);
        
        // Check individual bottom navigation buttons
        for (const [key, locator] of Object.entries(this.bottomNav)) {
            try {
                verifications[`bottom_${key}`] = await this.isVisibleLocator(locator);
            } catch (error) {
                // Try alternative selectors
                const altKey = key.replace('NavButton', '');
                if (this.bottomNavAlternative[altKey]) {
                    verifications[`bottom_${key}_alt`] = await this.isVisibleLocator(this.bottomNavAlternative[altKey]);
                }
            }
        }
        
        return verifications;
    }

    /**
     * Get active bottom navigation item (if highlighted/selected)
     */
    async getActiveBottomNavItem() {
        const activeSelectors = [
            '.bottom-nav .active',
            '.footer-nav .active',
            '.mobile-bottom-nav .selected',
            '[data-testid*="nav"][aria-selected="true"]',
            '.nav-item.active'
        ];

        for (const selector of activeSelectors) {
            try {
                const activeElement = this.locator(selector);
                if (await this.isVisibleLocator(activeElement)) {
                    return await this.getTextFromLocator(activeElement);
                }
            } catch (error) {
                continue;
            }
        }
        
        return null;
    }

    /**
     * Check if bottom navigation is visible
     */
    async isBottomNavigationVisible() {
        return await this.isVisibleLocator(this.bottomNavContainer) ||
               await this.isVisibleLocator(this.bottomNav.homeNavButton);
    }
}

module.exports = MobileNavigationBarPage;