import { Page, Route, Request } from "@playwright/test";
import { Logger } from "./Logger";
export class NetworkInterceptor {
    constructor(private page: Page) {}
    /**
     * Continue original request
     */
    async continueRequest(urlPattern: string): Promise<void> {
        await this.page.route(urlPattern, async (route: Route) => {
            Logger.info("========== CONTINUE REQUEST ==========");
            Logger.info(`URL Pattern : ${urlPattern}`);
            Logger.info(`URL : ${route.request().url()}`);
            Logger.info(`METHOD : ${route.request().method()}`);
            await route.continue();
            Logger.info("Request continued successfully.");
            Logger.info("======================================");
        });
    }
    /**
     * Continue request with custom headers
     */
    async continueWithHeaders(
        urlPattern: string,
        headers: Record<string, string>
    ): Promise<void> {
        await this.page.route(urlPattern, async (route: Route) => {
            Logger.info("====== CONTINUE WITH HEADERS ======");
            Logger.info(`URL Pattern : ${urlPattern}`);
            Logger.info(`URL : ${route.request().url()}`);
            Logger.info(`METHOD : ${route.request().method()}`);
            const updatedHeaders = {
                ...route.request().headers(),
                ...headers
            };
            if (Object.keys(headers).length > 0) {
                Logger.info(
                    `UPDATED HEADERS : ${JSON.stringify(updatedHeaders, null, 2)}`
                );
            }
            await route.continue({
                headers: updatedHeaders
            });
            Logger.info("Headers updated successfully.");
            Logger.info("===================================");
        });
    }
    /**
     * Mock API response
     */
    async mockResponse(
        urlPattern: string,
        responseBody: object,
        status = 200,
        headers: Record<string, string> = {}
    ): Promise<void> {
        await this.page.route(urlPattern, async (route: Route) => {
            Logger.info("=========== MOCK RESPONSE ===========");
            Logger.info(`URL Pattern : ${urlPattern}`);
            Logger.info(`Status : ${status}`);
            if (Object.keys(headers).length > 0) {
                Logger.info(
                    `Headers : ${JSON.stringify(headers, null, 2)}`
                );
            }
            Logger.info(
                `Response : ${JSON.stringify(responseBody, null, 2)}`
            );
            await route.fulfill({
                status,
                contentType: "application/json",
                headers,
                body: JSON.stringify(responseBody)
            });
            Logger.info("Mock response returned successfully.");
            Logger.info("=====================================");
        });
    }
    /**
     * Intercept request
     */
    async interceptRequest(
        urlPattern: string,
        callback?: (request: Request) => void
    ): Promise<void> {
        await this.page.route(urlPattern, async (route: Route) => {
            const request = route.request();
            Logger.info("========= REQUEST INTERCEPTED =========");
            Logger.info(`URL Pattern : ${urlPattern}`);
            Logger.info(`METHOD : ${request.method()}`);
            Logger.info(`URL : ${request.url()}`);
            Logger.info(`RESOURCE TYPE : ${request.resourceType()}`);
            Logger.info(
                `HEADERS : ${JSON.stringify(request.headers(), null, 2)}`
            );
            if (request.postData()) {
                Logger.info(`BODY : ${request.postData()}`);
            }
            callback?.(request);
            await route.continue();
            Logger.info("Request continued.");
            Logger.info("=======================================");
        });
    }
    /**
     * Modify API response
     */
    async modifyResponse(
        urlPattern: string,
        callback: (body: any) => void
    ): Promise<void> {
        await this.page.route(urlPattern, async (route: Route) => {
            Logger.info("======= MODIFY RESPONSE =======");
            Logger.info(`URL Pattern : ${urlPattern}`);
            const response = await route.fetch();
            Logger.info(`STATUS : ${response.status()}`);
            const body = await response.json();
            Logger.info(
                `Original Response : ${JSON.stringify(body, null, 2)}`
            );
            callback(body);
            Logger.info(
                `Modified Response : ${JSON.stringify(body, null, 2)}`
            );
            await route.fulfill({
                response,
                body: JSON.stringify(body)
            });
            Logger.info("Response modified successfully.");
            Logger.info("================================");
        });
    }
}