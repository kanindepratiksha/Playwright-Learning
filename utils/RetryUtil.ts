import { APIResponse } from "@playwright/test";
export class RetryUtil {
    private static readonly RETRY_STATUS_CODES = [
        500,
        502,
        503,
        504
    ];
    static async execute(
        action: () => Promise<APIResponse>,
        retries: number = 3,
        delay: number = 1000
    ): Promise<APIResponse> {
        let response: APIResponse | undefined;
        for (let attempt = 1; attempt <= retries; attempt++) {
            console.log(`\nRetry Attempt : ${attempt}`);
            try {
                response = await action();
                if (
                    !this.RETRY_STATUS_CODES.includes(
                        response.status()
                    )
                ) {
                    console.log("Request Successful");
                    return response;
                }
                console.log(
                    `Received ${response.status()}. Retrying...`
                );
            } catch (error) {
                console.log(
                    `Network error on attempt ${attempt}:`,
                    error
                );
                if (attempt === retries) {
                    throw error;
                }
            }
            if (attempt < retries) {
                const waitTime =
                    delay * Math.pow(2, attempt - 1);
                console.log(
                    `Waiting ${waitTime} ms`
                );
                await new Promise(resolve =>
                    setTimeout(resolve, waitTime)
                );
            }
        }
        console.log(
            "Maximum retry attempts reached."
        );
        return response!;
    }
}