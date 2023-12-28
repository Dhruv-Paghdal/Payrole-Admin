const mongoose = require('mongoose');
const {connectAdminDB} = require('../services/databaseService');
const ObjectId = mongoose.Types.ObjectId;

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'clients',
}
const clientSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
    },
    compnayMobile: {
        type: String,
        required: true,
    },
    companyAdmin: {
        type: ObjectId,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: false,
    },
    subscriptionStart: {
        type: Date,
        required: true,
    },
    subscriptionEnd: {
        type: Date,
        required: true,
    },
    subscriptionHistory: {
        type: [String],
        default: []
    },
    companyAdminUsername:{
        type: String,
        required: true,
    },
    companyAdminPassword:{
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, options);

const Client = connectAdminDB().model("Client", clientSchema);

module.exports = {
    model: Client,
    insertOne: async(payload) => {
        try {
            return await Client.create(payload);
        } catch (error) {
            throw error;
        }
    }, 
    findAll: async(query, projection) => {
        try {
            return await Client.find(query, projection)
        } catch (error) {
            throw error;
        }
    },
    findOne: async(query, projection) => {
        try {
            return await Client.findOne(query, projection);
        } catch (error) {
            throw error;
        }
    }, 
    deleteOne: async(id) => {
        try {
            return await Client.updateOne({_id: new ObjectId(id)}, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateOne: async(id, payload) => {
        try {
            return await Client.updateOne({_id:  new ObjectId(id)}, {$set:payload});
        } catch (error) {
            throw error;
        }
    },
    updateMany: async(query, payload) => {
        try {
            return await Client.updateMany(query, {$set:payload});
        } catch (error) {
            throw error;
        }
    },
    aggregate: async(pipeline) => {
        try {
            return await Client.aggregate(pipeline);
        } catch (error) {
            throw error;
        }
    }
};