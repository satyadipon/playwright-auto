// /**
//  * Navigation Bar Test Suite
//  * Comprehensive tests for navigation bar functionality including dropdowns, hover effects, and navigation
//  */
// const { test, expect } = require('@playwright/test');
// const config = require('../config');
// const NavigationBarPage = require('../pages/NavigationBarPage');

// test.describe('Navigation Bar Tests', () => {
//     let navigationBarPage;

//     test.beforeEach(async ({ page }) => {
//         navigationBarPage = new NavigationBarPage(page);
//         await navigationBarPage.navigateTo(config.getBaseUrl());
//         await navigationBarPage.waitForPageLoad();
//     });

//     test.describe('Navigation Bar Structure and Visibility', () => {
//         test('should load and display all navigation elements correctly', async () => {
//             // Verify navigation bar is loaded
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

//         test('should display logo and navigate to homepage when clicked', async () => {
//             await navigationBarPage.clickLogo();
//             expect(await navigationBarPage.verifyUrlContains('/')).toBe(true);
//         });

//         test('should have working search functionality', async () => {
//             const searchTerm = 'commercial oven';
//             await navigationBarPage.performSearch(searchTerm);
            
//             // Verify we're on a search results page or have search results
//             const currentUrl = await navigationBarPage.getCurrentUrl();
//             // Check if URL contains search-related paths or if we have search results on page
//             const hasSearchResults = currentUrl.includes('search') || 
//                                    currentUrl.includes('oven') || 
//                                    currentUrl.includes('commercial') ||
//                                    await navigationBarPage.page.locator('text=/search result|result|product/i').first().isVisible();
//             expect(hasSearchResults).toBe(true);
//         });
//     });
// });