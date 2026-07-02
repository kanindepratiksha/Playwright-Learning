# Playwright Advanced Test Features

## Objective

Learn advanced Playwright test features to improve test execution, reporting, debugging, and framework maintainability.

---

# Topics Covered

## 1. Test Configuration

### test.describe.configure()

Controls how test cases inside a test suite are executed.

**Execution Modes**

- Serial execution
- Parallel execution

**Benefits**

- Controls test execution order
- Useful for dependent test cases
- Improves execution management

---

### test.use()

Applies Playwright configuration at the test or test suite level.

**Common Uses**

- Viewport configuration
- Browser settings
- Locale
- Permissions
- Storage State

**Benefits**

- Flexible test configuration
- Reduces duplicate settings
- Keeps configuration organized

---

# 2. Test Execution

## test.step()

Divides a test into meaningful execution steps.

**Benefits**

- Better HTML reports
- Easier debugging
- Improved readability
- Clear execution flow

---

### test.slow()

Marks a test as slow.

**Use Cases**

- Long-running scenarios
- File uploads
- API-dependent tests

---

# 3. Test Annotations

## test.fail()

Marks a test that is expected to fail.

**Use Cases**

- Known application defects
- Bug verification
- Expected failures

---

## test.fixme()

Marks a test that is not ready for execution.

**Use Cases**

- Feature under development
- Incomplete functionality
- Pending implementation

---

# 4. Test Information

## testInfo

Provides runtime information about the currently executing test.

**Information Available**

- Test title
- Test status
- Project name
- Retry count
- Output directory

**Benefits**

- Better logging
- Custom reporting
- Easier debugging

---

# 5. Screenshot Capture

Captures screenshots during or after test execution.

**Benefits**

- Failure analysis
- Test execution evidence
- Faster debugging

---

# Commands Practiced

Run all tests

```bash
npx playwright test
```

Run Hooks 2 test

```bash
npx playwright test tests/hooks2.spec.ts
```

Run in headed mode

```bash
npx playwright test tests/hooks2.spec.ts --headed
```

Run in Chromium

```bash
npx playwright test tests/hooks2.spec.ts --project=chromium
```

Run in Firefox

```bash
npx playwright test tests/hooks2.spec.ts --project=firefox
```

Run in WebKit

```bash
npx playwright test tests/hooks2.spec.ts --project=webkit
```

Run Smoke tests

```bash
npx playwright test tests/hooks2.spec.ts --grep @smoke
```

Run Regression tests

```bash
npx playwright test tests/hooks2.spec.ts --grep @regression
```

Debug Hooks 2 test

```bash
npx playwright test tests/hooks2.spec.ts --debug
```

View HTML Report

```bash
npx playwright show-report
```

---

# Framework Files Created

```
pages/
└── Hooks2Page.ts

tests/
└── hooks2.spec.ts

docs/
└── Week-10-Advanced-Playwright-Test-Features.md
```

---

# Learning Outcome

- Learned advanced Playwright test configuration.
- Controlled test execution using `test.describe.configure()`.
- Applied test-level configuration using `test.use()`.
- Improved test readability using `test.step()`.
- Managed long-running tests using `test.slow()`.
- Handled expected failures using `test.fail()`.
- Managed incomplete features using `test.fixme()`.
- Retrieved runtime test information using `testInfo`.
- Captured screenshots after test execution.
- Improved reporting and debugging using Playwright features.

---

## Status

✅ Completed