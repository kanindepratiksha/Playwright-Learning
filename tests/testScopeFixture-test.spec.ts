import { test, expect } from '../fixtures/testScopeFixture';
test.describe('Test Scope Fixture Demo', () => {
    // ==========================================
    // Test One
    // ==========================================
    test('Test One', async ({ sample }) => {
        expect(sample).toBeDefined();
        expect(sample).toBe('Sample Fixture');
    });
    // ==========================================
    // Test Two
    // ==========================================
    test('Test Two', async ({ sample }) => {
        expect(sample).toBeDefined();
        expect(sample).toBe('Sample Fixture');
    });
});