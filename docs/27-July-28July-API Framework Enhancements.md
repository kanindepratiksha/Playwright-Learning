# API Framework Enhancements

## Objective

Enhance the Playwright API automation framework by implementing reusable framework components including Request & Response Logging, JSON Schema Validation, Retry Mechanism, and Environment Configuration. These enhancements improve framework scalability, maintainability, reliability, debugging capabilities, and overall API quality while following enterprise automation best practices.

---

# Topics Covered

## 1. Request & Response Logging

Implemented centralized Request & Response Logging inside the reusable BaseApi to automatically log every API request and response.

**Benefits**

- Eliminates duplicate logging code
- Centralized logging implementation
- Easier debugging
- Better execution traceability
- Improved reporting

---

## 2. JSON Schema Validation

Implemented reusable JSON Schema Validation using AJV to validate API response contracts.

**Benefits**

- Validates API response structure
- Detects contract changes
- Improves API quality
- Reusable validation
- Better maintainability

---

## 3. Retry Mechanism

Implemented a reusable Retry Utility to automatically retry failed API requests caused by temporary server-side failures.

**Benefits**

- Handles intermittent API failures
- Improves execution reliability
- Reduces flaky tests
- Configurable retry attempts
- Reusable across the framework

---

## 4. Environment Configuration

Implemented centralized environment configuration for managing API execution across multiple environments.

**Benefits**

- Easy environment switching
- Centralized configuration
- Eliminates hardcoded values
- Better maintainability
- Supports scalable API execution

---

# Commands Practiced

## Run All API Tests

```bash
npx playwright test tests/api
```

---

## Run Create Booking Test

```bash
npx playwright test tests/api/createBooking-test.spec.ts
```

---

## Run API Tests in Chromium

```bash
npx playwright test tests/api --project=chromium
```

---

## Run API Tests in QA Environment

```powershell
$env:TEST_ENV="qa"
npx playwright test tests/api
```

---

## Run API Tests in DEV Environment

```powershell
$env:TEST_ENV="dev"
npx playwright test tests/api
```

---

## Run API Tests in UAT Environment

```powershell
$env:TEST_ENV="uat"
npx playwright test tests/api
```

---

## Debug API Tests

```bash
npx playwright test tests/api --debug
```

---

## View HTML Report

```bash
npx playwright show-report
```

---

# Framework Files Created

```text
api/
└── BaseApi.ts

config/
└── env.ts

schemas/
├── authSchema.ts
├── bookingSchema.ts
└── createBookingSchema.ts

utils/
├── RetryUtil.ts
└── SchemaValidator.ts
```

---

# Framework Features Implemented

## Request & Response Logging

- Centralized request logging
- HTTP Method logging
- Request URL logging
- Request Header logging
- Request Body logging
- Status Code logging
- Status Text logging
- Response Time logging
- Response Body logging

---

## JSON Schema Validation

- Generic Schema Validator
- Authentication Schema
- Booking Schema
- Create Booking Schema
- Response contract validation
- Required field validation

---

## Retry Mechanism

- Automatic retry execution
- Configurable retry attempts
- Exponential backoff
- Retry for HTTP 500
- Retry for HTTP 502
- Retry for HTTP 503
- Retry for HTTP 504

---

## Environment Configuration

- DEV Environment
- QA Environment
- UAT Environment
- Centralized Base URL
- Username configuration
- Password configuration
- Runtime environment selection

---

# Learning Outcome

- Implemented centralized Request & Response Logging inside BaseApi.
- Logged request method, URL, headers, payload, response body, status code, and response time.
- Implemented reusable JSON Schema Validation using AJV.
- Validated API response contracts using reusable schema files.
- Implemented reusable Retry Utility with exponential backoff.
- Improved API execution reliability by automatically retrying temporary failures.
- Implemented centralized Environment Configuration for DEV, QA, and UAT.
- Eliminated hardcoded configuration values.
- Improved framework debugging, scalability, and maintainability.
- Built reusable enterprise-level API framework components following automation best practices.

---

## Status

✅ Completed