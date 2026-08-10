# Playwright Reporting, Debugging & Trace Viewer

## Objective

Enhance the Playwright framework with reusable **HTML Reports, Allure Reporting, Screenshots, Videos, Trace Viewer, Debug Mode, and Playwright Inspector** capabilities.

---

# Topics Covered

## 1. HTML Reports

- Interactive test execution reports
- Failure details
- Screenshot, video, and trace attachments

## 2. Screenshots

- Captures screenshots on failure
- Supports visual failure investigation

## 3. Videos

- Retains video on failure
- Supports execution analysis

## 4. Trace Viewer

- Captures traces on failure
- Supports detailed execution investigation

## 5. Allure Reporting

- Integrated `allure-playwright`
- Feature, Story, Severity, Owner, and Epic metadata
- Supports attachments and execution details

## 6. Allure Steps

- Implemented reusable `AllureHelper.step()`
- Displays structured test execution steps
- Supports step-level investigation

## 7. Debug Mode

- Verified Playwright `--debug`
- Supports interactive and step-by-step debugging

## 8. Playwright Inspector

- Verified through Debug Mode
- Supports execution and locator investigation

---

# Commands Practiced

## Run Playwright Test

```bash
npx playwright test tests/ui/alerts-test.spec.ts --project=DEV
```

## View HTML Report

```bash
npx playwright show-report
```

## View Trace

```bash
npx playwright show-trace test-results/<test-result>/trace.zip
```

## Generate Allure Report

```bash
npx allure generate allure-results -o allure-report
```
### Open the report
```bash
npx allure open allure-report
```
---

# Framework Files

```text
utils/
└── AllureHelper.ts

tests/
└── hooks/
    └── reporting/
        ├── uiAllureHooks.ts
        └── apiAllureHooks.ts
```

---

# Test Coverage

- HTML Reports
- Screenshots
- Videos
- Trace Viewer
- Error Context
- Allure Reporting
- Allure Metadata
- Allure Steps
- Debug Mode
- Playwright Inspector
- Intentional Failure Validation

---

# Intentional Failure Validation

An intentionally failed test was used to verify failure reporting:

```typescript
expect(true).toBe(false);
```

## Verified

- ✅ Failure status
- ✅ Screenshot
- ✅ Video
- ✅ Trace
- ✅ Error Context
- ✅ Allure Report
- ✅ Allure Metadata
- ✅ Allure Steps
- ✅ Debugging Information

> **Note:** The intentional failure was used only for reporting/debugging validation and should be removed before normal CI execution.

---

# Learning Outcome

- Implemented Playwright HTML and Allure reporting.
- Configured screenshots, videos, and traces.
- Implemented reusable Allure Steps and metadata.
- Verified Debug Mode and Playwright Inspector.
- Improved reporting, debugging, maintainability, and failure investigation.

---

# Status

✅ **Completed**
