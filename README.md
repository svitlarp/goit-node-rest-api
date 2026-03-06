# goit-node-rest-api


Table of contents 
+ About the Project [--->](#about-the-project)
+ API Endpoints [--->](#api-endpoints)
+ Additional Libraries [--->](#additional-libraries)
+ Installation [--->](#installation)
+ Testing the API [--->](#testing-the-api)
+ Default Server URL [--->](#default-server-url)

## About the project
A simple RESTful API built with Express.js for managing contacts.

### API endpoints  

| HTTP Method | Description | Success Response | Error Response |
| --- | --- | --- | --- |
| **GET /api/contacts** |Returns a list of all contacts. | 200 OK |404 Not Found  |
| **GET /api/contacts/:id** |Returns a contact by ID.| 200 /ok | 404 Not Found | 
| **DELETE /api/contacts/:id** |Deletes a contact by ID. | 200 OK | 404 Not Found
| **POST /api/contacts** |Creates a new contact.| 201 Created | 400 Bad request (Missing required field) 
| **PUT /api/contacts/:id** |Updates an existing contact. | 200 OK | 404 Not Found


### Technologies
+ Node.js 
+ Express.js
+ PostgreSQL
+ Sequelize 

### Additional libraries  
- Joi Validation Schema[--->](https://www.npmjs.com/package/joi) Schema description language and data validator for JavaScript  
 - Cors [--->](https://www.npmjs.com/package/cors) Node.js middleware for Express that enables Cross-Origin Resource Sharing (CORS).  
 - Morgan [--->](https://www.npmjs.com/package/morgan) HTTP request logger middleware for Node.js

### Installation

Follow this steps to run the project locally:
1) Clone the repository
```
git clone https://github.com/svitlarp/goit-node-rest-api
cd goit-node-rest-api
```

2) Install dependencies
```
npm install
```

3) Configure environement variables   
Create a .env file in the root directory based on .env.example:
```
cp .env.example .env
```
Update the variables in .env according to your local configuration.   
   
   
4) Start the server
```
npm run dev
```

### Testing the API

You can test the API using  
- Postaman
- curl      

<br/>


### Default server url:
```
http://localhost:3000/api/contacts
```
