import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";

export class AllureHelper {

    // ==========================================
    // Allure Metadata
    // ==========================================
    static async metadata(options: {
        feature: string;
        story: string;
        severity?: Severity;
    }): Promise<void> {

        // Set severity first
        if (options.severity) {
            await allure.severity(options.severity);
        }

        // Set feature
        await allure.feature(options.feature);

        // Set story
        await allure.story(options.story);
    }

    // ==========================================
    // Attach Text
    // ==========================================
    static async attachText(
        name: string,
        value: string
    ): Promise<void> {

        await allure.attachment(
            name,
            value,
            "text/plain"
        );
    }

    // ==========================================
    // Attach JSON
    // ==========================================
    static async attachJson(
        name: string,
        value: unknown
    ): Promise<void> {

        await allure.attachment(
            name,
            JSON.stringify(value, null, 2),
            "application/json"
        );
    }

    // ==========================================
    // Allure Step
    // ==========================================
    static async step<T>(
        title: string,
        callback: () => Promise<T>
    ): Promise<T> {

        return await allure.step(
            title,
            callback
        );
    }
}