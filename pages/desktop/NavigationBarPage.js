/**
 * Desktop NavigationBar Page Object
 * Handles all navigation bar interactions for desktop including dropdowns, hover effects, and navigation
 */
const BasePage = require('../BasePage');

class DesktopNavigationBarPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Main navigation container
        this.navigationContainer = this.locator('[data-testid="main-navigation"], nav, .navigation-container').first();
        
        // Main navigation items using BasePage locator method
        this.mainNavItems = {
            kitchenEquipment: this.locator('a[href*="/kitchen-equipment"]').filter({ hasText: 'Kitchen Equipment' }).first(),
            refrigeration: this.locator('a[href*="/refrigeration"]').filter({ hasText: 'Refrigeration' }).first(),
            tableware: this.locator('a[href*="/tableware"]').filter({ hasText: 'Tableware' }).first(),
            kitchenSupplies: this.locator('a[href*="/kitchen-supplies"]').filter({ hasText: 'Kitchen Supplies' }).first(),
            hotelSupplies: this.locator('a[href*="/hotel-supplies"]').filter({ hasText: 'Hotel Supplies' }).first(),
            furniture: this.locator('a[href*="/furniture"]').filter({ hasText: 'Furniture' }).first(),
            foodAndBeverage: this.locator('a[href*="/restaurant-food-supplies"]').filter({ hasText: 'Food and Beverage' }).first()
        };
        
        // Secondary navigation items
        this.secondaryNavItems = {
            ourStory: this.locator('a[href*="/pages/about-us"]').filter({ hasText: 'Our Story' }).first(),
            blogs: this.locator('a[href*="/blog"]').filter({ hasText: 'Blogs' }).first(),
            contactUs: this.locator('a[href*="/pages/contact-us"]').filter({ hasText: 'Contact us' }).first()
        };
        
        // Dropdown containers - visible when hovering over main nav items
        this.dropdownContainer = this.locator('.dropdown-content, .mega-menu, [class*="dropdown"], [class*="submenu"]').first();
        
        // Kitchen Equipment dropdown selectors
        this.kitchenEquipmentDropdown = {
            container: this.locator('[data-testid="kitchen-equipment-dropdown"], .kitchen-equipment-dropdown').first(),
            categoryLinks: {
                cookingEquipment: this.locator('a[href="/kitchen-equipment/cooking-equipment"]').first(),
                foodPrepEquipment: this.locator('a[href="/kitchen-equipment/food-preparation-equipment"]').first(),
                preparationTables: this.locator('a[href="/kitchen-equipment/preparation-tables"]').first(),
                coffeeMachines: this.locator('a[href="/kitchen-equipment/commercial-coffee-machines"]').first(),
                commercialOvens: this.locator('a[href="/kitchen-equipment/commercial-ovens"]').first(),
                beverageEquipment: this.locator('a[href="/kitchen-equipment/beverage-equipment"]').first(),
                commercialDishwashers: this.locator('a[href="/kitchen-equipment/commercial-dishwashers"]').first(),
                bakeryEquipment: this.locator('a[href="/kitchen-equipment/bakery-equipment"]').first()
            },
            productImages: {
                gasElectricCookers: this.locator('a[href="/kitchen-equipment/commercial-gas-electric-cookers"]').first(),
                grillsGriddles: this.locator('a[href="/kitchen-equipment/commercial-grills-griddles"]').first(),
                commercialFryers: this.locator('a[href="/kitchen-equipment/commercial-fryers"]').first(),
                salamanders: this.locator('a[href="/kitchen-equipment/salamanders"]').first(),
                pastaCookers: this.locator('a[href="/kitchen-equipment/pasta-cookers"]').first(),
                tiltingBoilingPans: this.locator('a[href="/kitchen-equipment/tilting-boiling-pans"]').first(),
                shawarmaMachines: this.locator('a[href="/kitchen-equipment/shawarma-machines"]').first(),
                waffleMakersCrepe: this.locator('a[href="/kitchen-equipment/waffle-makers-crepe-machines"]').first(),
                foodWarmersDisplays: this.locator('a[href="/kitchen-equipment/food-warmer-displays"]').first(),
                steamers: this.locator('a[href="/kitchen-equipment/steamers"]').first(),
                popcornMachines: this.locator('a[href="/kitchen-equipment/popcorn-machines"]').first()
            }
        };
        
        // Other dropdown configurations...
        // (Continuing with simplified structure for brevity)
        
        // Logo and brand elements
        this.logo = this.locator('a[href="/"]').first();
        this.logoImage = this.locator('img[alt*="Horeca Store"], img[alt*="logo"]').first();
        
        // Search functionality
        this.searchBox = this.locator('input[placeholder*="Search"], textbox[placeholder*="Search"]').first();
        this.searchButton = this.locator('generic:has(input[placeholder*="Search"]) button:has-text("Search"), button:has-text("Search")').first();
        
        // User account elements
        this.loginLink = this.locator(':text("Login")').first();
        this.registerLink = this.locator('text=Register, a[href*="register"], a[href*="signup"], *:has-text("Register")').first();
        
        // Cart and wishlist
        this.wishlistIcon = this.locator('[data-testid="wishlist"], .wishlist, a[href*="wishlist"], img[alt*="wishlist"]').first();
        this.cartIcon = this.locator('[data-testid="cart"], .cart, a[href*="cart"], img[alt*="cart"]').first();
        this.cartCount = this.locator('.cart-count, .cart-badge, [data-testid="cart-count"]').first();
        this.wishlistCount = this.locator('.wishlist-count, .wishlist-badge, [data-testid="wishlist-count"]').first();
    }
    
    /**
     * Navigate to homepage using BasePage method
     */
    async navigateToHomepage() {
        const config = require('../../config');
        await this.navigateTo(config.getBaseUrl());
        await this.waitForPageLoad();
    }
    
    /**
     * Click on logo to go to homepage using BasePage method
     */
    async clickLogo() {
        await this.smartClick(this.logo);
        await this.waitForPageLoad();
    }
    
    /**
     * Hover over a main navigation item to reveal dropdown
     * @param {string} navItem - The navigation item to hover (e.g., 'kitchenEquipment', 'refrigeration')
     */
    async hoverOverNavItem(navItem) {
        const navElement = this.mainNavItems[navItem];
        if (!navElement) {
            throw new Error(`Navigation item '${navItem}' not found. Available items: ${Object.keys(this.mainNavItems).join(', ')}`);
        }
        
        await this.hoverLocator(navElement);
        
        // Wait for dropdown to appear using BasePage method
        await this.waitForTimeout(500); // Small delay for animation
        return this.isDropdownVisible(navItem);
    }
    
    /**
     * Click on a main navigation item using BasePage smart click
     * @param {string} navItem - The navigation item to click
     */
    async clickMainNavItem(navItem) {
        const navElement = this.mainNavItems[navItem];
        if (!navElement) {
            throw new Error(`Navigation item '${navItem}' not found`);
        }
        
        await this.smartClick(navElement);
        await this.waitForPageLoad();
    }
    
    /**
     * Click on a secondary navigation item using BasePage methods
     * @param {string} navItem - The secondary navigation item to click
     */
    async clickSecondaryNavItem(navItem) {
        const navElement = this.secondaryNavItems[navItem];
        if (!navElement) {
            throw new Error(`Secondary navigation item '${navItem}' not found`);
        }
        
        await this.smartClick(navElement);
        await this.waitForPageLoad();
    }
    
    /**
     * Perform search using BasePage methods
     * @param {string} query - The search term to enter
     */
    async performSearch(query) {
        await this.fillLocator(this.searchBox, query);
        await this.pressKey('Enter');
        await this.waitForPageLoad();
    }
    
    /**
     * Click on cart icon using BasePage methods
     */
    async clickCartIcon() {
        await this.smartClick(this.cartIcon);
        await this.waitForPageLoad();
    }
    
    /**
     * Click on wishlist icon using BasePage methods
     */
    async clickWishlistIcon() {
        await this.smartClick(this.wishlistIcon);
        await this.waitForPageLoad();
    }
    
    /**
     * Click on login link using BasePage methods
     */
    async clickLoginLink() {
        await this.smartClick(this.loginLink);
        await this.waitForPageLoad();
    }
    
    /**
     * Verify navigation bar is loaded and visible using BasePage methods
     */
    async verifyNavigationBarLoaded() {
        await this.waitForLocator(this.logo, { state: 'visible', timeout: 10000 });
        
        const verifications = {};
        
        // Check main navigation items using BasePage methods
        for (const [key, locator] of Object.entries(this.mainNavItems)) {
            verifications[`mainNav_${key}`] = await this.isVisibleLocator(locator);
        }
        
        // Check secondary navigation items
        for (const [key, locator] of Object.entries(this.secondaryNavItems)) {
            verifications[`secondaryNav_${key}`] = await this.isVisibleLocator(locator);
        }
        
        // Check other elements using BasePage methods
        verifications.logo = await this.isVisibleLocator(this.logo);
        verifications.searchBox = await this.isVisibleLocator(this.searchBox);
        verifications.cartIcon = await this.isVisibleLocator(this.cartIcon);
        verifications.wishlistIcon = await this.isVisibleLocator(this.wishlistIcon);
        
        return verifications;
    }
    
    /**
     * Get cart count using BasePage methods
     */
    async getCartCount() {
        try {
            return await this.getTextFromLocator(this.cartCount);
        } catch (error) {
            return '0';
        }
    }
    
    /**
     * Get wishlist count using BasePage methods
     */
    async getWishlistCount() {
        try {
            return await this.getTextFromLocator(this.wishlistCount);
        } catch (error) {
            return '0';
        }
    }
    
    /**
     * Check if dropdown is visible by counting visible links
     * @param {string} category - The category to check
     */
    async isDropdownVisible(category) {
        try {
            console.log(`Checking desktop dropdown visibility for category: ${category}`);
            
            // Wait for dropdown to settle using BasePage method
            await this.waitForTimeout(1000);
            
            // Simple and reliable approach: count visible links for the category
            let categoryPath = '';
            switch (category) {
                case 'kitchenEquipment':
                case 'Kitchen Equipment':
                    categoryPath = '/kitchen-equipment/';
                    break;
                case 'refrigeration':
                case 'Refrigeration':
                    categoryPath = '/refrigeration/';
                    break;
                case 'tableware':
                case 'Tableware':
                    categoryPath = '/tableware/';
                    break;
                case 'kitchenSupplies':
                case 'Kitchen Supplies':
                    categoryPath = '/kitchen-supplies/';
                    break;
                case 'hotelSupplies':
                case 'Hotel Supplies':
                    categoryPath = '/hotel-supplies/';
                    break;
                case 'furniture':
                case 'Furniture':
                    categoryPath = '/furniture/';
                    break;
                case 'foodAndBeverage':
                case 'Food and Beverage':
                    categoryPath = '/restaurant-food-supplies/';
                    break;
                default:
                    console.log(`Unknown category: ${category}`);
                    return false;
            }
            
            console.log(`Looking for visible links with path: ${categoryPath}`);
            
            // Count visible links for this category using BasePage locator method
            const visibleLinks = await this.locator(`a[href*="${categoryPath}"]:visible`).count();
            console.log(`Found ${visibleLinks} visible links for ${category}`);
            
            // If we find multiple links for this category, dropdown is visible
            const isVisible = visibleLinks > 1; // More than just the main nav link
            console.log(`Desktop dropdown for ${category} is visible: ${isVisible}`);
            
            return isVisible;
            
        } catch (error) {
            console.error(`Error checking desktop dropdown visibility for ${category}:`, error);
            return false;
        }
    }
    
    /**
     * Get all available navigation items for reference
     */
    getAvailableNavItems() {
        return {
            mainNavItems: Object.keys(this.mainNavItems),
            secondaryNavItems: Object.keys(this.secondaryNavItems),
            kitchenEquipmentDropdown: {
                categoryLinks: Object.keys(this.kitchenEquipmentDropdown.categoryLinks),
                productImages: Object.keys(this.kitchenEquipmentDropdown.productImages)
            }
        };
    }
}

module.exports = DesktopNavigationBarPage;