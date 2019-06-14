# Endpoints monitoring service
### Exercise for [Applifting](https://www.applifting.cz/)

## Application
Application is written in [Node.js](https://nodejs.org/en/) and framework [Restify](http://restify.com) (middleware for building REST APIs). It contains service for monitoring URLs on background and log status codes with payload. 

## Prerequisites
Make sure you have **Node 8.x**, **NPM** and **Postman** installed.

## Quick start
1. Clone the project from this repository
2. Run `npm install` to install dependencies
3. Import database to your localhost from ./db.sql (located in project root)
4. In the project root, rename file called `env-example.json` to `env-local.json`
5. In this file rewrite database credentials and other parameters with your own
6. Run application from console with `npm run dev`
7. Open http://localhost:3456

## API 
- /authenticate - (POST) - give access token
- /user - (GET) - get all Users
- /user - (POST) - add new User
- /user - (PUT) - change existing User
- /currentUser - (GET) - get authenticated User
- /endpoint - (GET) - get all endpoints for current User
- /endpoint - (POST) - add new endpoint for current User
- /endpoint - (PUT) - change existing Endpoint
- /result - (GET) - get last 10 Results for current User

## Conclusion
This is my very first application in Node.js, but I really enjoyed work in this exercise. There were many problems, that I have to solve, but now, when it's done, I'm so satisfied with my work. Of course, there are many improvements and I'll do it better next time :)
