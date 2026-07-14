import { test, expect } from '@playwright/test';
import { TestDataFactory } from '../utils/TestDataFactory';
import { DataValidator } from '../utils/DataValidator';
test('Read JSON Users', async () => {
    const users = TestDataFactory.getJsonUsers();
    DataValidator.validateUsers(users);
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
});
test('Read Excel Users', async () => {
    const users = TestDataFactory.getExcelUsers();
    const normalizedUsers = users.map((user: any) => ({
        username: user.Username,
        password: user.Password,
        expected: user.Expected
    }));
    DataValidator.validateUsers(normalizedUsers);
    expect(Array.isArray(normalizedUsers)).toBeTruthy();
    expect(normalizedUsers.length).toBeGreaterThan(0);
});
test('Read CSV Users', async () => {
    const users = await TestDataFactory.getCsvUsers();
    const normalizedUsers = users.map((user: any) => ({
        username: user.Username,
        password: user.Password,
        expected: user.Expected
    }));
    DataValidator.validateUsers(normalizedUsers);
    expect(Array.isArray(normalizedUsers)).toBeTruthy();
    expect(normalizedUsers.length).toBeGreaterThan(0);
});