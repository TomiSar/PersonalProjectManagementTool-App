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

## API endpoints (ProjectTask)

- http://localhost:8080/api/backlog/{projectId} (POST create new ProjectTask by projectId)
- http://localhost:8080/api/backlog/{projectId} (GET ProjectTasks by projectId)
- http://localhost:8080/api/backlog/{projectId}/{projectSequence} (GET ProjectTask by projectId and projectSequence)
- http://localhost:8080/api/backlog/{projectId}/{projectSequence} (UPDATE Project by projectId and projectSequence)
- http://localhost:8080/api/backlog/{projectId}/{projectSequence} (DELETE ProjectTask by projectId and projectSequence)

## API endpoints (User)

- http://localhost:8080/api/users/register (POST create new User)
- http://localhost:8080/api/users/login (POST login with existing User)
- http://localhost:8080/api/users/all (GET all Users)
- http://localhost:8080/api/users/{username} (GET User By Username)

## **Create env.properties file in backend folder Add personal env.properties values in file**

- **_DATABASE_URL=jdbc:mysql://localhost:3306/{DB_NAME}_**
- **_DATABASE_USERNAME={DATABASE_USERNAME}_**
- **_DATABASE_PASSWORD={DATABASE_PASSWORD}_**
- **_JWT_SECRET={JWTSECRET}_**

## **Import env.properties in application.properties**

- **_spring.config.import=file:env.properties_**

## Start backend (localhost:8080) frontend folder

- mvn spring-boot:run

## Start frontend (localhost:3000) frontend folder

- cd frontend
- npm install
- npm run start

## Documentation

- https://devcenter.heroku.com/articles/heroku-cli
- https://jwt.io/
- https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims?utm_source=google&utm_campaign=emea_nordics_fin_all_ciam-all_dg-ao_auth0_search_google_text_kw_OIDC_utm2&utm_medium=cpc&utm_id=aNK4z000000UE47GAG&gad_source=1&gclid=EAIaIQobChMIpera-r62iAMVaguiAx2KbiHFEAAYASAAEgJHY_D_BwE
- https://www.epochconverter.com/
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
