// /**
//  * Desktop Navigation Bar Test Suite
//  * Comprehensive tests for desktop navigation bar functionality including dropdowns, hover effects, and navigation
//  */
// const { test, expect } = require('@playwright/test');
// const config = require('../../config');
// const DesktopNavigationBarPage = require('../../pages/desktop/NavigationBarPage');

// test.describe('Desktop Navigation Bar Tests', () => {
//     let navigationBarPage;

//     test.beforeEach(async ({ page }) => {
//         navigationBarPage = new DesktopNavigationBarPage(page);
//         await navigationBarPage.navigateToHomepage();
        
//         // Take screenshot of initial desktop state
//         await page.screenshot({ path: 'test-output/desktop-navigation-initial.png', fullPage: true });
//     });

//     test.describe('Desktop Navigation Bar Structure and Visibility', () => {
//         test('should load and display all desktop navigation elements correctly', async () => {
//             // Verify navigation bar is loaded using desktop page object
//             const verifications = await navigationBarPage.verifyNavigationBarLoaded();
            
//             // Assert main navigation items are visible
//             expect(verifications.mainNav_kitchenEquipment).toBe(true);
//             expect(verifications.mainNav_refrigeration).toBe(true);
//             expect(verifications.mainNav_tableware).toBe(true);
//             expect(verifications.mainNav_kitchenSupplies).toBe(true);
//             expect(verifications.mainNav_hotelSupplies).toBe(true);
//             expect(verifications.mainNav_furniture).toBe(true);
//             expect(verifications.mainNav_foodAndBeverage).toBe(true);
            
//             // Assert secondary navigation items are visible
//             expect(verifications.secondaryNav_ourStory).toBe(true);
//             expect(verifications.secondaryNav_blogs).toBe(true);
//             expect(verifications.secondaryNav_contactUs).toBe(true);
            
//             // Assert other essential elements are visible
//             expect(verifications.logo).toBe(true);
//             expect(verifications.searchBox).toBe(true);
//             expect(verifications.cartIcon).toBe(true);
//             expect(verifications.wishlistIcon).toBe(true);
//         });

//         test('should display logo and navigate to homepage when clicked on desktop', async () => {
//             await navigationBarPage.clickLogo();
            
//             // Verify we're on homepage
//             const currentUrl = await navigationBarPage.getCurrentUrl();
//             const baseUrl = config.getBaseUrl();
//             const isOnHomepage = currentUrl === baseUrl || 
//                                 currentUrl === baseUrl.replace(/\/$/, '') || 
//                                 currentUrl.endsWith('/');
//             expect(isOnHomepage).toBe(true);
//         });

//         test('should have working search functionality on desktop', async () => {
//             const searchTerm = 'commercial oven';
//             await navigationBarPage.performSearch(searchTerm);
            
//             // Wait for search to complete
//             await navigationBarPage.waitForPageLoad();
            
//             // Verify we're on a search results page or have search results
//             const currentUrl = await navigationBarPage.getCurrentUrl();
            
//             // Take screenshot of search results
//             await navigationBarPage.page.screenshot({ path: 'test-output/desktop-search-results.png', fullPage: true });
            
//             // Check if URL contains search-related paths or if we have search results on page
//             const hasSearchResults = currentUrl.includes('search') || 
//                                    currentUrl.includes('oven') || 
//                                    currentUrl.includes('commercial');
            
//             console.log('Search URL:', currentUrl);
//             console.log('Has search results:', hasSearchResults);
            
//             // If URL doesn't show search, check for search results on page
//             if (!hasSearchResults) {
//                 const hasSearchContent = await navigationBarPage.page.locator('text=/search|result|product|oven/i').first().isVisible({ timeout: 5000 }).catch(() => false);
//                 expect(hasSearchContent).toBe(true);
//             } else {
//                 expect(hasSearchResults).toBe(true);
//             }
//         });
//     });

//     test.describe('Desktop Navigation Interactions', () => {
//         test('should navigate to main navigation items on desktop', async () => {
//             const navItems = navigationBarPage.getAvailableNavItems().mainNavItems;
            
//             // Test first few navigation items
//             for (const navItem of navItems.slice(0, 3)) {
//                 await navigationBarPage.clickMainNavItem(navItem);
                
//                 // Verify navigation occurred
//                 const currentUrl = await navigationBarPage.getCurrentUrl();
//                 expect(currentUrl).toBeTruthy();
//                 expect(currentUrl).not.toContain('error');
                
//                 // Take screenshot
//                 await navigationBarPage.page.screenshot({ 
//                     path: `test-output/desktop-nav-${navItem}.png`, 
//                     fullPage: true 
//                 });
                
//                 // Go back to homepage for next iteration
//                 await navigationBarPage.navigateToHomepage();
//             }
//         });

//         test('should navigate to secondary navigation items on desktop', async () => {
//             const secondaryNavItems = navigationBarPage.getAvailableNavItems().secondaryNavItems;
            
//             for (const navItem of secondaryNavItems) {
//                 await navigationBarPage.clickSecondaryNavItem(navItem);
                
//                 // Verify navigation occurred
//                 const currentUrl = await navigationBarPage.getCurrentUrl();
//                 expect(currentUrl).toBeTruthy();
//                 expect(currentUrl).not.toContain('error');
                
//                 // Take screenshot
//                 await navigationBarPage.page.screenshot({ 
//                     path: `test-output/desktop-secondary-nav-${navItem}.png`, 
//                     fullPage: true 
//                 });
                
//                 // Go back to homepage for next iteration
//                 await navigationBarPage.navigateToHomepage();
//             }
//         });

//         test('should display dropdown menus on hover for desktop', async () => {
//             // Test Kitchen Equipment dropdown
//             const kitchenDropdownVisible = await navigationBarPage.hoverOverNavItem('kitchenEquipment');
//             expect(kitchenDropdownVisible).toBe(true);
            
//             // Take screenshot of dropdown
//             await navigationBarPage.page.screenshot({ 
//                 path: 'test-output/desktop-kitchen-equipment-dropdown.png', 
//                 fullPage: true 
//             });
            
//             // Test Refrigeration dropdown
//             const refrigerationDropdownVisible = await navigationBarPage.hoverOverNavItem('refrigeration');
//             expect(refrigerationDropdownVisible).toBe(true);
            
//             // Take screenshot of dropdown
//             await navigationBarPage.page.screenshot({ 
//                 path: 'test-output/desktop-refrigeration-dropdown.png', 
//                 fullPage: true 
//             });
//         });

//         test('should allow interaction with cart and wishlist icons on desktop', async () => {
//             // Get initial counts
//             const initialCartCount = await navigationBarPage.getCartCount();
//             const initialWishlistCount = await navigationBarPage.getWishlistCount();
            
//             console.log('Initial cart count:', initialCartCount);
//             console.log('Initial wishlist count:', initialWishlistCount);
            
//             // Click cart icon
//             await navigationBarPage.clickCartIcon();
            
//             // Verify we're on cart page or cart opened
//             const cartUrl = await navigationBarPage.getCurrentUrl();
//             expect(cartUrl.includes('cart') || cartUrl.includes('checkout')).toBe(true);
            
//             // Take screenshot
//             await navigationBarPage.page.screenshot({ path: 'test-output/desktop-cart-page.png', fullPage: true });
            
//             // Go back to homepage
//             await navigationBarPage.navigateToHomepage();
            
//             // Click wishlist icon
//             await navigationBarPage.clickWishlistIcon();
            
//             // Verify we're on wishlist page
//             const wishlistUrl = await navigationBarPage.getCurrentUrl();
//             expect(wishlistUrl.includes('wishlist') || wishlistUrl.includes('favorites')).toBe(true);
            
//             // Take screenshot
//             await navigationBarPage.page.screenshot({ path: 'test-output/desktop-wishlist-page.png', fullPage: true });
//         });

//         test('should navigate to login page when login link is clicked on desktop', async () => {
//             await navigationBarPage.clickLoginLink();
            
//             // Verify we're on login page
//             const loginUrl = await navigationBarPage.getCurrentUrl();
//             expect(loginUrl.includes('login')).toBe(true);
            
//             // Take screenshot
//             await navigationBarPage.page.screenshot({ path: 'test-output/desktop-login-from-nav.png', fullPage: true });
//         });
//     });
// });