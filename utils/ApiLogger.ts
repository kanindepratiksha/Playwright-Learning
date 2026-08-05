export class ApiLogger {
    static async logRequest(
        method: string,
        url: string,
        headers?: Record<string, string>,
        body?: any
    ) {
        console.log("LOGGER CALLED");
        console.log(method);
        console.log(url);
    }
    static async logResponse(
        status: number,
        responseTime: number,
        responseBody: any
    ) {
        console.log("RESPONSE LOGGER");
        console.log(status);
    }
}