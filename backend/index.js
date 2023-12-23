require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services/databaseService');
const indexRoute = require('./routes/index');
const clientRoute = require('./routes/client');
const middleware = require('./middleware/userType');
const PORT = process.env.APP_PORT;
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());
app.use("/index", indexRoute);
app.use(middleware.isAccessable(["super-admin"]));
app.use("/client", clientRoute);

app.listen(PORT, ()=>{
    console.log(`App listing on http://localhost:${PORT}`)
})
