# Data-Driven Testing

## Objective

Learn how to implement Data-Driven Testing in Playwright using external JSON files, multiple user credentials, parameterized tests, reusable Page Objects, and dynamic test data generation. This approach improves test maintainability, scalability, code reusability, and reduces code duplication.

---

# Topics Covered

## 1. JSON Data

Store test data in external JSON files instead of hardcoding values in test scripts.

**Benefits**

- Separates test data from test logic
- Easy to maintain and update
- Supports multiple test scenarios
- Reusable across different tests

---

## 2. Multiple User Credentials

Manage multiple valid and invalid user credentials in a single JSON file.

**Benefits**

- Execute login scenarios with different users
- Cover both positive and negative test cases
- Eliminate duplicate test scripts
- Simplify credential management

---

## 3. Parameterized Tests

Execute the same test multiple times using different input data.

**Benefits**

- Reduce duplicate code
- Improve test scalability
- Easy to add new test scenarios
- Better readability and reporting

---

## 4. Dynamic Test Data

Generate dynamic checkout data during test execution using Faker.

**Benefits**

- Creates unique test data for every execution
- Prevents duplicate data issues
- Improves test reliability
- Ideal for checkout, registration, and profile update scenarios

---

## 5. DataReader Utility

Created a reusable utility to read JSON data files.

**Benefits**

- Centralized JSON data handling
- Reusable across the framework
- Cleaner implementation
- Easier maintenance

---

## 6. Faker Utility

Created a reusable utility to generate dynamic test data.

**Benefits**

- Centralized dynamic data generation
- Reusable across multiple tests
- Easy to extend with additional generators
- Supports realistic test execution

---

## 7. Reusable Login with Parameterized Data

Enhanced the Login Page Object to support parameterized credentials.

**Benefits**

- Keeps test data separate from page objects
- Supports multiple login scenarios
- Makes page objects reusable
- Follows Page Object Model best practices

---

## Commands Practiced

### Run all tests

```bash
npx playwright test
```

### Run Login Tests

```bash
npx playwright test tests/locatorPart1.spec.ts
```

### Run Checkout Test

```bash
npx playwright test tests/checkout.spec.ts
```

### Run in Headed Mode

```bash
npx playwright test tests/checkout.spec.ts --headed
```

### Debug Checkout Test

```bash
npx playwright test tests/checkout.spec.ts --debug
```

### View HTML Report

```bash
npx playwright show-report
```

---

# Framework Files Created / Modified

```text
config/
└── env.ts

testdata/
└── users.json

utils/
├── DataReader.ts
└── FakerUtils.ts

pages/
├── LoginPage.ts
└── CartPage.ts

tests/
├── locatorPart1.spec.ts
└── checkout.spec.ts

docs/
└── 10-July-Data-Driven-Testing.md
```

---

# Features Implemented

## JSON Data

- Stored test data in external JSON files
- Managed reusable test datasets
- Separated test data from test logic

---

## Multiple User Credentials

- Managed multiple user credentials in a single JSON file
- Executed login scenarios using different user accounts
- Covered both positive and negative login scenarios

---

## Parameterized Tests

- Executed the same test with multiple data sets
- Reduced duplicate test cases
- Improved test maintainability

---

## Dynamic Test Data

- Generated dynamic checkout data using Faker
- Used unique user details during checkout
- Eliminated hardcoded values

---

## Reusable Page Objects

- Updated Login Page to accept username and password as parameters
- Reused the same page object for different user credentials
- Improved framework flexibility

---

## Reusable Utilities

- Implemented DataReader utility for JSON handling
- Implemented Faker utility for dynamic data generation
- Centralized reusable helper methods

---

# Learning Outcome

- Learned Data-Driven Testing concepts in Playwright.
- Implemented JSON-based test data management.
- Managed multiple user credentials efficiently.
- Executed parameterized tests using reusable Page Objects.
- Generated dynamic test data using Faker.
- Created reusable DataReader and Faker utility classes.
- Improved framework maintainability, scalability, and reusability.
- Reduced code duplication through reusable utilities and parameterized test execution.
- Applied Page Object Model and automation testing best practices.

---

## Status

✅ Completed