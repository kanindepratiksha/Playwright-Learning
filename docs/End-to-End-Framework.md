# End-to-End Framework

## Objective

Implement a complete Playwright end-to-end automation framework using Page Object Model, reusable fixtures, data-driven testing, and a real-world SauceDemo purchase flow.

---

## Features Implemented

### 1. End-to-End Framework Architecture

- Structured E2E automation using separate test, page, fixture, configuration, and test-data layers.
- Provides reusable and maintainable automation components.

### 2. Page Object Model

Implemented dedicated page objects for the E2E workflow:

```text
LoginPage
InventoryPage
CartPage
CheckoutPage
```

- Encapsulates page locators and actions.
- Keeps test cases focused on business workflows rather than UI implementation details.

### 3. Base Page & Reusable Page Actions

- Common browser/page operations are centralized.
- Page-specific actions are exposed through reusable methods.

Example:

```ts
inventoryPage.addProduct(data.product);
inventoryPage.openCart();
cartPage.clickCheckout();
cartPage.continueCheckout();
cartPage.finishCheckout();
```

### 4. Custom Playwright Fixtures

Custom fixtures provide the required page objects directly to tests.

```ts
{
    inventoryPage,
    cartPage,
    checkoutPage
}
```

- Handles fixture setup and cleanup.
- Reduces duplicate initialization code.
- Supports scalable E2E test development.

### 5. Data-Driven E2E Testing

Test data is maintained separately:

```text
testdata/
└── e2e/
    └── checkoutData.json
```

The E2E test dynamically creates tests from the JSON data.

```ts
for (const data of checkoutData) {
    test(`Complete purchase - ${data.product}`, async (...) => {
        ...
    });
}
```

### 6. SauceDemo E2E Purchase Flow

Implemented complete purchase workflow:

```text
Login
  ↓
Verify Products Page
  ↓
Select Product
  ↓
Add Product to Cart
  ↓
Verify Cart Count
  ↓
Open Cart
  ↓
Verify Product
  ↓
Checkout
  ↓
Enter Customer Details
  ↓
Continue Checkout
  ↓
Finish Order
  ↓
Verify Order Success
```

### 7. Multiple Product Scenarios

Current E2E test data covers:

```text
Sauce Labs Backpack
Sauce Labs Bike Light
```

Each product is executed as a separate test scenario.

### 8. Cross-Browser E2E Execution

The E2E purchase flow executes against:

```text
Chromium
Firefox
WebKit
```

Current validation:

```text
2 Products × 3 Browsers = 6 E2E Tests
```

Latest E2E execution successfully passed all 6 scenarios.

### 9. Parallel E2E Execution

E2E tests support Playwright parallel execution through the configured workers.

Example:

```bash
npx playwright test tests/e2e --workers=4
```

Multiple browser projects and test cases can execute concurrently.

### 10. Environment Configuration

E2E execution uses the centralized environment configuration.

Supported environments:

```text
DEV
QA
UAT
PROD
```

Environment selection:

```bash
$env:TEST_ENV="QA"
npx playwright test tests/e2e
```

The framework dynamically selects the corresponding configuration.

### 11. E2E Assertions & Validation

The purchase flow validates important checkpoints:

```text
Products page visible
Cart count correct
Cart page visible
Expected product present
Checkout completed
Order success displayed
```

### 12. Playwright Reporting

E2E tests are included in the Playwright HTML report.

The report provides:

```text
Test Name
Browser
Duration
Pass/Fail Status
Test Details
```

### 13. Allure Reporting

E2E executions generate Allure results and are included in the overall Allure report.

The E2E suite can therefore be reviewed alongside:

```text
API Tests
Network Tests
Hooks Tests
E2E Tests
```

### 14. CI/CD Integration

The E2E tests are included in the GitHub Actions Playwright workflow.

CI execution supports:

```text
Chromium
Firefox
WebKit
```

with four-shard execution:

```text
Chromium ── 4 shards
Firefox  ── 4 shards
WebKit   ── 4 shards
```

Total:

```text
3 Browsers × 4 Shards = 12 CI Jobs
```

### 15. Final E2E Validation

Latest local full-suite validation:

```text
216 passed
0 failed
6 skipped
```

The dedicated SauceDemo E2E flow was also validated across all three browsers:

```text
Chromium ── 2 passed
Firefox  ── 2 passed
WebKit   ── 2 passed
```

---

## Status

✅ **Completed**
