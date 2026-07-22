import { test as base } from '@playwright/test';
type TestFixture = {
    sample: string;
};
export const test = base.extend<TestFixture>({
    sample: [
        async ({}, use) => {
            console.log('========== TEST FIXTURE SETUP ==========');
            await use('Sample Fixture');
            console.log('========== TEST FIXTURE CLEANUP ==========');
        },
        {
            scope: 'test'
        }
    ]
});
export { expect } from '@playwright/test';