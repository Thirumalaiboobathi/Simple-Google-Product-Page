pipeline {
    agent none 

    tools {
        nodejs 'nodejs'
    }

    parameters {
        string(name: 'ENVIRONMENT', defaultValue: 'dev', description: 'Deployment environment')
        booleanParam(name: 'DEPLOY', defaultValue: false, description: 'Deploy after build?')
        choice(name: 'VERSION', choices: ['v1.0', 'v2.0', 'v3.0'], description: 'Select version')
    }

    environment {
        IMAGE_NAME = 'googleprodapp'
        DOCKER_TAG = "${params.VERSION ?: 'latest'}"
    }

    triggers {
        pollSCM('H/5 * * * *') // Poll Git every 5 minutes
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    stages {
        stage('Install Dependencies') {
            agent { label 'node-agent' }
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Quality Checks') {
            parallel {
                stage('Lint Code') {
                    agent { label 'node-agent' }
                    steps {
                        sh 'npm run lint'
                    }
                }

                stage('Run Unit Tests') {
                    agent { label 'node-agent' }
                    steps {
                        echo 'Skipping unit tests for now...'
                    }
                }
            }
        }

        stage('List Workspace Files') {
            agent { label 'node-agent' }
            steps {
                script {
                    def status = sh(script: 'ls -la /some/nonexistent/path', returnStatus: true)
                    if (status != 0) {
                        echo "Shell command failed but we continue"
                    }
                }
            }
        }

        stage('Build Docker Image') {
            agent { label 'docker-agent' }
            steps {
                sh "docker build -t ${IMAGE_NAME}:${DOCKER_TAG} ."
            }
        }

        stage('Push to DockerHub') {
            agent { label 'docker-agent' }
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
                    script {
                        def localImage = "${IMAGE_NAME}:${DOCKER_TAG}"
                        def remoteImage = "thirumalaiboobathi/googleprodpage:${DOCKER_TAG}"

                        sh "docker tag ${localImage} ${remoteImage}"
                        sh "docker push ${remoteImage}"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
    when {
        expression { return params.DEPLOY == true }
    }
    agent { label 'k8s-agent' }
    steps {
        script {
            echo "Starting deployment to Kubernetes..."

            try {
                sh 'ls -l deployment.yml'
            } catch (err) {
                echo "❌ File deployment.yaml not found!"
                //  return to skip kubectl
                return
            }

            try {
                sh 'kubectl apply -f deployment.yaml'
            } catch (err) {
                echo "❌ Failed to apply Kubernetes deployment. Please check kubectl configuration."
            }

            echo "✅ Deployment stage completed (with or without errors)."
        }
    }
}


        stage('Generate Timestamp File') {
            agent { label 'node-agent' }
            steps {
                script {
                    def timestamp = new Date().format("yyyy-MM-dd_HH-mm-ss")
                    writeFile file: "timestamp.txt", text: "Build timestamp: ${timestamp}\n"
                }
            }
        }

        stage('Archive Artifact') {
            agent { label 'node-agent' }
            steps {
                archiveArtifacts artifacts: 'timestamp.txt'
            }
        }
    }

    post {
        success {
            emailext(
                subject: "✅ Jenkins Job Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """\
Good news!

The Jenkins job '${env.JOB_NAME}' build #${env.BUILD_NUMBER} was successful.

Check it here: ${env.BUILD_URL}
""",
                to: 'thiru260402@gmail.com',
                from: 'thiru260402@gmail.com',
                mimeType: 'text/plain'
            )
        }

        failure {
            emailext(
                subject: "❌ Jenkins Job Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """\
Oops!

The Jenkins job '${env.JOB_NAME}' build #${env.BUILD_NUMBER} has failed.

Check the logs here: ${env.BUILD_URL}
""",
                to: 'thiru260402@gmail.com',
                from: 'thiru260402@gmail.com',
                mimeType: 'text/plain'
            )
        }
    }
}
