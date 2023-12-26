const Client = require('../models/client');
const Company = require('../models/company');

const changeStatus = async(id, status) => {
    const payload = {
        isActive: false
    }
    switch (status) {
        case "active":
            payload["isActive"] = true;
            break;

        case "inactive":
            payload["isActive"] = false;
            break;
    
        default:
            payload["isActive"] = false;
            break;
    }
    const statusChanged = await Client.updateOne(id, payload) && await Company.model.updateOne({clientID: id}, payload);
    if (!statusChanged) {
        return false;
    }
    return true;
};

module.exports = changeStatus;