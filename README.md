# FULL-STACK Personal Project Management Tool Project

## Stack

- Spring Boot 3
- Java (version 17)
- MySQL Database
- ReactJS
- Postman

## API endpoints (Project)

- http://localhost:8080/api/project (POST create new Project)
- http://localhost:8080/api/project/{projectId} (GET Project projectId)
- http://localhost:8080/api/project/all (GET all Projects)
- http://localhost:8080/api/project/{projectId} (UPDATE project projectId)
- http://localhost:8080/api/project/{projectId} (DELETE project projectId)
- http://localhost:8080/api/project/{backlogId}/{projectSequence} (GET Project by backlogId and projectSequence)
- http://localhost:8080/api/project/{backlogId}/{projectSequence} (UPDATE Project by backlogId and projectSequence)
- http://localhost:8080/api/project/{backlogId}/{projectSequence} (DELETE project by backlogId and projectSequence)

## API endpoints (Project Task)

- http://localhost:8080/api/backlog/{backlogId} (POST create new Project Task by backlogId)
- http://localhost:8080/api/project/{backlogId} (GET Project Tasks by backlogId)

## API endpoints (User)

- http://localhost:8080/api/users/register (POST create new User)
## Start backend (localhost:8080) frontend folder

- mvn spring-boot:run

## Start frontend (localhost:3000) frontend folder

- npm install
- cd frontend
- npm run dev

## Documentation
- https://jwt.io/
- https://getbootstrap.com/docs/5.0/getting-started/introduction/
- https://spring.io/guides/topicals/spring-security-architecture/
- https://spring.io/guides/gs/securing-web
- https://auth0.com/blog/spring-boot-authorization-tutorial-secure-an-api-java/
- https://www.miliari.me/blog/spring-security-jwt-auth0
- https://docs.spring.io/spring-framework/reference/core/validation/validator.html

## Back-end

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Initializr](https://start.spring.io/)

## Front-end

- [ReactJS](https://react.dev/)
