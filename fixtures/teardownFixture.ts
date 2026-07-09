import { test as base, expect } from '@playwright/test';
type UserFixture = {
    user: {
        username: string;
    };
};
export const test = base.extend<UserFixture>({
    user: async ({}, use) => {
        console.log("Creating User");
        const user = {
            username: "standard_user"
        };
        await use(user);
        console.log("Deleting User");
    }
});
export { expect };