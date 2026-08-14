# Network Mocking & Interception - Advanced Enhancements

## Objective

Enhance the Playwright automation framework by implementing advanced reusable **Network Mocking & Interception** components including **Abort Request, Request Header Modification, URL Rewrite, and Request Body Modification**. These enhancements improve framework scalability, maintainability, debugging, request manipulation, and enterprise-level network testing while following automation best practices.

---

# Topics Covered

## 1. Abort Request

Implemented reusable request blocking using `route.abort()` to simulate network failures and block unwanted requests.

### Benefits

- Blocks unwanted requests
- Simulates network failures
- Improves execution speed
- Supports offline testing
- Enables negative testing

---

## 2. Request Header Modification

Enhanced request interception to dynamically add, update, or override request headers before sending them to the server.

### Benefits

- Supports custom authentication
- Adds dynamic headers
- Updates existing headers
- Improves request customization
- Supports API versioning

---

## 3. URL Rewrite

Implemented URL rewriting using `route.continue()` to redirect intercepted requests to different endpoints.

### Benefits

- Redirects requests dynamically
- Supports environment switching
- Enables endpoint testing
- Eliminates code changes
- Improves testing flexibility

---

## 4. Request Body Modification

Implemented request body modification to update API payloads before sending requests to the server.

### Benefits

- Modifies request payloads
- Supports dynamic data updates
- Enables negative testing
- Improves request customization
- Supports business workflow testing

---

# Commands Practiced

## Run All Network Tests

```bash
npx playwright test tests/network
```

---

## Run Abort Request Test

```bash
npx playwright test tests/network/abortRequest.spec.ts
```

---

## Run URL Rewrite Test

```bash
npx playwright test tests/network/urlRewrite.spec.ts
```

---

## Run Request Body Modification Test

```bash
npx playwright test tests/network/requestBodyModification.spec.ts
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
    ├── abortRequest.spec.ts
    ├── urlRewrite.spec.ts
    └── requestBodyModification.spec.ts

utils/
└── NetworkInterceptor.ts
```

---

# Framework Features Implemented

## Abort Request

- Block network requests
- Abort image requests
- Abort API requests
- Simulate network failures
- Request logging

---

## Request Header Modification

- Add custom headers
- Update request headers
- Override existing headers
- Header logging
- Continue modified requests

---

## URL Rewrite

- Rewrite request URLs
- Redirect API endpoints
- Continue rewritten requests
- URL logging
- Dynamic endpoint switching

---

## Request Body Modification

- Capture request payload
- Modify request body
- Update JSON payload
- Continue modified requests
- Request body logging

---

# Test Coverage

The framework includes automated test coverage for:

- Abort Request
- Request Header Modification
- URL Rewrite
- Request Body Modification

The entire suite executes successfully across:

- DEV Environment
- QA Environment
- UAT Environment

---

# Learning Outcome

- Implemented reusable request blocking using `route.abort()`.
- Enhanced request header modification using `route.continue()`.
- Implemented dynamic URL rewriting for intercepted requests.
- Modified request payloads before sending them to the server.
- Built reusable network utilities for request manipulation.
- Improved framework scalability, maintainability, and debugging.
- Developed enterprise-level network interception components following Playwright best practices.

---

## Status

✅ Completed