const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {connectAdminDB} = require('../services/databaseService');

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'users',
}
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        default: "member",
        enum: ["member", "super-admin"]
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, options);

const User = connectAdminDB().model("User", userSchema);

module.exports = {
    model: User,
    insertOne: async(payload) => {
        try {
            return await User.create(payload);
        } catch (error) {
            throw error;
        }
    }, 
    findAll: async(query, projection) => {
        try {
            return await User.find(query, projection)
        } catch (error) {
            throw error;
        }
    },
    findOne: async(query, projection) => {
        try {
            return await User.findOne(query, projection);
        } catch (error) {
            throw error;
        }
    }, 
    deleteOne: async(id) => {
        try {
            return await User.updateOne({_id: new ObjectId(id)}, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateOne: async(id, payload) => {
        try {
            return await User.updateOne({_id: new ObjectId(id)}, {$set:payload});
        } catch (error) {
            throw error;
        }
    }, 
    updateMany: async(query, payload) => {
        try {
            return await User.updateMany(query, {$set:payload});
        } catch (error) {
            throw error;
        }
    },
    aggregate: async(pipeline) => {
        try {
            return await User.aggregate(pipeline);
        } catch (error) {
            throw error;
        }
    }
};