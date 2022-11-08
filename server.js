const express = require("express");
const bodyParser = require("body-parser");
const v1routers = require("./api/index");
const dotenv = require("dotenv");
dotenv.config();
const  { sequelize } = require("./models/index.js");

const app = express();

app.use(bodyParser.json());

app.use('/api/v1', v1routers);

sequelize.authenticate()
.then( async () => {
    console.log('Connected to the database.');
    const server = app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is listing at port ${process.env.SERVER_PORT}`)
    });
    server.timeout = 600000;
}).catch((error) => {
    console.log('Failed to connect the database', error);
})