require('dotenv').config();
const cros = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services/databaseService');
const indexRoute = require('./routes/index');
const clientRoute = require('./routes/client');
const middleware = require('./middleware/userType');
const {removeClientAdminCredCron, startSubcriptionCron, endSubcriptionCron} = require('./helpers/crons');
const PORT = process.env.APP_PORT;
const app = express();

app.use(cros());

app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());
app.use("/index", indexRoute);
app.use(middleware.isAccessable(["super-admin"]));
app.use("/client", clientRoute);

removeClientAdminCredCron();
startSubcriptionCron();
endSubcriptionCron();

app.listen(PORT, ()=>{
    console.log(`App listing on http://localhost:${PORT}`)
});
