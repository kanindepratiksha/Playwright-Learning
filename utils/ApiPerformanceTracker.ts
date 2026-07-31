export interface ApiPerformance {
    method: string;
    endpoint: string;
    statusCode: number;
    responseTime: number;
}
export class ApiPerformanceTracker {
    private static apiResults: ApiPerformance[] = [];
    static add(
        method: string,
        endpoint: string,
        statusCode: number,
        responseTime: number
    ): void {
        this.apiResults.push({
            method,
            endpoint,
            statusCode,
            responseTime
        });
    }
    static printReport(): void {
        console.log("\n");
        console.log("==============================================");
        console.log("        API PERFORMANCE DASHBOARD");
        console.log("==============================================");
        if (this.apiResults.length === 0) {
            console.log("No API execution found.");
            return;
        }
        let total = 0;
        let fastest = this.apiResults[0];
        let slowest = this.apiResults[0];
        this.apiResults.forEach(api => {
            console.log(
                `${api.method} | ${api.endpoint}`
            );
            console.log(
                `Status : ${api.statusCode}`
            );
            console.log(
                `Time   : ${api.responseTime} ms`
            );
            console.log("--------------------------------------");
            total += api.responseTime;
            if (api.responseTime < fastest.responseTime) {
                fastest = api;
            }
            if (api.responseTime > slowest.responseTime) {
                slowest = api;
            }
        });
        console.log(
            `Average Response Time : ${(
                total / this.apiResults.length
            ).toFixed(2)} ms`
        );
        console.log(
            `Fastest API : ${fastest.method} ${fastest.endpoint}`
        );
        console.log(
            `Slowest API : ${slowest.method} ${slowest.endpoint}`
        );
        console.log("==============================================");
    }
    static clear(): void {
        this.apiResults = [];
    }
}