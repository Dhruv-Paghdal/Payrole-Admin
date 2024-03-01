const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Client = require('../models/client');
const Company = require('../models/company');
const moment = require('moment');
const dateFormat = "DD-MM-YYYY";

exports.clientList = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({staus:400, message: error.array(), data: ""})
        }
        let sort;
        const conditions = {
            isDeleted: false
        }    
        switch (req.query.sort) {
            case "asc":
                sort = 1;
                break;

            case "desc":
                sort = -1;
                break;
        
            default:
                sort = 1;
                break;
        }
        const countQuery = [{
            $group: {
                _id: null,
                totalCount: {
                    $sum: {
                        $cond: [{$and: []}, 1, 0]
                    }
                }
            }
        }]
        switch (req.query.filter) {
            case "ACTIVE":
                conditions["isActive"] = true;
                countQuery[0].$group.totalCount.$sum.$cond[0].$and.push({
                    $eq: ["$isActive", true]
                })
                break;

            case "INACTIVE":
                conditions["isActive"] = false;
                conditions["subscriptionStart"] = {
                    "$gt": new Date()
                }
                countQuery[0].$group.totalCount.$sum.$cond[0].$and.push({
                    $eq: ["$isActive", false]
                }, {
                    $gt: ["$subscriptionStart", new Date()]
                })
                break;
                
            case "EXPIRED":
                conditions["isActive"] = false;
                conditions["subscriptionStart"] = {
                    "$lt": new Date()
                }
                countQuery[0].$group.totalCount.$sum.$cond[0].$and.push({
                    $eq: ["$isActive", false]
                }, {
                    $lt: ["$subscriptionStart", new Date()]
                })
                break;

            case "DELETED":
                conditions["isActive"] = false;
                conditions["isDeleted"] = true
                countQuery[0].$group.totalCount.$sum.$cond[0].$and.push({
                    $eq: ["$isActive", false]
                }, {
                    $eq: ["$isDeleted", true]
                })
                break;    

            default:
                conditions["isActive"] = true;
                countQuery[0].$group.totalCount.$sum.$cond[0].$and.push({
                    $eq: ["$isActive", true]
                })
                break;
        }
        const totalCount = await Client.aggregate(countQuery);
        if(totalCount[0].totalCount == 0) {
            return res.status(200).json({status:200, message: "No Client list", data: []})   
        }
        const row = req.query.row > 0 ? parseInt(req.query.row) : 5;
        const page = req.query.page > 0 ? parseInt(req.query.page) : 1;
        const offset = (page-1)*row;
        const totalPage = Math.ceil(totalCount[0].totalCount/row);
        const pipeline = [{
            $match: conditions
        }, {
            $sort: {
                companyName: sort
            }
        }, {
            $skip: offset,
        }, {
            $limit: row
        }, {
            $project: {
                _id: 1,
                companyName: 1,
                companyEmail: 1,
                compnayMobile: 1,
                subscriptionStart: 1,
                subscriptionEnd: 1
            }
        }]
        const clients = await Client.aggregate(pipeline);
        if (!clients.length) {
            return res.status(200).json({staus:200, message: "No client List", data: clients})  
        }
        return res.status(200).json({staus: 200, message: "Client list successful", data: [{page: page.toString()+" of "+ totalPage.toString(), list:clients}]})
    } catch (error) {
        console.log(error); 
        return res.status(400).json({staus:400, message: "Error while getting client list", data: ""})
    }
}

exports.clientDetail = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({staus:400, message: error.array(), data: ""})
        }
        const query = {
            isDeleted: false,
            _id: req.params.clientId
        }
        const projection = {
            companyName: 1,
            companyEmail: 1,
            compnayMobile: 1,
            isActive: 1,
            subscriptionStart: 1,
            subscriptionEnd: 1,
            subscriptionHistory: 1,
            companyAdminUsername: 1,
            companyAdminPassword: 1
        }
        const client = await Client.findOne(query, projection);
        if (!client) {
            return res.status(400).json({staus:400, message: "Error while getting client detail", data: ""})  
        }
        return res.status(200).json({staus: 200, message: "Client detail successful", data: client})
    } catch (error) {
        console.log(error); 
        return res.status(400).json({staus:400, message: "Error while getting client detail", data: ""})
    }
}

exports.addClient = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({staus:400, message: error.array(), data: ""})
        }
        const clientConditions = {
            isDeleted: false,
            companyEmail: req.body.company_email,
        }
        const companyConditions = {
            isDeleted: false,
            userName: req.body.company_admin_username,
        }
        const companyExist = await Client.findOne(clientConditions);
        const companyCredExist = await Company.findOne(companyConditions);
        if (companyExist) {
            return res.status(400).json({staus:400, message: "Client email is already in use", data: ""})  
        }
        if (companyCredExist) {
            return res.status(400).json({staus:400, message: "Client credentials is already in use", data: ""})  
        }
        const companyAdminData = {
            userName: req.body.company_admin_username,
            password: bcrypt.hashSync(req.body.company_admin_password, bcrypt.genSaltSync(10))
        } 
        const company = await Company.insertOne(companyAdminData);
        if (!company) {
            return res.status(400).json({staus:400, message: "Error while adding client", data: ""})  
        }
        const clientData = {
            companyAdmin:company._id,
            companyName: req.body.company_name,
            companyEmail: req.body.company_email,
            compnayMobile: req.body.compnay_mobile,
            subscriptionStart: req.body.subscription_start,
            subscriptionEnd: req.body.subscription_end,
            companyAdminUsername: req.body.company_admin_username,
            companyAdminPassword: req.body.company_admin_password,
            subscriptionHistory: [moment(req.body.subscription_start).format(dateFormat) + " TO " + moment(req.body.subscription_end).format(dateFormat)],
            isAdmin: true
        }
        const newClient = await Client.insertOne(clientData); 
        const updateCompany = await Company.updateOne(company._id, {clientID: newClient._id, startDate: newClient.subscriptionStart, endDate: newClient.subscriptionEnd, subscriptionHistory: clientData.subscriptionHistory, email: newClient.companyEmail});
        if (!newClient || !updateCompany) {
            await Company.deleteOne(company._id)
            return res.status(400).json({staus:400, message: "Error while adding client", data: ""})  
        }
        if (moment(newClient.subscriptionStart).format(dateFormat) == moment().format(dateFormat)) {
            const statusChanged = await Client.updateOne(newClient._id, {isActive: true}) && await Company.model.updateOne({clientID: newClient._id}, {isActive: true});
            if (!statusChanged) {
                await Client.deleteOne(newClient._id)
                await Company.deleteOne(company._id)
                return res.status(400).json({staus:400, message: "Error while adding client", data: ""}) 
            }
        }
        return res.status(201).json({staus:201, message: "Client added successfully", data: ""})  
    } catch (error) {
        console.log(error); 
        return res.status(400).json({staus:400, message: "Error while adding client", data: ""}) 
    }
}

exports.updateClient = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({staus:400, message: error.array(), data: ""})
        }
        const clientExist = await Client.findOne({_id: req.params.clientId});
        if (!clientExist) {
            return res.status(400).json({staus:400, message: "Error while getting client detail", data: ""})  
        }
        const payload = {};
        const companyPayload = {};
        if(req.body.status) {
            payload["isActive"] = req.body.status;
            companyPayload["isActive"] = req.body.status;
        }
        else if(req.body.subscription_start && req.body.subscription_end) {
            payload["subscriptionStart"] = req.body.subscription_start;
            payload["subscriptionEnd"] = req.body.subscription_end;
            companyPayload["startDate"] = req.body.subscription_start;
            companyPayload["endDate"] = req.body.subscription_end;
            const existingDate = moment(clientExist.subscriptionStart).format(dateFormat) + "/" + moment(clientExist.subscriptionEnd).format(dateFormat);
            const payloadDate = moment(req.body.subscription_start).format(dateFormat) + "/" + moment(req.body.subscription_end).format(dateFormat);
            const subscriptionAry = clientExist.subscriptionHistory;
            if (existingDate !== payloadDate) {
                if (moment(req.body.subscription_start).format(dateFormat) == moment().format(dateFormat)) {
                    payload["isActive"] = true
                }
                const newSubscription =  moment(req.body.subscription_start).format(dateFormat) + " TO " + moment(req.body.subscription_end).format(dateFormat)
                subscriptionAry.push(newSubscription);
            }
            payload["subscriptionHistory"] = subscriptionAry;
            companyPayload["subscriptionHistory"] = subscriptionAry;
        }
        else{
            return res.status(400).json({staus:400, message: "Error while updating client detail", data: ""})  
        }
        const client = await Client.updateOne(req.params.clientId, payload);
        const company = await Company.updateOne(clientExist.companyAdmin, companyPayload);
        if (!client || !company) {
            return res.status(400).json({staus:400, message: "Error while updating client detail", data: ""})  
        }
        return res.status(200).json({staus: 200, message: "Client detail updated successful", data: client})
    } catch (error) {
        console.log(error); 
        return res.status(400).json({staus:400, message: "Error while updating client detail", data: ""})
    }
}

exports.deleteClient = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({staus:400, message: error.array(), data: ""})
        }
        const clientExist = await Client.findOne({_id: req.params.clientId});
        if (!clientExist) {
            return res.status(400).json({staus:400, message: "Error while getting client detail", data: ""})  
        }
        const payload = {
            isDeleted: true,
            isActive: false
        }
        const client = await Client.updateOne(req.params.clientId, payload);
        const company = await Company.updateOne(clientExist.companyAdmin, payload);
        if (!client || !company) {
            return res.status(400).json({staus:400, message: "Error while deleteing client", data: ""})  
        }
        return res.status(200).json({staus: 200, message: "Client deleted successful", data: client})
    } catch (error) {
        console.log(error); 
        return res.status(400).json({staus:400, message: "Error while deleteing client", data: ""})
    }
}
