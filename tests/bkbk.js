/**
 * Navigation Bar Test Suite
 * Comprehensive tests for navigation bar functionality including dropdowns, hover effects, and navigation
 */
const { test, expect } = require('@playwright/test');
const config = require('../config');
const NavigationBarPage = require('../pages/NavigationBarPage');

test.describe('Navigation Bar Tests', () => {
    let navigationBarPage;

    test.beforeEach(async ({ page }) => {
        navigationBarPage = new NavigationBarPage(page);
        await navigationBarPage.navigateTo(config.getBaseUrl());
        await navigationBarPage.waitForPageLoad();
    });

    test.describe('Navigation Bar Structure and Visibility', () => {
        test('should load and display all navigation elements correctly', async () => {
            // Verify navigation bar is loaded
            const verifications = await navigationBarPage.verifyNavigationBarLoaded();
            
            // Assert main navigation items are visible
            expect(verifications.mainNav_kitchenEquipment).toBe(true);
            expect(verifications.mainNav_refrigeration).toBe(true);
            expect(verifications.mainNav_tableware).toBe(true);
            expect(verifications.mainNav_kitchenSupplies).toBe(true);
            expect(verifications.mainNav_hotelSupplies).toBe(true);
            expect(verifications.mainNav_furniture).toBe(true);
            expect(verifications.mainNav_foodAndBeverage).toBe(true);
            
            // Assert secondary navigation items are visible
            expect(verifications.secondaryNav_ourStory).toBe(true);
            expect(verifications.secondaryNav_blogs).toBe(true);
            expect(verifications.secondaryNav_contactUs).toBe(true);
            
            // Assert other essential elements are visible
            expect(verifications.logo).toBe(true);
            expect(verifications.searchBox).toBe(true);
            expect(verifications.cartIcon).toBe(true);
            expect(verifications.wishlistIcon).toBe(true);
        });

        test('should display logo and navigate to homepage when clicked', async () => {
            await navigationBarPage.clickLogo();
            expect(await navigationBarPage.verifyUrlContains('/')).toBe(true);
        });

        test('should have working search functionality', async () => {
            const searchTerm = 'commercial oven';
            await navigationBarPage.performSearch(searchTerm);
            
            // Verify we're on a search results page or have search results
            const currentUrl = await navigationBarPage.getCurrentUrl();
            // Check if URL contains search-related paths or if we have search results on page
            const hasSearchResults = currentUrl.includes('search') || 
                                   currentUrl.includes('oven') || 
                                   currentUrl.includes('commercial') ||
                                   await page.locator('text=/search result|result|product/i').first().isVisible();
            expect(hasSearchResults).toBe(true);
        });
    });

//     test.describe('Main Navigation Dropdown Functionality', () => {
//         test('should show Kitchen Equipment dropdown on hover with categories and product images', async () => {
//             // Hover over Kitchen Equipment
//             await navigationBarPage.hoverOverNavItem('kitchenEquipment');
            
//             // Verify dropdown is visible
//             expect(await navigationBarPage.isDropdownVisible('kitchenEquipment')).toBe(true);
            
//             // Verify dropdown content
//             const dropdownContent = await navigationBarPage.verifyDropdownContent('kitchenEquipment');
            
//             // Assert category links are visible
//             expect(dropdownContent.categoryLinks.cookingEquipment).toBe(true);
//             expect(dropdownContent.categoryLinks.foodPreparationEquipment).toBe(true);
//             expect(dropdownContent.categoryLinks.preparationTables).toBe(true);
//             expect(dropdownContent.categoryLinks.coffeeMachines).toBe(true);
//             expect(dropdownContent.categoryLinks.commercialOvens).toBe(true);
//             expect(dropdownContent.categoryLinks.beverageEquipment).toBe(true);
//             expect(dropdownContent.categoryLinks.commercialDishwashers).toBe(true);
//             expect(dropdownContent.categoryLinks.bakeryEquipment).toBe(true);
            
//             // Assert product images are visible
//             expect(dropdownContent.productImages.commercialGasElectricCookers).toBe(true);
//             expect(dropdownContent.productImages.commercialGrillsGriddles).toBe(true);
//             expect(dropdownContent.productImages.commercialFryers).toBe(true);
//             expect(dropdownContent.productImages.salamanders).toBe(true);
//         });

//         test('should show Refrigeration dropdown on hover with categories and product images', async () => {
//             // Hover over Refrigeration
//             await navigationBarPage.hoverOverNavItem('refrigeration');
            
//             // Verify dropdown is visible
//             expect(await navigationBarPage.isDropdownVisible('refrigeration')).toBe(true);
            
//             // Verify dropdown content
//             const dropdownContent = await navigationBarPage.verifyDropdownContent('refrigeration');
            
//             // Assert category links are visible
//             expect(dropdownContent.categoryLinks.commercialRefrigerators).toBe(true);
//             expect(dropdownContent.categoryLinks.commercialFreezers).toBe(true);
//             expect(dropdownContent.categoryLinks.iceMachines).toBe(true);
//             expect(dropdownContent.categoryLinks.iceCreamMachines).toBe(true);
            
//             // Assert product images are visible
//             expect(dropdownContent.productImages.workTopRefrigerators).toBe(true);
//             expect(dropdownContent.productImages.undercounterRefrigerators).toBe(true);
//             expect(dropdownContent.productImages.prepTableRefrigerators).toBe(true);
//             expect(dropdownContent.productImages.displayRefrigerators).toBe(true);
//         });

//         test('should show Tableware dropdown on hover with categories', async () => {
//             // Hover over Tableware
//             await navigationBarPage.hoverOverNavItem('tableware');
            
//             // Verify dropdown is visible
//             expect(await navigationBarPage.isDropdownVisible('tableware')).toBe(true);
            
//             // Verify dropdown content
//             const dropdownContent = await navigationBarPage.verifyDropdownContent('tableware');
            
//             // Assert category links are visible
//             expect(dropdownContent.categoryLinks.crockery).toBe(true);
//             expect(dropdownContent.categoryLinks.serveware).toBe(true);
//             expect(dropdownContent.categoryLinks.tabletopAccessories).toBe(true);
//             expect(dropdownContent.categoryLinks.melamineDinnerware).toBe(true);
//             expect(dropdownContent.categoryLinks.tableSignage).toBe(true);
//             expect(dropdownContent.categoryLinks.cutlery).toBe(true);
//         });

//         test('should show Kitchen Supplies dropdown on hover with categories', async () => {
//             // Hover over Kitchen Supplies
//             await navigationBarPage.hoverOverNavItem('kitchenSupplies');
            
//             // Verify dropdown is visible
//             expect(await navigationBarPage.isDropdownVisible('kitchenSupplies')).toBe(true);
            
//             // Verify dropdown content
//             const dropdownContent = await navigationBarPage.verifyDropdownContent('kitchenSupplies');
            
//             // Assert category links are visible
//             expect(dropdownContent.categoryLinks.cookware).toBe(true);
//             expect(dropdownContent.categoryLinks.storageTransportation).toBe(true);
//             expect(dropdownContent.categoryLinks.pizzaEquipmentSupplies).toBe(true);
//             expect(dropdownContent.categoryLinks.foodStorageContainers).toBe(true);
//             expect(dropdownContent.categoryLinks.chefKnives).toBe(true);
//             expect(dropdownContent.categoryLinks.bakingToolsSupplies).toBe(true);
//         });
//     });

//     test.describe('Navigation Link Functionality', () => {
//         test('should navigate to correct pages when main navigation items are clicked', async () => {
//             // Test Kitchen Equipment navigation
//             await navigationBarPage.clickMainNavItem('kitchenEquipment');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Refrigeration navigation
//             await navigationBarPage.clickMainNavItem('refrigeration');
//             expect(await navigationBarPage.verifyUrlContains('/refrigeration')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Tableware navigation
//             await navigationBarPage.clickMainNavItem('tableware');
//             expect(await navigationBarPage.verifyUrlContains('/tableware')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Kitchen Supplies navigation
//             await navigationBarPage.clickMainNavItem('kitchenSupplies');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-supplies')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Hotel Supplies navigation
//             await navigationBarPage.clickMainNavItem('hotelSupplies');
//             expect(await navigationBarPage.verifyUrlContains('/hotel-supplies')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Furniture navigation
//             await navigationBarPage.clickMainNavItem('furniture');
//             expect(await navigationBarPage.verifyUrlContains('/furniture')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Food and Beverage navigation
//             await navigationBarPage.clickMainNavItem('foodAndBeverage');
//             expect(await navigationBarPage.verifyUrlContains('/restaurant-food-supplies')).toBe(true);
//         });

//         test('should navigate to correct pages when secondary navigation items are clicked', async () => {
//             // Test Our Story navigation
//             await navigationBarPage.clickSecondaryNavItem('ourStory');
//             expect(await navigationBarPage.verifyUrlContains('/pages/about-us')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Blogs navigation
//             await navigationBarPage.clickSecondaryNavItem('blogs');
//             expect(await navigationBarPage.verifyUrlContains('/blog')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Contact Us navigation
//             await navigationBarPage.clickSecondaryNavItem('contactUs');
//             expect(await navigationBarPage.verifyUrlContains('/pages/contact-us')).toBe(true);
//         });
//     });

//     test.describe('Dropdown Category Link Navigation', () => {
//         test('should navigate to correct category pages when Kitchen Equipment dropdown links are clicked', async () => {
//             // Test Cooking Equipment category
//             await navigationBarPage.clickDropdownCategoryLink('kitchenEquipment', 'cookingEquipment');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment/cooking-equipment')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Food Preparation Equipment category
//             await navigationBarPage.clickDropdownCategoryLink('kitchenEquipment', 'foodPreparationEquipment');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment/food-preparation-equipment')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Coffee Machines category
//             await navigationBarPage.clickDropdownCategoryLink('kitchenEquipment', 'coffeeMachines');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment/commercial-coffee-machines')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Commercial Ovens category
//             await navigationBarPage.clickDropdownCategoryLink('kitchenEquipment', 'commercialOvens');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment/commercial-ovens')).toBe(true);
//         });

//         test('should navigate to correct category pages when Refrigeration dropdown links are clicked', async () => {
//             // Test Commercial Refrigerators category
//             await navigationBarPage.clickDropdownCategoryLink('refrigeration', 'commercialRefrigerators');
//             expect(await navigationBarPage.verifyUrlContains('/refrigeration/commercial-refrigerators')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Commercial Freezers category
//             await navigationBarPage.clickDropdownCategoryLink('refrigeration', 'commercialFreezers');
//             expect(await navigationBarPage.verifyUrlContains('/refrigeration/commercial-freezers')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Ice Machines category
//             await navigationBarPage.clickDropdownCategoryLink('refrigeration', 'iceMachines');
//             expect(await navigationBarPage.verifyUrlContains('/refrigeration/ice-machines')).toBe(true);
//         });

//         test('should navigate to correct category pages when Tableware dropdown links are clicked', async () => {
//             // Test Crockery category
//             await navigationBarPage.clickDropdownCategoryLink('tableware', 'crockery');
//             expect(await navigationBarPage.verifyUrlContains('/tableware/crockery')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Serveware category
//             await navigationBarPage.clickDropdownCategoryLink('tableware', 'serveware');
//             expect(await navigationBarPage.verifyUrlContains('/tableware/serveware')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Cutlery category
//             await navigationBarPage.clickDropdownCategoryLink('tableware', 'cutlery');
//             expect(await navigationBarPage.verifyUrlContains('/tableware/cutlery')).toBe(true);
//         });
//     });

//     test.describe('Dropdown Product Image Navigation', () => {
//         test('should navigate to correct product pages when Kitchen Equipment product images are clicked', async () => {
//             // Test Commercial Gas and Electric Cookers
//             await navigationBarPage.clickDropdownProductImage('kitchenEquipment', 'commercialGasElectricCookers');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment/commercial-gas-electric-cookers')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Commercial Grills and Griddles
//             await navigationBarPage.clickDropdownProductImage('kitchenEquipment', 'commercialGrillsGriddles');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment/commercial-grills-griddles')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Commercial Fryers
//             await navigationBarPage.clickDropdownProductImage('kitchenEquipment', 'commercialFryers');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment/commercial-fryers')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Salamanders
//             await navigationBarPage.clickDropdownProductImage('kitchenEquipment', 'salamanders');
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment/salamanders')).toBe(true);
//         });

//         test('should navigate to correct product pages when Refrigeration product images are clicked', async () => {
//             // Test Work Top Refrigerators
//             await navigationBarPage.clickDropdownProductImage('refrigeration', 'workTopRefrigerators');
//             expect(await navigationBarPage.verifyUrlContains('/refrigeration/work-top-refrigerators')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Undercounter Refrigerators
//             await navigationBarPage.clickDropdownProductImage('refrigeration', 'undercounterRefrigerators');
//             expect(await navigationBarPage.verifyUrlContains('/refrigeration/undercounter-refrigerators')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test Prep Table Refrigerators
//             await navigationBarPage.clickDropdownProductImage('refrigeration', 'prepTableRefrigerators');
//             expect(await navigationBarPage.verifyUrlContains('/refrigeration/prep-table-refrigerators')).toBe(true);
//         });
//     });

//     test.describe('Hover Effects and Image Changes', () => {
//         test('should trigger hover effects when hovering over Kitchen Equipment dropdown elements', async () => {
//             // Test hover on category links
//             await navigationBarPage.hoverAndVerifyImageChange('kitchenEquipment', 'cookingEquipment');
//             await navigationBarPage.hoverAndVerifyImageChange('kitchenEquipment', 'foodPreparationEquipment');
//             await navigationBarPage.hoverAndVerifyImageChange('kitchenEquipment', 'coffeeMachines');
            
//             // Test hover on product images
//             await navigationBarPage.hoverAndVerifyImageChange('kitchenEquipment', 'commercialGasElectricCookers');
//             await navigationBarPage.hoverAndVerifyImageChange('kitchenEquipment', 'commercialFryers');
//         });

//         test('should trigger hover effects when hovering over Refrigeration dropdown elements', async () => {
//             // Test hover on category links
//             await navigationBarPage.hoverAndVerifyImageChange('refrigeration', 'commercialRefrigerators');
//             await navigationBarPage.hoverAndVerifyImageChange('refrigeration', 'iceMachines');
            
//             // Test hover on product images
//             await navigationBarPage.hoverAndVerifyImageChange('refrigeration', 'workTopRefrigerators');
//             await navigationBarPage.hoverAndVerifyImageChange('refrigeration', 'displayRefrigerators');
//         });
//     });

//     test.describe('Cart and Wishlist Functionality', () => {
//         test('should display cart and wishlist icons and allow interaction', async () => {
//             // Verify cart icon is visible and clickable
//             await navigationBarPage.clickCartIcon();
//             expect(await navigationBarPage.verifyUrlContains('/cart')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Verify wishlist icon is visible and clickable
//             await navigationBarPage.clickWishlistIcon();
//             expect(await navigationBarPage.verifyUrlContains('/wishlist')).toBe(true);
//         });

//         test('should display cart and wishlist counts', async () => {
//             const cartCount = await navigationBarPage.getCartCount();
//             const wishlistCount = await navigationBarPage.getWishlistCount();
            
//             // Verify counts are returned (even if 0)
//             expect(cartCount).toBeDefined();
//             expect(wishlistCount).toBeDefined();
//         });
//     });

//     test.describe('Authentication Links', () => {
//         test('should navigate to login and register pages', async () => {
//             // Test login navigation
//             await navigationBarPage.clickLoginLink();
//             expect(await navigationBarPage.verifyUrlContains('/login') || 
//                    await navigationBarPage.verifyUrlContains('/account')).toBe(true);
//             await navigationBarPage.navigateToHomepage();

//             // Test register navigation (if available)
//             try {
//                 await navigationBarPage.clickRegisterLink();
//                 expect(await navigationBarPage.verifyUrlContains('/register') || 
//                        await navigationBarPage.verifyUrlContains('/signup')).toBe(true);
//             } catch (error) {
//                 // Register link might not be visible on homepage
//                 console.log('Register link not visible or clickable');
//             }
//         });
//     });

//     test.describe('Error Handling and Edge Cases', () => {
//         test('should handle invalid navigation items gracefully', async () => {
//             // Test with invalid navigation item
//             try {
//                 await navigationBarPage.hoverOverNavItem('invalidItem');
//                 expect(false).toBe(true); // Should not reach here
//             } catch (error) {
//                 expect(error.message).toContain('not found');
//             }
//         });

//         test('should handle page load timeouts gracefully', async () => {
//             // This test ensures our navigation methods handle slow page loads
//             await navigationBarPage.clickMainNavItem('kitchenEquipment');
            
//             // Verify we're on the right page even if it takes time to load
//             expect(await navigationBarPage.verifyUrlContains('/kitchen-equipment')).toBe(true);
//         });

//         test('should maintain dropdown functionality after page navigation', async () => {
//             // Navigate to a category page
//             await navigationBarPage.clickMainNavItem('refrigeration');
            
//             // Verify dropdown still works from category page
//             await navigationBarPage.hoverOverNavItem('kitchenEquipment');
//             expect(await navigationBarPage.isDropdownVisible('kitchenEquipment')).toBe(true);
//         });
//     });

//     test.describe('Responsive Navigation Behavior', () => {
//         test('should maintain functionality across different viewport sizes', async () => {
//             // Test at standard desktop size
//             await navigationBarPage.page.setViewportSize({ width: 1920, height: 1080 });
//             await navigationBarPage.hoverOverNavItem('kitchenEquipment');
//             expect(await navigationBarPage.isDropdownVisible('kitchenEquipment')).toBe(true);

//             // Test at smaller desktop size
//             await navigationBarPage.page.setViewportSize({ width: 1024, height: 768 });
//             await navigationBarPage.hoverOverNavItem('refrigeration');
//             expect(await navigationBarPage.isDropdownVisible('refrigeration')).toBe(true);
//         });
//     });
});