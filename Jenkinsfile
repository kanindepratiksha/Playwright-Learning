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
                        def shard = i
                        parallelStages["Shard ${shard}"] = {
                            dir("shard-${shard}") {
                                bat """
                                    if not exist blob-report mkdir blob-report
                                    if not exist allure-results mkdir allure-results
                                    set PW_WORKERS=${params.PW_WORKERS}
                                    set PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-report
                                    set ALLURE_RESULTS_DIR=allure-results
                                    npx playwright test ^
                                      --project=${params.TEST_ENV} ^
                                      --shard=${shard}/${shardCount} ^
                                      --workers=${params.PW_WORKERS}
                                """
                            }
                        }
                    }
                    parallel parallelStages
                }
            }
        }
        stage('Merge Playwright Reports') {
            steps {
                bat '''
                    if not exist merged-blob-report mkdir merged-blob-report
                    for /D %%D in (shard-*) do (
                        if exist "%%D\\blob-report\\*" (
                            copy /Y "%%D\\blob-report\\*" "merged-blob-report\\" >nul
                        )
                    )
                    npx playwright merge-reports --reporter html merged-blob-report
                '''
            }
        }
        stage('Merge Allure Results') {
            steps {
                bat '''
                    if not exist merged-allure-results mkdir merged-allure-results
                    for /D %%D in (shard-*) do (
                        if exist "%%D\\allure-results\\*" (
                            copy /Y "%%D\\allure-results\\*" "merged-allure-results\\" >nul
                        )
                    )
                    npx allure generate merged-allure-results --clean -o allure-report
                '''
            }
        }
    }
    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, allure-report/**, merged-blob-report/**, merged-allure-results/**',
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