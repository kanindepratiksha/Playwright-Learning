# Network Mocking & Interception

## Objective

Enhance the Playwright automation framework by implementing reusable **Network Mocking & Interception** components including **Route Continue, Route Fulfill, Request Interception, API Mocking, Response Modification, and a centralized Network Interceptor utility**. These enhancements improve framework scalability, maintainability, debugging capabilities, code reusability, and overall enterprise-level network automation following automation best practices.

---

# Topics Covered

## 1. Route Continue

Implemented `route.continue()` to intercept and continue network requests.

### Benefits

- Continues intercepted requests
- Supports custom headers
- Improves request monitoring
- Enables request modification
- Better debugging

---

## 2. Route Fulfill

Implemented `route.fulfill()` to mock API responses.

### Benefits

- Mocks API responses
- Supports custom status codes
- Eliminates backend dependency
- Enables offline testing
- Improves execution stability

---

## 3. Request Interception

Implemented reusable request interception using `page.route()`.

### Benefits

- Captures request details
- Logs request headers
- Captures request payload
- Supports request validation
- Improves debugging

---

## 4. API Mocking

Implemented API Mocking by returning predefined JSON responses.

### Benefits

- Simulates API responses
- Enables isolated testing
- Eliminates backend dependency
- Supports negative testing
- Improves execution speed

---

## 5. Response Modification

Implemented `route.fetch()` and `route.fulfill()` to modify actual server responses before returning them.

### Benefits

- Modifies server responses
- Supports dynamic response updates
- Enables response transformation
- Supports negative scenarios
- Improves testing flexibility

---

## 6. Network Interceptor Utility

Implemented a reusable `NetworkInterceptor` utility to centralize all network operations.

### Benefits

- Centralized network handling
- Reusable methods
- Eliminates duplicate code
- Improves maintainability
- Enhances framework scalability

---

# Commands Practiced

## Run All Network Tests

```bash
npx playwright test tests/network
```

---

## Run Route Continue Test

```bash
npx playwright test tests/network/routeContinue.spec.ts
```

---

## Run Route Fulfill Test

```bash
npx playwright test tests/network/routeFulfill.spec.ts
```

---

## Run Request Interception Test

```bash
npx playwright test tests/network/requestInterception.spec.ts
```

---

## Run API Mocking Test

```bash
npx playwright test tests/network/apiMocking.spec.ts
```

---

## Run Response Modification Test

```bash
npx playwright test tests/network/responseModification.spec.ts
```

---

## Run Network Tests in DEV Environment

```powershell
$env:TEST_ENV="dev"
npx playwright test tests/network
```

---

## Run Network Tests in QA Environment

```powershell
$env:TEST_ENV="qa"
npx playwright test tests/network
```

---

## Run Network Tests in UAT Environment

```powershell
$env:TEST_ENV="uat"
npx playwright test tests/network
```

---

## Debug Network Tests

```bash
npx playwright test tests/network --debug
```

---

## View HTML Report

```bash
npx playwright show-report
```

---

# Framework Files Created

```text
tests/
└── network/
    ├── apiMocking.spec.ts
    ├── requestInterception.spec.ts
    ├── responseModification.spec.ts
    ├── routeContinue.spec.ts
    └── routeFulfill.spec.ts

utils/
├── Logger.ts
└── NetworkInterceptor.ts

testdata/
├── apiMockUser.json
├── mockedUsers.json
└── modifiedPost.json
```

---

# Framework Features Implemented

## Route Continue

- Continue intercepted requests
- Continue requests with custom headers
- Request URL logging
- HTTP method logging
- Updated headers logging

---

## Route Fulfill

- Mock API responses
- Mock custom status codes
- Mock JSON responses
- Mock response headers
- Reusable response mocking

---

## Request Interception

- Intercept GET requests
- Intercept POST requests
- Capture request URL
- Capture HTTP method
- Capture request headers
- Capture request body
- Capture resource type
- Request logging

---

## API Mocking

- Mock complete API response
- Mock single API resource
- Mock error response
- Custom HTTP status codes
- JSON response mocking

---

## Response Modification

- Fetch original response
- Modify response body
- Add new response properties
- Return modified response
- Response status logging
- Original and modified response logging

---

## Network Interceptor Utility

- Continue request
- Continue request with custom headers
- Mock API response
- Intercept requests
- Modify responses
- Centralized logging
- Reusable utility methods

---

# Test Coverage

The framework includes automated test coverage for:

- Route Continue
- Route Continue with Custom Headers
- Route Fulfill
- Request Interception (GET)
- Request Interception (POST)
- API Mocking
- Mock Success Response
- Mock Error Response
- Response Modification
- Response Property Injection

The entire suite executes successfully across:

- DEV Environment
- QA Environment
- UAT Environment

---

# Learning Outcome

- Implemented reusable request interception using `page.route()`.
- Used `route.continue()` to continue intercepted requests.
- Implemented `route.fulfill()` for API response mocking.
- Used `route.fetch()` to retrieve and modify server responses.
- Built a reusable `NetworkInterceptor` utility.
- Implemented API mocking for success and error scenarios.
- Captured request URL, method, headers, body, and resource type.
- Logged original and modified responses using a centralized logger.
- Improved framework scalability, maintainability, debugging, and code reusability.
- Developed enterprise-level network automation components following Playwright best practices.

---

## Status

✅ Completed