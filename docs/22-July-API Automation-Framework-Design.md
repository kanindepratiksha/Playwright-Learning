# API Automation Framework Design

## Objective

Enhance the Playwright automation framework by implementing a reusable API automation architecture with centralized request handling, authentication, reusable API assertions, response validation, and REST API support. These enhancements improve framework scalability, maintainability, reusability, and code quality while enabling reliable API testing.

---

# Topics Covered

## 1. Base API

Implemented a reusable BaseApi that centralizes all common HTTP operations including GET, POST, PUT, and DELETE requests.

**Benefits**

- Eliminates duplicate request code
- Centralizes HTTP operations
- Improves code reusability
- Easier API maintenance
- Simplifies API class implementation

---

## 2. Authentication

Implemented reusable authentication for generating authorization tokens before executing secured API requests.

**Benefits**

- Centralized authentication
- Reusable token generation
- Simplifies secured API testing
- Improves maintainability
- Reduces duplicate authentication code

---

## 3. Booking API

Implemented reusable Booking API methods for performing CRUD operations on Restful Booker APIs.

**Operations Implemented**

- Create Booking (POST)
- Get Booking (GET)
- Update Booking (PUT)
- Delete Booking (DELETE)

**Benefits**

- Reusable endpoint methods
- Centralized API implementation
- Cleaner test scripts
- Easy maintenance
- Better scalability

---

## 4. API Assertions

Implemented reusable assertion methods for validating API responses.

**Benefits**

- Centralized assertions
- Consistent status code validation
- Cleaner test implementation
- Better maintainability
- Improved reporting

---

## 5. Response Validation

Implemented reusable response validation methods to verify API response data.

**Benefits**

- Centralized response validation
- Reusable validation methods
- Cleaner API tests
- Consistent validations
- Easier maintenance

---

## 6. API Test Data

Implemented centralized JSON-based test data for API requests.

**Benefits**

- Data-driven testing
- Easy test data maintenance
- Separation of test logic and data
- Reusable payloads
- Supports multiple environments

---

## 7. REST API Automation

Implemented REST API automation using Playwright APIRequestContext.

**HTTP Methods Covered**

- GET
- POST
- PUT
- DELETE

**Benefits**

- Full CRUD validation
- API automation using Playwright
- Lightweight implementation
- Faster execution
- Reusable framework

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

## Run Booking CRUD Test

```bash
npx playwright test tests/api/booking-test.spec.ts
```

---

## Run API Tests in Chromium

```bash
npx playwright test tests/api --project=chromium
```

---

## Run API Tests in Headed Mode

```bash
npx playwright test --headed
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
├── BaseApi.ts
├── AuthApi.ts
├── BookingApi.ts
├── ApiAssertions.ts
├── ResponseValidator.ts
└── ApiHeaders.ts

config/
└── env.ts

testdata/
└── bookingData.json

tests/
└── api/
    ├── auth-test.spec.ts
    └── booking-test.spec.ts

docs/
└── 22-July-API-Automation-Framework-Design.md
```

---

# Framework Features Implemented

## BaseApi

- Centralized GET request
- Centralized POST request
- Centralized PUT request
- Centralized DELETE request
- Common request handling
- Reusable API methods

---

## Authentication

- Token generation
- Secure API authentication
- Token reuse across requests

---

## Booking API

- Create Booking
- Get Booking
- Update Booking
- Delete Booking
- Reusable CRUD operations

---

## API Assertions

- Status code validation
- Response success validation
- Reusable assertion methods

---

## Response Validator

- Booking response validation
- Booking ID validation
- Token validation
- Field-level validations

---

## Test Data Management

- JSON payload management
- Reusable request data
- Centralized API test data

---

## API Test Execution

- CRUD workflow execution
- Authentication before secured requests
- Response validation
- API assertions
- HTML reporting

---

# REST API Methods Covered

| HTTP Method | Purpose |
|-------------|---------|
| GET | Retrieve booking details |
| POST | Create new booking |
| PUT | Update existing booking |
| DELETE | Delete booking |
| Authentication | Generate API token |
| API Assertions | Validate HTTP responses |
| Response Validation | Validate response body |

---

# Learning Outcome

- Designed a reusable enterprise-level API automation framework.
- Centralized HTTP request handling using BaseApi.
- Implemented reusable authentication for secured APIs.
- Automated REST API CRUD operations using Playwright.
- Centralized API assertions for response validation.
- Implemented reusable response validation methods.
- Separated API implementation from test logic.
- Used JSON-based data-driven API testing.
- Improved framework maintainability by reducing duplicate code.
- Built a scalable and reusable API automation framework following enterprise automation best practices.
- Reorganized the test suite using a feature-based folder structure for better maintainability and scalability.

---

# Future Enhancements

- PATCH request support
- API request and response logging
- Retry mechanism for API failures
- Response time validation
- JSON Schema validation
- Multi-environment API configuration
- API reporting enhancements
- Common header management
- Generic API response parser

---

---

# Framework Restructure

Reorganized the test suite into a feature-based folder structure to improve readability, maintainability, and scalability.

```text
tests/
├── api/
├── ui/
├── assertions/
├── data-driven/
├── fixtures/
└── hooks/
```

**Benefits**

- Better project organization
- Easy navigation of test cases
- Clear separation of framework features
- Improved maintainability
- Scalable folder structure for future enhancements

---

## Status

✅ Completed

**Additional Enhancement**

- ✅ Restructured test folders using a feature-based organization.