# Advanced Data-Driven Testing

## Objective

Enhance the Playwright framework by implementing advanced data-driven testing using multiple external data sources, environment-specific test data, centralized test data management, and data validation to improve framework scalability, maintainability, and reliability.

---

# Topics Covered

## 1. Excel Data-Driven Testing

Read test data from external Excel files and execute the same test using multiple datasets.

**Benefits**

- Business-friendly test data management
- Easy to update test datasets
- Improved test coverage
- Reduced hardcoded test data

---

## 2. CSV Data-Driven Testing

Read test data from CSV files and execute tests using multiple datasets.

**Benefits**

- Lightweight and easy to maintain
- Supports large datasets
- Reusable test data
- Simplified data management

---

## 3. Environment-Based Test Data

Execute the same test using environment-specific test data for QA, UAT, and Production environments.

**Benefits**

- Supports multiple environments
- Easy environment switching
- No code changes required between environments
- Improved framework flexibility

---

## 4. Test Data Factory

Centralize access to all test data sources through a single reusable utility.

**Benefits**

- Centralized data management
- Improved code reusability
- Cleaner test implementation
- Easier framework maintenance

---

## 5. Data Validation

Validate test data before test execution to ensure mandatory fields are available and prevent runtime failures.

**Benefits**

- Early error detection
- Prevents invalid test execution
- Improves framework reliability
- Better test stability

---

# Commands Practiced

## Install Excel Package

```bash
npm install xlsx
```

## Install CSV Package

```bash
npm install csv-parser
```

## Run All Tests

```bash
npx playwright test
```

## Run Excel Data-Driven Tests

```bash
npx playwright test tests/excelDataDriven.spec.ts
```

## Run CSV Data-Driven Tests

```bash
npx playwright test tests/csvDataDriven.spec.ts
```

## Run Environment-Based Tests (QA)

```bash
$env:TEST_ENV="qa"
npx playwright test tests/environmentDataDriven.spec.ts
```

## Run Environment-Based Tests (UAT)

```bash
$env:TEST_ENV="uat"
npx playwright test tests/environmentDataDriven.spec.ts
```

## Run Environment-Based Tests (Production)

```bash
$env:TEST_ENV="prod"
npx playwright test tests/environmentDataDriven.spec.ts
```

## Run Test Data Factory

```bash
npx playwright test tests/testDataFactory.spec.ts
```

## Run in Headed Mode

```bash
npx playwright test tests/excelDataDriven.spec.ts --headed
```

## Debug Tests

```bash
npx playwright test tests/excelDataDriven.spec.ts --debug
```

## View HTML Report

```bash
npx playwright show-report
```

---

# Framework Files Created

```
testdata/
├── users.xlsx
├── users.csv
├── qaUsers.json
├── uatUsers.json
└── prodUsers.json

utils/
├── ExcelReader.ts
├── CsvReader.ts
├── EnvironmentReader.ts
├── TestDataFactory.ts
├── DataValidator.ts
├── FakerUtils.ts
└── types.ts

tests/
├── excelDataDriven.spec.ts
├── csvDataDriven.spec.ts
├── environmentDataDriven.spec.ts
└── testDataFactory.spec.ts

docs/
└── 13July-14July-Advanced-Data-Driven-Testing.md
```

---

# Learning Outcome

- Learned Excel Data-Driven Testing.
- Learned CSV Data-Driven Testing.
- Implemented environment-based test data for QA, UAT, and Production.
- Created reusable utilities for reading Excel, CSV, and environment-specific test data.
- Centralized test data management using Test Data Factory.
- Implemented data validation before test execution.
- Improved framework reusability and maintainability.
- Reduced duplicate code through reusable utilities.
- Built a scalable and maintainable data-driven testing framework.

---

## Status

✅ Completed