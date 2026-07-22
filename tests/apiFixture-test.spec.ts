import { test, expect } from '../fixtures/apiFixture';
import { config } from '../config/env';
test.describe('API Fixture', () => {
    test('Verify Users API', async ({ apiClient }) => {
        const response = await apiClient.get(
            config.jsonPlaceholderBaseUrl + 'users'
        );
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
    });
});