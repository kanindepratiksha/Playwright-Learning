# Playwright Learning – Phase 1 (Weeks 1–6)

## Overview

This document summarizes my Playwright learning journey during Phase 1. The objective of this phase was to understand Playwright fundamentals, strengthen TypeScript knowledge, and implement automation scripts using Playwright best practices.

---

# Week 1 – Playwright Setup & Architecture

## Objective

Set up a Playwright automation framework and understand the basic project architecture.

## Topics Covered

### Playwright Installation

* Installed Playwright using npm.
* Installed supported browsers.
* Verified successful installation.

### Project Setup

Created a Playwright project with the default folder structure.

```
pages/
tests/
utils/
testdata/
playwright.config.ts
package.json
tsconfig.json
```

### Playwright Test Runner

Learned:

* test()
* expect()
* describe()
* beforeEach()
* afterEach()

### Browser Context

Understood:

* Browser
* Browser Context
* Page

Created multiple browser contexts for isolated test execution.

### Page Object Model (POM)

Created page classes to separate:

* Locators
* Actions
* Business logic

Benefits:

* Better maintainability
* Code reusability
* Cleaner test scripts

### Playwright Configuration

Configured:

* Browsers
* Base URL
* Reporter
* Headless execution
* Screenshots
* Trace

### Test Execution

Executed tests using:

```
npx playwright test
```

Executed:

* Chromium
* Firefox
* WebKit

Generated HTML reports.

## Learning Outcome

* Understood Playwright architecture.
* Learned project setup.
* Implemented Page Object Model.
* Executed tests across multiple browsers.

Status: Completed

---

# Week 2 – TypeScript Fundamentals

## Objective

Learn TypeScript concepts required for Playwright automation.

## Topics Covered

### Variables

Worked with:

* let
* const

### Data Types

Implemented:

* string
* number
* boolean
* any
* unknown
* array

### Arrays

Created arrays for:

* Products
* User names
* Test data

### Objects

Created objects containing:

* Username
* Password
* Product information

### Functions

Implemented:

* Normal functions
* Arrow functions
* Functions with parameters
* Return values

### Classes

Created reusable classes using:

* constructor
* methods
* properties

### Interfaces

Used interfaces to define object structures and improve code readability.

### Async / Await

Learned asynchronous programming.

Used:

```
async
await
```

to handle browser actions.

### Import / Export

Split reusable code into multiple files using ES Modules.

## Learning Outcome

* Improved TypeScript fundamentals.
* Built reusable classes.
* Learned modular programming.
* Understood asynchronous execution.

Status: Completed

---

# Week 3 – Playwright Locators Part 1

## Objective

Learn Playwright locator strategies.

## Topics Covered

Implemented:

* getByRole()
* getByText()
* getByPlaceholder()
* CSS Selectors

Automated:

* Login
* Logout
* URL Validation

## Learning Outcome

* Used user-friendly locators.
* Improved locator reliability.
* Automated login functionality.

Status: Completed

---

# Week 4 – Playwright Locators Part 2

## Objective

Learn advanced locator techniques.

## Topics Covered

Implemented:

* locator()
* filter()
* first()
* last()
* nth()
* XPath
* Chained Locators

Automated:

* Product Selection
* Cart Navigation

## Learning Outcome

* Worked with dynamic elements.
* Used chained locators.
* Improved locator strategies.

Status: Completed

---

# Week 5 – User Actions

## Objective

Automate common user interactions.

## Topics Covered

Implemented:

* click()
* hover()
* keyboard.press()

Automated:

* Add to Cart
* Remove Product
* Navigation
* Cart Validation

## Learning Outcome

* Automated complete user workflows.
* Learned keyboard and mouse interactions.
* Improved UI automation skills.

Status: Completed

---

# Week 6 – Assertions & Waits

## Objective

Validate application behavior using Playwright assertions.

## Topics Covered

Assertions:

* toBeVisible()
* toHaveText()
* toHaveURL()
* toBeEnabled()

Wait Strategies:

* waitForSelector()
* waitForURL()
* waitForLoadState()

Validated:

* Product added to cart
* Cart count
* Page navigation
* Login success

## Learning Outcome

* Implemented reliable assertions.
* Reduced flaky tests.
* Learned synchronization techniques.

Status: Completed

---

# Overall Learning Summary

During Phase 1, I successfully built a Playwright automation framework and implemented automation scripts covering setup, TypeScript fundamentals, locator strategies, user interactions, and assertions.

## Repository Structure

```
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

## Skills Gained

* Playwright Framework
* TypeScript
* Page Object Model
* Browser Context
* Playwright Locators
* User Actions
* Assertions
* Wait Strategies
* Test Execution
* Framework Organization

## Status

✅ Phase 1 Completed Successfully
