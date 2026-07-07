#  Playwright Hooks & Test Annotations

## Objective

Learn Playwright test lifecycle hooks and test annotations to improve test organization, setup, cleanup, and execution control.

---

# Topics Covered

## 1. Hooks

### beforeAll()

Executes once before all test cases in a test file.

**Common Uses**

- Database connection
- Test data creation
- Global setup

---

### beforeEach()

Executes before every test case.

**Common Uses**

- Launch application
- Login
- Navigate to required page


---

### afterEach()

Executes after every test case.

**Common Uses**

- Logout
- Clear test data
- Capture logs

---

### afterAll()

Executes once after all test cases.

**Common Uses**

- Close database connection
- Delete test data
- Cleanup activities


---

# 2. Test Grouping

## test.describe()

Groups related test cases into a test suite.


Benefits

- Better test organization
- Easier execution
- Cleaner HTML reports

---

# 3. Test Annotations

## test.only()

Runs only the specified test.


Use Case

- Debugging
- Developing a single test

---

## test.skip()

Skips the specified test.


Use Case

- Feature under development
- Known application issues
- Temporary exclusion

---

# 4. Tags

Tags help execute specific groups of tests.


Run Smoke Tests

```bash
npx playwright test --grep @Smoke
```

Run Regression Tests

```bash
npx playwright test --grep @Regression
```

Skip Smoke Tests

```bash
npx playwright test --grep-invert @Smoke
```

---

# Execution Order

Playwright executes hooks in the following order:

```text
beforeAll()

beforeEach()
Test Case 1
afterEach()

beforeEach()
Test Case 2
afterEach()

afterAll()
```

---

# Commands Practiced

Run all tests

```bash
npx playwright test
```

Run Hooks test

```bash
npx playwright test tests/hooks.spec.ts
```

Run in headed mode

```bash
npx playwright test tests/hooks.spec.ts --headed
```

Run in Chromium

```bash
npx playwright test tests/hooks.spec.ts --project=chromium
```

Run in Firefox

```bash
npx playwright test tests/hooks.spec.ts --project=firefox
```

Run in WebKit

```bash
npx playwright test tests/hooks.spec.ts --project=webkit
```

Debug Hooks test

```bash
npx playwright test tests/hooks.spec.ts --debug
```

View HTML Report

```bash
npx playwright show-report
```

---

# Framework Files Created

```
pages/
└── HooksPage.ts

tests/
└── hooks.spec.ts

docs/
└── Week-09-Hooks-and-Test-Annotations.md
```

---

# Learning Outcome

- Learned Playwright test lifecycle hooks.
- Understood the execution order of hooks.
- Organized test cases using `test.describe()`.
- Executed individual tests using `test.only()`.
- Skipped tests using `test.skip()`.
- Categorized tests using tags.
- Improved framework structure using the Page Object Model (POM).

---

## Status

✅ Completed