const Client = require('../models/client');
const Company = require('../models/company');

const changeStatus = async(id, status) => {
    const payload = {
        isActive: false
    }
    if (status == "active") {
        payload["isActive"] = true
    }
    const subscriptionStart = await Client.updateOne(id, payload) && await Company.updateMany({clientID: id}, payload);

    if (!subscriptionStart) {
        return false;
    }
    return true;
};

module.exports = changeStatus;