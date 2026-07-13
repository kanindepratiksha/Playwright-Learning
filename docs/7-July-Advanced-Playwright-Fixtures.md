# Advanced Playwright Fixtures

## Objective

Learn advanced Playwright Fixture concepts to improve automation framework reusability, reduce code duplication, centralize setup and cleanup logic, and build scalable test automation.

---

# Topics Covered

## 1. Auto Fixture (`auto: true`)

Automatically executes before and after every test without explicitly requesting the fixture.

**Use Cases**

- Automatic logging
- Test setup
- Test cleanup
- Reporting

**Benefits**

- Automatic execution
- Cleaner test cases
- Centralized setup
- Improved maintainability

---

## 2. Fixture Override

Override Playwright built-in fixtures such as `page` to provide common initialization for every test.

**Use Cases**

- Open application automatically
- Configure browser context
- Common page initialization

**Benefits**

- Eliminates duplicate code
- Consistent test setup
- Easier framework maintenance

---

## 3. Fixture Teardown

Performs cleanup activities after test execution.

**Use Cases**

- Delete temporary test data
- Logout users
- Release resources
- Cleanup execution

**Benefits**

- Proper resource cleanup
- Better test isolation
- Reliable execution
- Prevents leftover test data

---

## 4. Authentication Fixture

Automatically authenticates users before test execution and provides an authenticated page.

**Use Cases**

- Common login setup
- Authenticated user workflows
- Login reuse across tests

**Dependencies**

- `LoginPage`
- `users.json`
- `env.ts`

**Benefits**

- Centralized authentication
- Reduced duplicate login code
- Cleaner test implementation
- Improved maintainability

---

## 5. API Fixture

Provides a reusable `APIRequestContext` for API testing.

**Use Cases**

- Backend validation
- API testing
- Test data creation
- Integration testing

**Dependencies**

- `request`
- `env.ts`
- `appConstants.ts`

**Benefits**

- Reusable API client
- Centralized API configuration
- Cleaner API tests
- Better scalability

---

# Commands Practiced

Run all tests

```bash
npx playwright test
```

Run Auto Fixture

```bash
npx playwright test tests/autoFixture.spec.ts
```

Run Override Fixture

```bash
npx playwright test tests/overrideFixture.spec.ts
```

Run Teardown Fixture

```bash
npx playwright test tests/teardownFixture.spec.ts
```

Run Authentication Fixture

```bash
npx playwright test tests/authFixture.spec.ts
```

Run API Fixture

```bash
npx playwright test tests/apiFixture.spec.ts
```

Run in headed mode

```bash
npx playwright test tests/authFixture.spec.ts --headed
```

Debug Authentication Fixture

```bash
npx playwright test tests/authFixture.spec.ts --debug
```

View HTML Report

```bash
npx playwright show-report
```

---

# Framework Files Created

```
fixtures/
├── autoFixture.ts
├── overrideFixture.ts
├── teardownFixture.ts
├── authFixture.ts
└── apiFixture.ts

tests/
├── autoFixture.spec.ts
├── overrideFixture.spec.ts
├── teardownFixture.spec.ts
├── authFixture.spec.ts
└── apiFixture.spec.ts

docs/
└── 7-July-Advanced-Playwright-Fixtures.md
```

---

# Learning Outcome

- Learned Auto Fixture using `auto: true`.
- Implemented Fixture Override for built-in Playwright fixtures.
- Implemented Fixture Teardown using `await use()`.
- Created an Authentication Fixture for reusable login functionality.
- Implemented an API Fixture using `APIRequestContext`.
- Improved framework reusability and maintainability.
- Reduced duplicate setup and authentication code.
- Built scalable fixture architecture following Playwright best practices.

---

## Status

✅ Completed