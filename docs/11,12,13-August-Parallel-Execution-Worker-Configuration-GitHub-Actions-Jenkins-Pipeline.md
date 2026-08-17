# Parallel Execution, Worker Configuration, GitHub Actions CI/CD & Jenkins Pipeline
## Objective
Learn how to configure Playwright test execution using multiple workers, run tests in parallel, automate execution through GitHub Actions CI/CD, and configure a Jenkins Pipeline for continuous integration.
---
# Topics Covered
## 1. Parallel Execution
Playwright supports parallel test execution using multiple worker processes.

**Implementation**
- Configured Playwright to execute tests using multiple workers.
- Used Playwright sharding to distribute the test suite across multiple CI jobs.
- Configured GitHub Actions with 4 Playwright shards.
- Each shard executes a different portion of the test suite.

**Benefits**
- Faster test execution
- Better CI performance
- Efficient use of available resources
- Independent execution of test groups
---
## 2. Worker Configuration
Playwright workers are independent processes used to execute tests concurrently.

**Implementation**
- Configured the number of Playwright workers.
- Used worker-based execution for parallel test runs.
- Used worker configuration together with CI sharding.

**Benefits**
- Controlled parallel execution
- Reduced overall execution time
- Better resource utilization
- Scalable test execution

**Commands Practiced**

Run tests with 4 workers
```bash
npx playwright test --workers=4
```

Run tests with a single worker
```bash
npx playwright test --workers=1
```
---
## 3. GitHub Actions CI/CD
GitHub Actions was configured to automatically execute Playwright tests as part of the CI/CD workflow.

**Implementation**
- Created a GitHub Actions workflow for Playwright.
- Configured the workflow to run on pull requests.
- Configured a matrix strategy with 4 Playwright shards.
- Executed Playwright tests in parallel across the 4 shards.
- Collected Playwright test results from each shard.
- Merged Playwright HTML reports.
- Collected Allure results from the parallel jobs.
- Generated and uploaded the merged Allure report.

**Parallel CI Jobs**
```text
Playwright Shard 1/4
Playwright Shard 2/4
Playwright Shard 3/4
Playwright Shard 4/4
        |
        v
Merge Test Reports
```

**Benefits**
- Automated test execution
- Parallel CI execution
- Faster pull request validation
- Centralized test reports
- Better CI/CD visibility

**Commands Practiced**

Run Playwright tests
```bash
npx playwright test
```

Run a specific shard
```bash
npx playwright test --shard=1/4
```

Run the second shard
```bash
npx playwright test --shard=2/4
```

Run the third shard
```bash
npx playwright test --shard=3/4
```

Run the fourth shard
```bash
npx playwright test --shard=4/4
```

View HTML Report
```bash
npx playwright show-report
```

Generate Allure Report
```bash
npx allure generate allure-results -o allure-report
```
---
## 4. Jenkins Pipeline
Jenkins was installed and configured to execute the Playwright framework through a Jenkins Pipeline.

**Implementation**
- Installed Jenkins on Windows.
- Configured Java 21 (Eclipse Temurin).
- Configured Jenkins to run as a Windows service.
- Configured Jenkins on port `8080`.
- Created the `PlaywrightFramework-CI` Pipeline job.
- Connected the Pipeline job to the GitHub repository.
- Configured Git as the source control management system.
- Configured the Pipeline to obtain its definition from source control.
- Executed the Playwright CI pipeline from Jenkins.
- Reviewed build status, console output, pipeline stages, and build information.

**Benefits**
- Automated test execution
- Continuous integration
- Centralized build execution
- Pipeline-based test reporting
- Easy build monitoring and troubleshooting

**Commands Practiced**

Check Java version
```powershell
java -version
```

Check JAVA_HOME
```powershell
$env:JAVA_HOME
```

Check Java executable
```powershell
where.exe java
```

Check Jenkins service
```powershell
Get-Service Jenkins
```

Run Playwright tests
```bash
npx playwright test
```

View Jenkins locally
```text
http://localhost:8080
```

**Jenkins Pipeline Flow**
```text
GitHub Repository
       |
       v
Jenkins Pipeline
       |
       v
Checkout Source Code
       |
       v
Install Dependencies
       |
       v
Run Playwright Tests
       |
       v
Generate Test Reports
       |
       v
Publish / Archive Reports
```
---
# Commands Practiced
Run all tests
```bash
npx playwright test
```

Run tests with 4 workers
```bash
npx playwright test --workers=4
```

Run a specific shard
```bash
npx playwright test --shard=1/4
```

Run tests in headed mode
```bash
npx playwright test --headed
```

Run tests in debug mode
```bash
npx playwright test --debug
```

View HTML Report
```bash
npx playwright show-report
```

Generate Allure Report
```bash
npx allure generate allure-results -o allure-report
```

Check Git branch
```bash
git branch --show-current
```

Check remote branches
```bash
git branch -a
```

Check whether a branch exists on the remote
```bash
git ls-remote --heads origin feature/parallel-execution-ci-cd
```
---
# Framework Files Created
```text
.github/
└── workflows/
    └── playwright.yml

playwright.config.ts

Jenkins Pipeline
└── PlaywrightFramework-CI

docs/
└── 11,12,13-August-Parallel-Execution-Worker-Configuration-GitHub-Actions-Jenkins-Pipeline.md
```
---
# Learning Outcome
- Learned how Playwright parallel execution works.
- Configured Playwright workers for concurrent test execution.
- Implemented test sharding for CI execution.
- Created a GitHub Actions CI/CD workflow.
- Configured 4 parallel Playwright shards in GitHub Actions.
- Implemented test result collection and report merging.
- Configured Allure report generation for CI results.
- Installed and configured Jenkins on Windows.
- Configured Java 21 for Jenkins.
- Created and configured a Jenkins Pipeline for the Playwright framework.
- Learned how to troubleshoot CI/CD failures using GitHub Actions logs and Jenkins console output.
- Improved overall framework execution speed and CI/CD automation.
---
## Status
Parallel Execution and Worker Configuration implemented.
GitHub Actions parallel shard execution implemented and validated.
Jenkins Pipeline configured; final branch/remote validation is pending.
