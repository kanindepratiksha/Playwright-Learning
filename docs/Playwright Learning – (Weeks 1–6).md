# Playwright Learning – Phase 1 (Weeks 1–6)

## Overview

This document summarizes my Playwright learning journey during Phase 1. The primary objective of this phase was to understand Playwright fundamentals, strengthen TypeScript knowledge, and build a scalable automation framework by following Playwright best practices and the Page Object Model (POM).

---

# Week 1 – Playwright Setup & Architecture

## Objective

Set up the Playwright automation framework and understand its project structure.

## Topics Covered

- Playwright Installation
- Project Setup
- Playwright Test Runner
- Browser Context
- Page Object Model (POM)
- Playwright Configuration
- Test Execution

<<<<<<< HEAD
## Commands Used

```bash
npm init playwright@latest
```

=======
- Installed Playwright using npm.
- Installed Playwright supported browsers (Chromium, Firefox, and WebKit).
- Verified successful installation.

### Project Setup

Created a Playwright project with a structured folder hierarchy.

```
config/
docs/
pages/
tests/
testdata/
utils/
playwright.config.ts
package.json
tsconfig.json
README.md
```



### Playwright Test Runner

Learned and implemented:

- test()
- expect()
- describe()
- beforeEach()
- afterEach()

### Browser Context

Understood the Playwright hierarchy:

- Browser
- Browser Context
- Page

Created multiple browser contexts to execute tests in isolated sessions.

### Page Object Model (POM)

Created reusable page classes to separate:

- Locators
- Actions
- Business Logic

Benefits:

- Improved code maintainability
- Better code reusability
- Cleaner test scripts

### Playwright Configuration

Configured:

- Browsers
- Base URL
- HTML Reporter
- Headless Execution
- Screenshots
- Trace

### Commands Practiced

Install Playwright

```bash
npm init playwright@latest
```

Install browsers

```bash
npx playwright install
```

Run all tests

>>>>>>> origin/main
```bash
npx playwright test
```

<<<<<<< HEAD
```bash
npx playwright test --headed
```

## Learning Outcome

- Understood Playwright project structure.
- Configured Playwright with TypeScript.
- Executed tests using different browsers.
- Learned the basics of Browser Context and Page Object Model.

## Status

Completed
=======
Run tests in headed mode

```bash
npx playwright test --headed
```

Run tests on Chromium

```bash
npx playwright test --project=chromium
```

Run tests on Firefox

```bash
npx playwright test --project=firefox
```

Run tests on WebKit

```bash
npx playwright test --project=webkit
```

View HTML Report

```bash
npx playwright show-report
```

### Test Execution

Executed tests on:

- Chromium
- Firefox
- WebKit

Generated HTML reports after execution.

## Learning Outcome

- Understood Playwright architecture.
- Learned Playwright project setup.
- Implemented the Page Object Model (POM).
- Executed tests across multiple browsers.

**Status:** Completed

---

# Week 2 – TypeScript Fundamentals

## Objective

Learn TypeScript concepts required for Playwright automation.

## Topics Covered

### Variables

Worked with:

- let
- const

### Data Types

Implemented:

- string
- number
- boolean
- any
- unknown
- array

### Arrays

Created arrays for:

- Products
- Test Data

### Objects

Created reusable objects containing:

- Username
- Password
- Product Information

### Functions

Implemented:

- Normal Functions
- Arrow Functions
- Functions with Parameters
- Functions with Return Values

### Classes

Created reusable classes using:

- Constructor
- Methods
- Properties

### Interfaces

Used interfaces to define object structures and improve code readability.

### Async / Await

Learned asynchronous programming using:

```typescript
async
await
```

### Import / Export

Separated reusable code into multiple files using ES Modules.

### Commands Practiced

Compile TypeScript

```bash
npx tsc
```

Run TypeScript file

```bash
npx ts-node filename.ts
```

## Learning Outcome

- Improved TypeScript fundamentals.
- Built reusable classes.
- Learned modular programming.
- Understood asynchronous execution.

**Status:** Completed

---

# Week 3 – Playwright Locators Part 1

## Objective

Learn Playwright locator strategies.

## Topics Covered

Implemented:

- getByRole()
- getByText()
- getByPlaceholder()
- CSS Selectors

Automated:

- Login
- Logout
- URL Validation

### Commands Practiced

Run a specific test file

```bash
npx playwright test tests/locatorPart1.spec.ts
```

Run a specific browser

```bash
npx playwright test tests/locatorPart1.spec.ts --project=chromium
```

## Learning Outcome

- Used user-friendly Playwright locators.
- Improved locator reliability.
- Automated login and logout functionality.

**Status:** Completed

---

# Week 4 – Playwright Locators Part 2

## Objective

Learn advanced Playwright locator techniques.

## Topics Covered

Implemented:

- locator()
- filter()
- first()
- last()
- nth()
- XPath
- Chained Locators

Automated:

- Product Selection
- Cart Navigation
- Cart Validation

### Commands Practiced

Run locator test

```bash
npx playwright test tests/locatorPart2.spec.ts
```

Run in headed mode

```bash
npx playwright test tests/locatorPart2.spec.ts --headed
```

## Learning Outcome

- Worked with dynamic web elements.
- Used chained locators.
- Improved locator strategies.

**Status:** Completed

---

# Week 5 – User Actions

## Objective

Automate common user interactions using Playwright.

## Topics Covered

Implemented:

- click()
- hover()
- keyboard.press()

Automated:

- Add to Cart
- Remove Product
- Navigation
- Cart Validation

### Commands Practiced

Run User Actions test

```bash
npx playwright test tests/userActions.spec.ts
```

## Learning Outcome

- Automated complete user workflows.
- Learned keyboard and mouse interactions.
- Improved UI automation skills.

**Status:** Completed

---

# Week 6 – Assertions & Waits

## Objective

Validate application behavior using Playwright assertions and synchronization techniques.

## Topics Covered

### Assertions

Implemented:

- toBeVisible()
- toHaveText()
- toHaveURL()
- toBeEnabled()

### Wait Strategies

Implemented:

- waitForSelector()
- waitForURL()
- waitForLoadState()

Validated:

- Product addition to cart
- Cart count
- Page navigation
- Successful login

### Commands Practiced

Run Assertions test

```bash
npx playwright test tests/assertionsAndWaits.spec.ts
```

Debug test

```bash
npx playwright test tests/assertionsAndWaits.spec.ts --debug
```

Generate Trace

```bash
npx playwright test --trace on
```

## Learning Outcome

- Implemented reliable assertions.
- Reduced flaky tests using proper synchronization.
- Learned effective wait strategies.

**Status:** Completed

---

# Overall Learning Summary

During Phase 1, I successfully built a Playwright automation framework and implemented automation scripts covering Playwright setup, TypeScript fundamentals, locator strategies, user interactions, assertions, synchronization techniques, and the Page Object Model (POM).

## Repository Structure

```
docs/
pages/
tests/
testdata/
utils/
config/
playwright.config.ts
package.json
tsconfig.json
README.md
```

## Skills Gained

- Playwright Framework
- TypeScript
- Page Object Model (POM)
- Browser Context
- Playwright Locators
- User Actions
- Assertions
- Wait Strategies
- Cross-browser Testing
- Test Execution
- Framework Organization

## Status

✅ **Phase 1 Completed Successfully**
>>>>>>> origin/main
