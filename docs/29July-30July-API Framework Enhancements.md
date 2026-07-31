# API Framework Advanced Enhancements

## Objective

Enhance the Playwright API automation framework by implementing advanced reusable framework components including **Automatic Token Manager, Generic API Client, Request Builder Pattern, Dynamic Test Data (Faker), API Chaining, and API Performance Dashboard**. These enhancements improve framework scalability, maintainability, code reusability, execution efficiency, test data management, and overall enterprise-level API automation while following automation best practices.

---

# Topics Covered

## 1. Automatic Token Manager

Implemented a reusable Token Manager to automatically generate, cache, and reuse authentication tokens throughout API execution.

### Benefits

- Eliminates repeated authentication requests
- Automatically manages token reuse
- Improves API execution speed
- Reduces duplicate authentication code
- Centralized token management

---

## 2. Generic API Client

Implemented a reusable Generic API Client to centralize all HTTP operations including GET, POST, PUT, PATCH, and DELETE.

### Benefits

- Eliminates duplicate API request code
- Centralized HTTP operations
- Improves framework scalability
- Easier maintenance
- Better code reusability

---

## 3. Request Builder Pattern

Implemented the Builder Design Pattern for constructing reusable and flexible API request payloads.

### Benefits

- Cleaner request creation
- Supports dynamic request customization
- Improves code readability
- Reusable request construction
- Simplifies complex payload generation

---

## 4. Dynamic Test Data (Faker)

Implemented the Faker library to generate realistic and dynamic test data for API requests.

### Benefits

- Eliminates hardcoded test data
- Generates unique data for every execution
- Reduces duplicate record issues
- Improves test reliability
- Supports large-scale testing

---

## 5. API Chaining

Implemented API Chaining by passing data from one API response into subsequent API requests.

### Benefits

- Simulates real-world business workflows
- Validates end-to-end API functionality
- Eliminates manual data dependency
- Improves integration testing
- Supports complete CRUD execution

---

## 6. API Performance Dashboard

Implemented a reusable API Performance Dashboard to capture and display execution metrics for every API request.

### Benefits

- Tracks API response time
- Displays execution summary
- Identifies fastest and slowest APIs
- Calculates average response time
- Improves API performance monitoring

---

# Commands Practiced

## Run All API Tests

```bash
npx playwright test tests/api
```

---

## Run Authentication Test

```bash
npx playwright test tests/api/auth-test.spec.ts
```

---

## Run Create Booking Test

```bash
npx playwright test tests/api/createBooking-test.spec.ts
```

---

## Run Get Booking Test

```bash
npx playwright test tests/api/getBooking-test.spec.ts
```

---

## Run Update Booking Test

```bash
npx playwright test tests/api/updateBooking-test.spec.ts
```

---

## Run Patch Booking Test

```bash
npx playwright test tests/api/patchBooking-test.spec.ts
```

---

## Run Delete Booking Test

```bash
npx playwright test tests/api/deleteBooking-test.spec.ts
```

---

## Run Booking Workflow Test

```bash
npx playwright test tests/api/bookingFlow-test.spec.ts
```

---

## Run Generic API Client Test

```bash
npx playwright test tests/api/apiClient-test.spec.ts
```

---

## Run Token Manager Test

```bash
npx playwright test tests/api/tokenManager-test.spec.ts
```

---

## Run Request Builder Test

```bash
npx playwright test tests/api/requestBuilder-test.spec.ts
```

---

## Run Performance Dashboard Test

```bash
npx playwright test tests/api/performanceDashboard-test.spec.ts
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
├── ApiClient.ts
├── AuthApi.ts
├── BaseApi.ts
└── BookingApi.ts

builders/
└── ApiRequestBuilder.ts

factory/
└── BookingFactory.ts

flows/
└── BookingFlow.ts

utils/
├── ApiPerformanceTracker.ts
└── TokenManager.ts
```

---

# Framework Features Implemented

## Automatic Token Manager

- Automatic token generation
- Token caching
- Token reuse
- Centralized authentication
- Eliminates repeated login requests

---

## Generic API Client

- Generic GET request
- Generic POST request
- Generic PUT request
- Generic PATCH request
- Generic DELETE request
- Reusable API execution
- Centralized HTTP methods

---

## Request Builder Pattern

- Builder Design Pattern
- Dynamic payload creation
- Reusable request builder
- Fluent method chaining
- Flexible request construction

---

## Dynamic Test Data (Faker)

- Dynamic first name generation
- Dynamic last name generation
- Dynamic total price generation
- Random boolean generation
- Dynamic additional needs
- Unique booking data generation
- Realistic test data creation

---

## API Chaining

- Authentication API
- Create Booking API
- Get Booking API
- Update Booking API
- Patch Booking API
- Delete Booking API
- Response data reuse
- End-to-end CRUD workflow

---

## API Performance Dashboard

- API response time tracking
- HTTP method tracking
- Endpoint tracking
- Status code tracking
- Average response time calculation
- Fastest API identification
- Slowest API identification
- Performance execution summary

---

# Test Coverage

The framework includes automated test coverage for:

- Authentication
- Generic API Client
- Token Manager
- Request Builder Pattern
- Create Booking
- Get Booking
- Update Booking
- Patch Booking
- Delete Booking
- Booking Workflow
- API Performance Dashboard
- Invalid Authorization (Negative Testing)

The entire suite executes successfully across:

- DEV Environment
- QA Environment
- UAT Environment

---

# Learning Outcome

- Implemented Automatic Token Manager for centralized authentication and token reuse.
- Built a Generic API Client to execute reusable HTTP operations.
- Applied the Builder Design Pattern for flexible API request creation.
- Generated dynamic API request data using the Faker library.
- Implemented API Chaining for complete end-to-end CRUD validation.
- Built an API Performance Dashboard to monitor API execution metrics.
- Measured API response times and tracked endpoint performance.
- Calculated average response time along with fastest and slowest APIs.
- Eliminated duplicate API code using reusable framework components.
- Improved framework scalability, maintainability, and execution efficiency.
- Developed enterprise-level reusable API automation components following industry best practices.

---

## Status

✅ Completed