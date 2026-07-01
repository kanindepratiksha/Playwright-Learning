# Playwright Learning – Phase 1 (Weeks 1–6)

## Overview

This document summarizes my Playwright learning during Phase 1. The objective was to understand Playwright fundamentals, strengthen TypeScript knowledge, and build a scalable automation framework using Playwright best practices and the Page Object Model (POM).

---

# Week 1 – Playwright Setup & Architecture

## Objective

Set up a Playwright automation framework and understand the project architecture.

## Topics Covered

- Installed Playwright and supported browsers (Chromium, Firefox, WebKit).
- Created a structured Playwright project.
- Learned Playwright Test Runner.
- Understood Browser, Browser Context, and Page.
- Implemented Page Object Model (POM).
- Configured Playwright (Reporter, Trace, Screenshots, Browsers).
- Centralized application URLs using `config/env.ts`.

### Project Structure

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

### Commands Practiced

```bash
npm init playwright@latest
npx playwright install
npx playwright test
npx playwright test --headed
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright show-report
```

## Learning Outcome

- Built Playwright framework.
- Learned project architecture.
- Implemented POM.
- Executed tests across multiple browsers.

**Status:** Completed

---

# Week 2 – TypeScript Fundamentals

## Objective

Learn TypeScript concepts required for Playwright automation.

## Topics Covered

- Variables (`let`, `const`)
- Data Types
- Arrays
- Objects
- Functions
- Classes
- Interfaces
- Async / Await
- Import / Export

### Commands Practiced

```bash
npx tsc
npx ts-node filename.ts
```

## Learning Outcome

- Improved TypeScript fundamentals.
- Built reusable classes.
- Learned modular programming.
- Understood asynchronous programming.

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

```bash
npx playwright test tests/locatorPart1.spec.ts
npx playwright test tests/locatorPart1.spec.ts --project=chromium
```

## Learning Outcome

- Used reliable Playwright locators.
- Automated login and logout.
- Improved locator strategies.

**Status:** Completed

---

# Week 4 – Playwright Locators Part 2

## Objective

Learn advanced locator strategies.

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

```bash
npx playwright test tests/locatorPart2.spec.ts
npx playwright test tests/locatorPart2.spec.ts --headed
```

## Learning Outcome

- Worked with dynamic elements.
- Used chained locators.
- Improved locator strategies.

**Status:** Completed

---

# Week 5 – User Actions

## Objective

Automate common user interactions.

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

```bash
npx playwright test tests/userActions.spec.ts
```

## Learning Outcome

- Automated user workflows.
- Learned mouse and keyboard interactions.
- Improved UI automation skills.

**Status:** Completed

---

# Week 6 – Assertions & Waits

## Objective

Validate application behavior using Playwright assertions and waits.

## Topics Covered

Assertions:

- toBeVisible()
- toHaveText()
- toHaveURL()
- toBeEnabled()

Wait Strategies:

- waitForSelector()
- waitForURL()
- waitForLoadState()

Validated:

- Product Addition
- Cart Count
- Navigation
- Login Success

### Commands Practiced

```bash
npx playwright test tests/assertionsAndWaits.spec.ts
npx playwright test tests/assertionsAndWaits.spec.ts --debug
npx playwright test --trace on
```

## Learning Outcome

- Implemented reliable assertions.
- Reduced flaky tests.
- Learned synchronization techniques.

**Status:** Completed

---

# Overall Learning Summary

Successfully built a Playwright automation framework following industry best practices. Implemented automation scripts using:

- Playwright Framework
- TypeScript
- Page Object Model (POM)
- Browser Context
- Playwright Locators
- User Actions
- Assertions
- Wait Strategies
- Configuration Management (`config/env.ts`)
- Cross-browser Testing
- Test Execution

## Repository Structure

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

## Status

✅ **Phase 1 Completed Successfully**