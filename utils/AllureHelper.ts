import * as allure from "allure-js-commons";
export class AllureHelper {
    static async metadata(options: {
        feature: string;
        story: string;
        severity?: "blocker" | "critical" | "normal" | "minor" | "trivial";
    }) {
        if (options.severity) {
            await allure.severity(options.severity);
        }
        await allure.feature(options.feature);
        await allure.story(options.story);
    }
    static async attachText(
        name: string,
        value: string
    ) {
        await allure.attachment(
            name,
            value,
            "text/plain"
        );
    }
    static async attachJson(
        name: string,
        value: unknown
    ) {
        await allure.attachment(
            name,
            JSON.stringify(value, null, 2),
            "application/json"
        );
    }
    static async step<T>(
        title: string,
        callback: () => Promise<T>
    ): Promise<T> {
        return allure.step(title, callback);
    }
}