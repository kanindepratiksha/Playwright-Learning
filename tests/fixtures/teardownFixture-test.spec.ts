import { test, expect } from '../../fixtures/teardownFixture';
test.describe('Fixture Teardown Demo', () => {
    // ==========================================
    // Create and Delete User
    // ==========================================
    test('Create and Delete User', async ({ user }) => {
        expect(user).toBeDefined();
        expect(user.username).toBeTruthy();
    });
});