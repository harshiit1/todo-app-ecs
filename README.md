# todo-app-ecs : Dockerized Angular App
This repository contains the frontend for the TodoList application. It is built using Angular and served via Nginx using a multi-stage Docker build for maximum efficiency and small image size.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

# Getting Started
**Prerequisites**
Docker Desktop installed.
Node.js 20+ (optional, for local development).

**Local Development (without Docker)**
Install dependencies: npm install --legacy-peer-deps
Run the app: ng serve
Navigate to http://localhost:4200

**Docker Workflow**
We use a multi-stage build to compile the app in a Node environment and then serve the static assets using a lightweight Nginx Alpine image.

1. Build the Image
From the root directory, run:

<<Bash>>
docker build -t todo-app -f dockerfile-multi-stage .

2. Run the Container
Map port 8080 on your machine to port 80 in the container:

<<Bash>>
docker run -d -p 8080:80 --name todo-app todo-app
Now visit http://localhost:8080.

**Deployment to AWS (T3 Free Tier)**
To avoid crashing the low-memory AWS T3 instance during the build process, follow the Build-Push-Pull strategy:

Build & Tag Locally:

<<Bash>>
docker tag todo-app your-dockerhub-username/todo-app:latest
Push to Registry:

<<Bash>>
docker push your-dockerhub-username/todo-app:latest
Pull & Run on AWS:
SSH into your EC2 instance and run:

<<Bash>>
docker pull your-dockerhub-username/todo-app:latest
docker run -d -p 80:80 --name todo-production your-dockerhub-username/todo-app:latest
🛠 Project Structure Notes
nginx.conf: Configured to handle Angular client-side routing (redirects 404s to index.html).

SSR Handling: The Dockerfile automatically renames index.csr.html to index.html to ensure Nginx serves the client-side entry point correctly.

Output Path: Build artifacts are located in dist/TL.WEB/browser.ion on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
