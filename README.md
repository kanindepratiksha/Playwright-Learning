# Playwright Automation Framework

## Overview

A scalable UI and API automation framework built using Playwright and TypeScript.

The framework supports:

- UI automation for SauceDemo
- REST API automation for Restful Booker
- Page Object Model (POM)
- TypeScript
- Reusable fixtures and utilities
- Environment-specific test data
- Data-driven testing
- API response validation
- Multiple browser execution
- Parallel execution
- Retry support
- Test tagging
- HTML and Allure reporting
- Screenshot, video and trace capture on failure
- CI/CD execution with GitHub Actions/Jenkins

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | UI and API automation |
| TypeScript | Programming language |
| Node.js | Runtime |
| Allure | Test reporting |
| Git | Version control |
| GitHub Actions | CI/CD |
| JSON/CSV/Excel | Test data |

---

## Application Under Test

### UI

SauceDemo:

https://www.saucedemo.com/

### API

Restful Booker:

https://restful-booker.herokuapp.com/

API documentation:

https://restful-booker.herokuapp.com/apidoc/index.html

---

## Project Structure

```text
PlaywrightFramework/
│
├── config/
│   └── env.ts
│
├── fixtures/
│   └── fixture.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ...
│
├── tests/
│   ├── api/
│   │   ├── auth-test.spec.ts
│   │   ├── healthCheck-test.spec.ts
│   │   ├── createBooking-test.spec.ts
│   │   ├── getBooking-test.spec.ts
│   │   ├── updateBooking-test.spec.ts
│   │   ├── patchBooking-test.spec.ts
│   │   └── deleteBooking-test.spec.ts
│   │
│   ├── ui/
│   │   ├── checkout-test.spec.ts
│   │   ├── locators-test.spec.ts
│   │   ├── locatorsAdvanced-test.spec.ts
│   │   ├── alerts-test.spec.ts
│   │   ├── browserWindows-test.spec.ts
│   │   ├── frames-test.spec.ts
│   │   ├── uiComponents-test.spec.ts
│   │   └── userActions-test.spec.ts
│   │
│   ├── e2e/
│   │   ├── sauceDemo-e2e.spec.ts
│   │   └── scenario2.spec.ts
│   │
│   └── hooks/
│
├── testdata/
│   ├── e2e/
│   │   └── checkoutData.json
│   ├── qa-users.json
│   ├── uat-users.json
│   ├── prod-users.json
│   ├── bookingData.json
│   ├── users.csv
│   └── users.xlsx
│
├── utils/
│   ├── ApiClient.ts
│   ├── ApiRequestBuilder.ts
│   ├── ApiAssertions.ts
│   ├── BookingApi.ts
│   ├── EnvironmentReader.ts
│   ├── DataReader.ts
│   ├── ResponseValidator.ts
│   └── ...
│
├── .github/
│   └── workflows/
│
├── docs/
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Installation

### Prerequisites

- Node.js
- npm
- Git

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

---

## Environment Configuration

The framework supports:

- QA
- UAT
- PROD

Set the environment using `TEST_ENV`.

### Windows PowerShell

```powershell
$env:TEST_ENV="qa"
```

```powershell
$env:TEST_ENV="uat"
```

```powershell
$env:TEST_ENV="prod"
```

### Windows CMD

```cmd
set TEST_ENV=qa
```

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run UI tests

```bash
npx playwright test --grep "@ui"
```

### Run API tests

```bash
npx playwright test --grep "@api"
```

### Run smoke tests

```bash
npx playwright test --grep "@smoke"
```

### Run regression tests

```bash
npx playwright test --grep "@regression"
```

### Run a specific test file

```bash
npx playwright test tests/e2e/scenario2.spec.ts
```

### Run using Chromium

```bash
npx playwright test --project=Chromium
```

### Run using Firefox

```bash
npx playwright test --project=Firefox
```

### Run using WebKit

```bash
npx playwright test --project=WebKit
```

### Run in headed mode

```bash
npx playwright test --headed
```

### Run with Playwright UI mode

```bash
npx playwright test --ui
```

---

## Parallel Execution

Tests are configured for parallel execution.

Workers can be configured using:

```powershell
$env:PW_WORKERS="4"
```

or:

```powershell
$env:PW_WORKERS="50%"
```

---

## Retry Configuration

Retries are enabled automatically in CI environments.

Local execution:

```text
0 retries
```

CI execution:

```text
2 retries
```

---

## Test Tags

The framework supports test categorization using tags.

### UI

```text
@ui
```

### API

```text
@api
```

### Smoke

```text
@smoke
```

### Regression

```text
@regression
```

Examples:

```bash
npx playwright test --grep "@smoke"
```

```bash
npx playwright test --grep "@api"
```

---

## UI Automation Coverage

### Login

- Valid login
- Invalid login
- Login page validation

### Products

- Product visibility
- Product details
- Add to cart
- Remove from cart
- Product sorting

### Cart

- Cart navigation
- Cart item validation
- Quantity validation
- Remove products
- Continue shopping

### Checkout

- Checkout navigation
- Required field validation
- Checkout cancellation
- Successful checkout
- Order completion validation

---

## API Automation Coverage

The API suite covers the Restful Booker booking lifecycle.

### Health Check

```text
GET /ping
```

### Authentication

```text
POST /auth
```

### Create Booking

```text
POST /booking
```

### Get Booking

```text
GET /booking/{id}
```

### Update Booking

```text
PUT /booking/{id}
```

### Partial Update

```text
PATCH /booking/{id}
```

### Delete Booking

```text
DELETE /booking/{id}
```

### API Validation

The framework validates:

- HTTP status codes
- Response body fields
- Booking IDs
- Booking data
- Schema structure
- Negative scenarios
- Authorization failures
- Deleted-resource behavior

---

## Page Object Model

The framework follows the Page Object Model design pattern.

Page Objects contain:

- Locators
- Page actions
- Reusable business operations

Assertions are maintained in the test layer for assignment-focused POMs.

Example:

```text
LoginPage
    ├── username locator
    ├── password locator
    ├── login button locator
    └── login()
```

---

## Test Data Management

Test data is maintained outside the test implementation wherever practical.

Supported formats include:

- JSON
- CSV
- Excel

Environment-specific user data:

```text
testdata/
├── qa-users.json
├── uat-users.json
└── prod-users.json
```

The active environment is selected using:

```text
TEST_ENV
```

---

## Waiting Strategy

The framework relies on Playwright's built-in auto-waiting capabilities.

The tests avoid:

```text
waitForTimeout()
```

Explicit waits are used only when a specific application condition requires them.

---

## Reporting

### Playwright HTML Report

Run:

```bash
npx playwright show-report
```

### Allure Report

Generate the report:

```bash
allure generate allure-results --clean -o allure-report
```

Open the report:

```bash
allure open allure-report
```

### Failure Artifacts

The framework captures on failure:

- Screenshots
- Videos
- Traces

---

## CI/CD

The framework supports CI execution through GitHub Actions/Jenkins configuration.

CI execution supports:

- Parallel workers
- Retries
- Automated test execution
- Allure results
- Playwright reporting artifacts

---

## TypeScript Validation

Check TypeScript compilation without executing tests:

```bash
npx tsc --noEmit
```

---

## Useful Commands

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npx playwright install` | Install browsers |
| `npx playwright test` | Run all tests |
| `npx playwright test --grep "@ui"` | Run UI tests |
| `npx playwright test --grep "@api"` | Run API tests |
| `npx playwright test --grep "@smoke"` | Run smoke tests |
| `npx playwright test --grep "@regression"` | Run regression tests |
| `npx playwright show-report` | Open HTML report |
| `npx tsc --noEmit` | Validate TypeScript |

---

## Quality Checks

Before submitting the framework, verify:

```bash
npx tsc --noEmit
npx playwright test
```

Also verify:

- No `test.only`
- No unnecessary `waitForTimeout`
- Tests are independent
- Assertions are in the test layer
- Test data is externalized
- API responses are validated
- UI and API tags are working
- Reports are generated
- Failure artifacts are captured

---

## Deliverables

The repository includes:

- Playwright TypeScript source code
- UI automation tests
- API automation tests
- Page Object Model
- Test fixtures
- Test data
- Configuration
- Reporting
- CI/CD configuration
- Documentation
- README
