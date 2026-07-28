import { test, expect } from '../../fixtures/apiFixture';
import { config } from '../../config/env';
test.describe('API Fixture', () => {
    test('Verify Users API', async ({ apiClient }) => {
        // ==========================================
        // Send GET Request
        // ==========================================
        const response = await apiClient.get(
            `${config.jsonPlaceholderBaseUrl}users`
        );
        // ==========================================
        // Verify Status Code
        // ==========================================
        expect(response.status()).toBe(200);
        // ==========================================
        // Verify Response Body
        // ==========================================
        const body = await response.json();
        expect(body).toBeTruthy();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
    });
});