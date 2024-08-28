# FULL-STACK Personal Project Management Tool Project

## Stack

- Spring Boot 3
- Java (version 17)
- MySQL Database
- ReactJS
- Postman

## Project API endpoints (Project)

- http://localhost:8080/api/project (POST create new Project)
- http://localhost:8080/api/project/{projectId} (GET Project projectId)
- http://localhost:8080/api/project/all (GET all Projects)
- http://localhost:8080/api/project/{projectId} (UPDATE project projectId)
- http://localhost:8080/api/project/{projectId} (DELETE project projectId)

## Project API endpoints (Project Task)

- http://localhost:8080/api/backlog/{backlogId} (POST create new Project Task by backlogId)
- http://localhost:8080/api/project/{backlogId} (GET Project Tasks by backlogId)
- http://localhost:8080/api/project/{backlogId}/{projectSequence} (GET Project by backlogId and projectSequence)
- http://localhost:8080/api/project/{backlogId}/{projectSequence} (UPDATE Project by backlogId and projectSequence)
- http://localhost:8080/api/project/{backlogId}/{projectSequence} (DELETE project by backlogId and projectSequence)

## Start backend (localhost:8080) frontend folder

- mvn spring-boot:run

## Start frontend (localhost:3000) frontend folder

- npm install
- cd frontend
- npm run dev

## Back-end

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Initializr](https://start.spring.io/)

## Front-end

- [ReactJS](https://react.dev/)
