const mongoose  = require('mongoose');

const connectAdminDB = () => {
    try {
        return mongoose.createConnection(process.env.ADMIN_DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
    } catch (error) {
        console.log("Opps, Error while connecting with DB!!!!");
        console.log(error);
    }
}

const connectClientDB = () => {
    try {
        return mongoose.createConnection(process.env.DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
    } catch (error) {
        console.log("Opps, Error while connecting with DB!!!!");
        console.log(error);
    }
}


module.exports = { connectAdminDB, connectClientDB }