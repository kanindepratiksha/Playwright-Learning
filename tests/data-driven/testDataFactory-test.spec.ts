import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { TestDataFactory } from "../../utils/TestDataFactory";
import { DataValidator } from "../../utils/DataValidator";
import { AllureHelper } from "../../utils/AllureHelper";
import { Severity } from "allure-js-commons";
test(
    "Read JSON Users",
    async () => {
        await AllureHelper.metadata({
            feature: "Test Data",
            story: "Read JSON Users",
            severity: Severity.NORMAL
        });
        const users = TestDataFactory.getJsonUsers();
        await AllureHelper.attachJson(
            "JSON Users",
            users
        );
        DataValidator.validateUsers(users);
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
    }
);
test(
    "Read Excel Users",
    async () => {
        await AllureHelper.metadata({
            feature: "Test Data",
            story: "Read Excel Users",
            severity: Severity.NORMAL
        });
        const users = TestDataFactory.getExcelUsers();
        const normalizedUsers = users.map((user: any) => ({
            username: user.Username,
            password: user.Password,
            expected: user.Expected
        }));
        await AllureHelper.attachJson(
            "Excel Users",
            normalizedUsers
        );
        DataValidator.validateUsers(normalizedUsers);
        expect(Array.isArray(normalizedUsers)).toBeTruthy();
        expect(normalizedUsers.length).toBeGreaterThan(0);
    }
);
test(
    "Read CSV Users",
    async () => {
        await AllureHelper.metadata({
            feature: "Test Data",
            story: "Read CSV Users",
            severity: Severity.NORMAL
        });
        const users = await TestDataFactory.getCsvUsers();
        const normalizedUsers = users.map((user: any) => ({
            username: user.Username,
            password: user.Password,
            expected: user.Expected
        }));
        await AllureHelper.attachJson(
            "CSV Users",
            normalizedUsers
        );
        DataValidator.validateUsers(normalizedUsers);
        expect(Array.isArray(normalizedUsers)).toBeTruthy();
        expect(normalizedUsers.length).toBeGreaterThan(0);
    }
);