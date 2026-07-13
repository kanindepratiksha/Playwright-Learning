import { test } from '../fixtures/teardownFixture';
test.describe('Fixture Teardown Demo', () => {
    test('Create and Delete User', async ({ user }) => {
        console.log(user.username);
    });
});