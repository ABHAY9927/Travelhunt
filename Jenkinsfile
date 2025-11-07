pipeline {
    agent any

    environment {
        APP_NAME = "travelhunt"
        BACKEND_IMAGE = "travelhunt-backend"
        FRONTEND_IMAGE = "travelhunt-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling latest code from GitHub..."
                git branch: 'main', url: 'https://github.com/ABHAY9927/Travelhunt'
            }
        }

        stage('Build Backend Image') {
            steps {
                echo "Building Django Backend Docker Image..."
                sh '''
                    docker build -t $BACKEND_IMAGE -f backend/Dockerfile backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo "Building React Frontend Docker Image..."
                sh '''
                    docker build -t $FRONTEND_IMAGE -f frontend/Dockerfile frontend
                '''
            }
        }

        stage('Start Application with Docker Compose') {
            steps {
                echo "Starting all containers..."
                sh '''
                    docker-compose -f docker-compose.yml up -d --build

                '''
            }
        }

        stage('Cleanup') {
            steps {
                echo "Cleaning up old Docker resources..."
                sh 'docker system prune -f'
            }
        }
    }

    post {
        success {
            echo "✅ TravelHunt deployed successfully!"
        }
        failure {
            echo "❌ Build failed. Check the Jenkins console output."
        }
    }
}
