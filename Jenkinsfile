
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
        stage("Push to Docker Hub"){
            steps {
                  withCredentials([usernamePassword(
                    credentialsId: "dockerHubCred",
                    passwordVariable: "dockerHubPass",
                    usernameVariable: "dockerHubUser"
                  )]){
                    sh "docker login -u ${dockerHubUser} -p ${dockerHubPass}"
                    sh "docker image tag todo-app-ecs ${dockerHubUser}/todo-app-ecs"
                    sh "docker push ${dockerHubUser}/todo-app-ecs"
                  }
            }
        }
        stage("Deploy"){
            steps {
                sh "docker compose up -d --build todo-app:latest"
            }
        }
    }
}
