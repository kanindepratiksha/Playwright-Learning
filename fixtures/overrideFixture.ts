import { test as base, expect } from '@playwright/test';
import { config } from '../config/env';

export const test = base.extend({

    page: async ({ page }, use) => {

        console.log("Opening SauceDemo...");

        await page.goto(config.sauceDemoUrl);

        await use(page);

        console.log("Closing Page...");
    }

});

export { expect };