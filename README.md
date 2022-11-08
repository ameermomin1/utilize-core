# Utilize Core
Utilize Core Messaging Application

### Pre Requirements

* Github access

  Go to: https://github.com/ameermomin1/utilize-core

* Clone the repository

  git clone https://github.com/ameermomin1/utilize-core.git

### Requirements

* Node.js v14.17.5+
* Postgres v12+

### Running on local machine

#### Database configuration

* Create a postgres database, and copy its name to DATABASE_NAME in the .env file
* Also update the DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_PORT and DATABASE_HOST if needed

#### Starting the server

* Install dependencies - `npm i`
* Initialize database
  - Create migrations: `npx sequelize db:migrate `
* Run project - `npm start`

Note: First migration must be run with an empty database
