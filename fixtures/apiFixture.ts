import {
    test as base,
    expect,
    APIRequestContext
} from '@playwright/test';

import { config } from '../config/env';

type ApiFixture = {
    apiClient: APIRequestContext;
};

export const test = base.extend<ApiFixture>({
    apiClient: async ({ playwright }, use) => {

        const apiClient = await playwright.request.newContext({
            baseURL: config.jsonPlaceholderBaseUrl,
            extraHTTPHeaders: {
                Accept: 'application/json'
            }
        });

        await use(apiClient);

        await apiClient.dispose();
    }
});

export { expect };