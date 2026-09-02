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
        const response = await route.fetch({
    headers: {
        ...route.request().headers(),
        "accept-encoding": "identity",
    },
    maxRetries: 3,
});
        Logger.info(`STATUS : ${response.status()}`);
        const headers = response.headers();
        const contentEncoding = headers["content-encoding"];
        Logger.info(
            `Content-Encoding : ${contentEncoding || "none"}`
        );
        let body: any;
        /*
         * Playwright may return a compressed response body depending
         * on the browser. Decompress it before parsing JSON.
         */
        if (contentEncoding) {
            const compressedBody = await response.body();
            const zlib = await import("zlib");
            let decompressedBody: Buffer;
            switch (contentEncoding.toLowerCase()) {
                case "gzip":
                    decompressedBody = zlib.gunzipSync(compressedBody);
                    break;
                case "br":
                    decompressedBody = zlib.brotliDecompressSync(
                        compressedBody
                    );
                    break;
                case "deflate":
                    decompressedBody = zlib.inflateSync(compressedBody);
                    break;
                default:
                    throw new Error(
                        `Unsupported Content-Encoding: ${contentEncoding}`
                    );
            }
            body = JSON.parse(
                decompressedBody.toString("utf-8")
            );
        } else {
            body = JSON.parse(await response.text());
        }
        Logger.info(
            `Original Response : ${JSON.stringify(body, null, 2)}`
        );
        /*
         * Modify the response body.
         */
        callback(body);
        Logger.info(
            `Modified Response : ${JSON.stringify(body, null, 2)}`
        );
        /*
         * Remove compression-related headers because we are
         * sending an uncompressed JSON body.
         */
        const modifiedHeaders = {
            ...headers
        };
        delete modifiedHeaders["content-encoding"];
        delete modifiedHeaders["content-length"];
        delete modifiedHeaders["transfer-encoding"];
        modifiedHeaders["content-type"] = "application/json";
        await route.fulfill({
            response,
            headers: modifiedHeaders,
            body: JSON.stringify(body)
        });
        Logger.info("Response modified successfully.");
        Logger.info("================================");
    });
}
    /**
 * Abort network request
 */
async abortRequest(
    urlPattern: string,
    errorCode:
        | "failed"
        | "aborted"
        | "timedout"
        | "accessdenied"
        | "internetdisconnected" = "aborted"
): Promise<void> {
    await this.page.route(urlPattern, async (route: Route) => {
        Logger.info("=========== ABORT REQUEST ===========");
        Logger.info(`URL Pattern : ${urlPattern}`);
        Logger.info(`URL : ${route.request().url()}`);
        Logger.info(`Method : ${route.request().method()}`);
        Logger.info(`Abort Reason : ${errorCode}`);
        await route.abort(errorCode);
        Logger.info("Request aborted successfully.");
        Logger.info("=====================================");
    });
}
/**
 * Rewrite request URL
 */
async rewriteUrl(
    urlPattern: string,
    newUrl: string
): Promise<void> {
    await this.page.route(urlPattern, async (route: Route) => {
        Logger.info("=========== URL REWRITE ===========");
        Logger.info(`Original URL : ${route.request().url()}`);
        Logger.info(`New URL : ${newUrl}`);
        await route.continue({
            url: newUrl
        });
        Logger.info("URL rewritten successfully.");
        Logger.info("===================================");
    });
}
/**
 * Modify request body
 */
async modifyRequestBody(
    urlPattern: string,
    callback: (body: any) => void
): Promise<void> {
    await this.page.route(urlPattern, async (route: Route) => {
        const request = route.request();
        let body = {};
        if (request.postData()) {
            body = JSON.parse(request.postData()!);
        }
        Logger.info("====== REQUEST BODY MODIFICATION ======");
        Logger.info(`Original Body : ${JSON.stringify(body, null, 2)}`);
        callback(body);
        Logger.info(`Modified Body : ${JSON.stringify(body, null, 2)}`);
        await route.continue({
            postData: JSON.stringify(body)
        });
        Logger.info("Request body modified successfully.");
        Logger.info("=======================================");
    });
}
}