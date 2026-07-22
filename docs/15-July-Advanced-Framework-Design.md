# Advanced Framework Design

## Objective

Enhance the Playwright automation framework by implementing reusable framework components, centralized utilities, robust logging, retry mechanisms, screenshot management, assertion handling, and automatic failure reporting. These enhancements improve framework scalability, maintainability, reliability, and overall code quality.

---

# Topics Covered

## 1. Advanced Base Page

Implemented a reusable BasePage that centralizes all common Playwright operations including navigation, element interactions, waits, validations, screenshots, and browser operations.

**Benefits**

- Eliminates duplicate code
- Improves code reusability
- Centralizes Playwright actions
- Simplifies Page Object implementation
- Easier framework maintenance

---

## 2. Logger Utility

Implemented a reusable Logger utility using Winston to capture framework execution details and business actions.

**Benefits**

- Better debugging
- Centralized logging
- Timestamp-based logs
- Improved execution tracking
- Easier failure analysis

---

## 3. Wait Utility

Implemented reusable wait methods for handling dynamic web elements and page synchronization.

**Benefits**

- Eliminates hardcoded waits
- Improves framework stability
- Centralized synchronization
- Better readability
- Reduces flaky tests

---

## 4. Retry Utility

Implemented a generic retry mechanism to automatically retry flaky UI operations before failing the test.

**Benefits**

- Handles intermittent failures
- Improves execution reliability
- Reduces flaky tests
- Configurable retry attempts
- Reusable across the framework

---

## 5. Screenshot Manager

Implemented centralized screenshot management for capturing screenshots during execution and automatically saving failure screenshots.

**Benefits**

- Automatic failure evidence
- Timestamp-based screenshots
- Centralized screenshot handling
- Easier debugging
- Better reporting

---

## 6. Assertion Utility

Implemented reusable assertion methods for validating element visibility, text, URL, title, and element state.

**Benefits**

- Centralized assertions
- Cleaner test implementation
- Consistent validations
- Better maintainability
- Improved reporting

---

## 7. Automatic Failure Screenshot

Implemented automatic screenshot capture for failed test cases using Playwright Hooks.

**Benefits**

- Automatic failure evidence
- No manual screenshot code
- Faster debugging
- Better HTML reports
- Improved defect analysis

---

# Commands Practiced

## Install Winston

```bash
npm install winston
```

---

## Run All Tests

```bash
npx playwright test
```

---

## Run Smoke Tests

```bash
npx playwright test --grep @smoke
```

---

## Run Regression Tests

```bash
npx playwright test --grep @regression
```

---

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

---

## Debug Tests

```bash
npx playwright test --debug
```

---

## View HTML Report

```bash
npx playwright show-report
```

---

# Framework Files Created

```text
pages/
├── BasePage.ts
├── LoginPage.ts
├── InventoryPage.ts

utils/
├── Logger.ts
├── WaitUtil.ts
├── RetryUtil.ts
├── AssertUtil.ts
└── ScreenshotManager.ts

reports/
├── logs/
│   └── framework.log
└── screenshots/

tests/
└── Hooks.spec.ts

docs/
└── 15-July-Advanced-Framework-Design.md
```

---

# Framework Features Implemented

## BasePage

- Centralized navigation methods
- Click actions
- Mouse actions
- Text input handling
- Dropdown handling
- Checkbox handling
- File upload
- Wait methods
- Assertions
- Screenshot support

---

## Logger Utility

- Framework execution logs
- Business action logs
- Success logs
- Failure logs
- Timestamp-based logging

---

## Wait Utility

- Wait for Visible
- Wait for Hidden
- Wait for Enabled
- Wait for Disabled
- Wait for Page Load
- Wait for URL
- Wait for Title

---

## Retry Utility

- Configurable retry attempts
- Retry delay support
- Automatic retry execution
- Exception handling
- Failure logging

---

## Screenshot Manager

- Capture screenshots
- Capture failure screenshots
- Timestamp-based file naming
- Centralized screenshot management

---

## Assertion Utility

- Visible assertion
- Hidden assertion
- Text assertion
- Contains text assertion
- URL assertion
- Title assertion
- Enabled assertion
- Disabled assertion

---

## Hooks Enhancement

- Framework start logging
- Test start logging
- Test pass logging
- Test failure logging
- Automatic failure screenshot capture
- Framework completion logging

---

# Learning Outcome

- Designed a reusable enterprise-level BasePage.
- Centralized Playwright actions using reusable framework utilities.
- Implemented structured logging for better debugging.
- Added reusable synchronization utilities.
- Implemented retry logic for flaky UI interactions.
- Centralized screenshot management with automatic failure screenshots.
- Created reusable assertion utilities.
- Enhanced Playwright Hooks with automatic logging and failure handling.
- Improved framework maintainability by reducing duplicate code.
- Built a scalable and maintainable automation framework following enterprise automation best practices.

---

## Status

✅ Completed
