import { test as base } from '@playwright/test';
type TestFixture = {
    sample: void;
};
export const test = base.extend<TestFixture>({
    sample: [
        async ({}, use) => {
            console.log('Test Fixture Setup');
            await use();
            console.log('Test Fixture Cleanup');
        },
        {
            scope: 'test'
        }
    ]
});
export { expect } from '@playwright/test';