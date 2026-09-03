import { DataReader } from "./DataReader";
export class EnvironmentReader {
    static getUsers() {
        const environment =
            (process.env.TEST_ENV || "qa").toLowerCase();
        const supportedEnvironments = [
            "qa",
            "uat",
            "prod"
        ];
        if (!supportedEnvironments.includes(environment)) {
            throw new Error(
                `Unsupported TEST_ENV: ${environment}. ` +
                `Supported environments: ${supportedEnvironments.join(", ")}`
            );
        }
        const fileName =
            `${environment}-users.json`;
        return DataReader.readJson(fileName);
    }
}