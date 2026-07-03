import { test as base, expect } from '@playwright/test';
type WorkerFixtures = {
    token: string;
};
export const test = base.extend<{}, WorkerFixtures>({
    token: [
        async ({}, use) => {
            console.log('Worker Fixture Setup');
            const token = 'ABC123TOKEN';
            await use(token);
            console.log('Worker Fixture Cleanup');
        },
        {
            scope: 'worker'
        }
    ]
});
export { expect };