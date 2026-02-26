
pipeline {
    
    agent any;
  
    stages {
        stage("Code Clone") {
            steps {
                git url : "https://github.com/harshiit1/todo-app-ecs.git", branch : "master"
            }
        }
        stage("Build"){
            steps {
                echo "Docker build Started"
                sh "docker build -f ./Dockerfile-multi-stage -t todo-app-ecs ."
                echo "Docker Build Completed"
            }
        }
        stage("Test") {
            steps {
                echo "Tester write Tests"
            }
        }
        stage("Deploy"){
            steps {
                sh "docker compose up -d --build todo-app"
            }
        }
    }
}
