const mongoose = require('mongoose');
const {connectClientDB} = require('../services/databaseService');
const ObjectId = mongoose.Types.ObjectId;

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'companies',
}

const companySchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.ObjectId,
    },
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    mobile: {
        type: String
    },
    companyCode: {
        type: String
    },
    companyAddress: {
        addressLine1: {
            type: String,
        },
        addressLine2: {
            type: String,
        },
        city: {
            type: String,
        }
    },
    ownerDetail:{
        name: {
            type: String,
        },
        mobile: {
            type: String,
        },
        email: {
            type: String,
        }
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        default: false,
        type: Boolean
    }
}, options);

const Company = connectClientDB().model('Company', companySchema);

module.exports = {
    model: Company,
    insertOne: async(payload) => {
        try {
            return await Company.create(payload);
        } catch (error) {
            throw error;
        }
    }, 
    findAll: async(query, projection) => {
        try {
            return await Company.find(query, projection)
        } catch (error) {
            throw error;
        }
    },
    findOne: async(query, projection) => {
        try {
            return await Company.findOne(query, projection);
        } catch (error) {
            throw error;
        }
    }, 
    deleteOne: async(id) => {
        try {
            return await Company.updateOne({_id: new ObjectId(id)}, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateOne: async(id, payload) => {
        try {
            return await Company.updateOne({_id: new ObjectId(id)}, {$set:payload});
        } catch (error) {
            throw error;
        }
    }, 
    deleteMany: async(query) => {
        try {
            return await Company.updateMany(query, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateMany: async(query, payload) => {
        try {
            return await Company.updateMany(query, {$set:payload});
        } catch (error) {
            throw error;
        }
    }, 
    aggregate: async(pipeline) => {
        try {
            return await Company.aggregate(pipeline);
        } catch (error) {
            throw error;
        }
    }
};