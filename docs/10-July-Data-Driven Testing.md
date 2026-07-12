# Data-Driven Testing
## Objective
Learn how to implement Data-Driven Testing in Playwright using external JSON files, multiple user credentials, parameterized tests, and dynamic test data generation. This approach improves test maintainability, scalability, and code reusability while reducing duplication.
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
- Covers both positive and negative test cases
- Eliminates duplicate test scripts
- Simplifies credential management
---
## 3. Parameterized Tests
Execute the same test multiple times using different input data.
**Benefits**
- Reduces duplicate code
- Improves test scalability
- Easy to add new test scenarios
- Better readability and reporting
---
## 4. Dynamic Test Data
Generate dynamic test data during execution using Faker.
**Benefits**
- Creates unique test data for every execution
- Prevents duplicate data issues
- Improves test reliability
- Ideal for checkout, registration, and profile update scenarios
---
## 5. DataReader Utility
Created a reusable utility to read JSON files.
**Benefits**
- Centralized JSON reading
- Reusable across the framework
- Cleaner implementation
- Easy maintenance
---
## 6. Faker Utility
Created a reusable utility to generate dynamic test data.
**Benefits**
- Centralized dynamic data generation
- Reusable across multiple tests
- Easy to extend with additional data generators
- Supports realistic test execution
---
# Commands Practiced
Run all tests
```bash
npx playwright test
```
Run Login Tests
```bash
npx playwright test tests/locatorPart1.spec.ts
```
Run Checkout Test
```bash
npx playwright test tests/checkout.spec.ts
```
Run in headed mode
```bash
npx playwright test tests/checkout.spec.ts --headed
```
Debug Checkout Test
```bash
npx playwright test tests/checkout.spec.ts --debug
```
View HTML Report
```bash
npx playwright show-report
```
---
# Framework Files Created / Modified
```
testdata/
└── users.json
utils/
├── DataReader.ts
└── FakerUtils.ts
pages/
└── CartPage.ts
tests/
├── locatorPart1.spec.ts
└── checkout.spec.ts
docs/
└── 10-July-Data-Driven-Testing.md
```
---
# Features Implemented
### JSON Data
- Stored test data in external JSON files
- Read JSON data using a reusable utility
- Separated test data from test logic
---
### Multiple User Credentials
- Managed multiple user credentials in a single JSON file
- Executed login scenarios for different users
- Covered positive and negative login scenarios
---
### Parameterized Tests
- Executed the same test with multiple sets of data
- Improved code reusability
- Reduced duplicate test cases
---
### Dynamic Test Data
- Generated dynamic user data using Faker
- Used dynamic values during checkout execution
- Eliminated hardcoded test data
---
# Learning Outcome
- Learned the concepts of Data-Driven Testing.
- Implemented JSON-based test data management.
- Managed multiple user credentials efficiently.
- Executed parameterized tests using reusable test logic.
- Generated dynamic test data using Faker.
- Created reusable DataReader and Faker utility classes.
- Improved framework maintainability and scalability.
- Reduced code duplication through reusable test data and utilities.
---
## Status
✅ Completed