import { test as base, expect } from '@playwright/test';
type Fixtures = {
    logger: void;
};
export const test = base.extend<Fixtures>({
    logger: [
        async ({}, use) => {
            console.log("===== Before Test =====");
            await use();
            console.log("===== After Test =====");
        },
        { auto: true }
    ]
});
export { expect };