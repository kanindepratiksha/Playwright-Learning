import Ajv from "ajv";
import { expect } from "@playwright/test";
export class SchemaValidator {
    private static ajv = new Ajv();
    static validate(
        response: any,
        schema: object,
        schemaName: string
    ): void {
        const validate = this.ajv.compile(schema);
        const isValid = validate(response);
        console.log("\n========================================");
        console.log("      JSON SCHEMA VALIDATION");
        console.log("========================================");
        console.log(`Schema Name : ${schemaName}`);
        if (isValid) {
            console.log("Status      : PASSED");
        } else {
            console.log("Status      : FAILED");
            console.log("\nValidation Errors:");
            console.log(validate.errors);
        }
        console.log("========================================\n");
        expect(isValid).toBeTruthy();
    }
}