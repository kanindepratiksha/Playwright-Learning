pipeline {
    agent any
    parameters {
        choice(
            name: 'TEST_ENV',
            choices: ['DEV', 'QA', 'UAT'],
            description: 'Environment/project to execute'
        )
        choice(
            name: 'PW_WORKERS',
            choices: ['1', '2', '4'],
            description: 'Number of Playwright workers per shard'
        )
        choice(
            name: 'SHARDS',
            choices: ['1', '2', '4'],
            description: 'Number of parallel test shards'
        )
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }
        stage('Parallel Test Execution') {
            steps {
                script {
                    def shardCount = params.SHARDS.toInteger()
                    def parallelStages = [:]
                    for (int i = 1; i <= shardCount; i++) {
                        def currentShard = i
                        parallelStages["Shard ${currentShard}"] = {
                            bat """
                                if not exist "shard-${currentShard}\\blob-report" mkdir "shard-${currentShard}\\blob-report"
                                if not exist "shard-${currentShard}\\allure-results" mkdir "shard-${currentShard}\\allure-results"
                                set TEST_ENV=${params.TEST_ENV}
                                set PW_WORKERS=${params.PW_WORKERS}
                                set PLAYWRIGHT_BLOB_OUTPUT_DIR=shard-${currentShard}\\blob-report
                                set ALLURE_RESULTS_DIR=shard-${currentShard}\\allure-results
                                echo ========================================
                                echo Running Playwright Shard ${currentShard}/${shardCount}
                                echo Environment: %TEST_ENV%
                                echo Workers: %PW_WORKERS%
                                echo ========================================
                                npx playwright test ^
                                  --config=playwright.config.ts ^
                                  --project=%TEST_ENV% ^
                                  --shard=${currentShard}/${shardCount} ^
                                  --workers=%PW_WORKERS%
                            """
                        }
                    }
                    parallel parallelStages
                }
            }
        }
        stage('Merge Playwright Reports') {
            steps {
                bat '''
                    if not exist "merged-blob-report" mkdir "merged-blob-report"
                    for /L %%S in (1,1,%SHARDS%) do (
                        if exist "shard-%%S\\blob-report\\*" (
                            copy /Y "shard-%%S\\blob-report\\*" "merged-blob-report\\" >nul
                        )
                    )
                    npx playwright merge-reports --reporter html merged-blob-report
                '''
            }
        }
        stage('Merge Allure Results') {
            steps {
                bat '''
                    if not exist "merged-allure-results" mkdir "merged-allure-results"
                    for /L %%S in (1,1,%SHARDS%) do (
                        if exist "shard-%%S\\allure-results\\*" (
                            copy /Y "shard-%%S\\allure-results\\*" "merged-allure-results\\" >nul
                        )
                    )
                    call npx allure generate merged-allure-results --clean -o allure-report
                '''
            }
        }
    }
    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, allure-report/**, merged-blob-report/**, merged-allure-results/**, shard-*/blob-report/**, shard-*/allure-results/**',
                allowEmptyArchive: true
            )
        }
        success {
            echo 'Playwright Jenkins pipeline completed successfully.'
        }
        failure {
            echo 'Playwright Jenkins pipeline failed. Check the console output and reports.'
        }
    }
}