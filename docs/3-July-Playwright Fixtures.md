# Playwright Fixtures
## Objective
Learn how to use Playwright Fixtures to create reusable setup and cleanup logic, reduce code duplication, and improve test maintainability.
---
# Topics Covered
## 1. Built-in Fixtures
Playwright provides built-in fixtures such as:
- `page`
- `browser`
- `context`
- `request`
**Benefits**
- Ready-to-use resources
- Faster test development
- Better test isolation
---
## 2. Custom Fixtures
Create reusable fixtures using `test.extend()`.
**Use Cases**
- Login setup
- Page Object initialization
- Test data setup
**Benefits**
- Reusable code
- Cleaner test scripts
- Easy maintenance
---
## 3. test.extend()
Used to create custom fixtures.
**Benefits**
- Extend Playwright fixtures
- Add custom resources
- Share setup across tests
---
## 4. use()
Controls fixture lifecycle.
- Code before `await use()` → Setup
- Code after `await use()` → Cleanup
**Benefits**
- Automatic setup
- Automatic cleanup
- Better resource management
---
## 5. Fixture Dependency
Allows one fixture to depend on another.
**Example**
- Login Fixture
- Inventory Fixture (depends on Login)
**Benefits**
- Reusable workflows
- Organized setup
- Reduced duplication
---
## 6. Worker Fixture
Runs once per worker.
**Use Cases**
- Database connection
- Authentication token
- Shared resources
**Benefits**
- Faster execution
- Shared setup
- Reduced overhead
---
## 7. Test Scope Fixture
Runs before every test.
**Benefits**
- Test isolation
- Independent execution
- Reliable test results
---
# Commands Practiced
Run all tests
```bash
npx playwright test
```
Run Fixture Demo
```bash
npx playwright test tests/fixtureDemo.spec.ts
```
Run Worker Fixture
```bash
npx playwright test tests/workerFixture.spec.ts
```
Run Test Scope Fixture
```bash
npx playwright test tests/testScopeFixture.spec.ts
```
Run in headed mode
```bash
npx playwright test tests/fixtureDemo.spec.ts --headed
```
Debug Fixture Demo
```bash
npx playwright test tests/fixtureDemo.spec.ts --debug
```
View HTML Report
```bash
npx playwright show-report
```
---
# Framework Files Created
```
fixtures/
├── fixture.ts
├── workerFixture.ts
└── testScopeFixture.ts
tests/
├── fixtureDemo.spec.ts
├── workerFixture.spec.ts
└── testScopeFixture.spec.ts
docs/
└── Week-11-Playwright-Fixtures.md
```
---
# Learning Outcome
- Learned Playwright built-in fixtures.
- Created custom fixtures using `test.extend()`.
- Understood the purpose of `use()` for setup and cleanup.
- Implemented fixture dependencies.
- Created worker-scoped fixtures.
- Created test-scoped fixtures.
- Improved code reusability and framework maintainability.
---
## Status
✅ Completed