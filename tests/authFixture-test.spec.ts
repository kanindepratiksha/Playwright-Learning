import { test } from '../fixtures/authFixture';
import { InventoryPage } from '../pages/InventoryPage';
test.describe('Authentication Fixture', () => {
    test('Verify Successful Login', async ({ authenticatedPage }) => {
        // ==========================================
        // Page Object
        // ==========================================
        const inventoryPage = new InventoryPage(
            authenticatedPage
        );
        // ==========================================
        // Verify Login
        // ==========================================
        await inventoryPage.verifyProductsPage();
    });
});