const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Client = require('../models/client');
const Company = require('../models/company');
const changeStatus = require('../helpers/modifyStatus');

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
        switch (req.query.filter) {
            case "ACTIVE":
                conditions["isActive"] = true;
                break;

            case "INACTIVE":
                conditions["isActive"] = false;
                conditions["subscriptionStart"] = {
                    "$gt": new Date()
                }
                break;
                
            case "EXPIRED":
                conditions["isActive"] = false;
                conditions["subscriptionStart"] = {
                    "$lt": new Date()
                }
                break;

            default:
                conditions["isActive"] = true;
                break;
        }
        const row = req.query.row > 0 ? parseInt(req.query.row) : 5;
        const page = req.query.page > 0 ? parseInt(req.query.page) : 1;
        const offset = (page-1)*row;
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
        if (!clients) {
            return res.status(400).json({staus:400, message: "Error while getting client list", data: ""})  
        }
        return res.status(200).json({staus: 200, message: "Client list successful", data: clients})
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
            subscriptionEnd: 1
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
        const conditions = {
            isDeleted: false,
            companyEmail: req.body.company_email
        }
        const companyExist = await Client.findOne(conditions);
        if (companyExist) {
            return res.status(400).json({staus:400, message: "Client email is already in use", data: ""})  
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
        }
        const newClient = await Client.insertOne(clientData); 
        const updateCompany = await Company.updateOne(company._id, {clientID: newClient._id, startDate: newClient.subscriptionStart, endDate: newClient.subscriptionEnd});
        if (!newClient || !updateCompany) {
            await Company.deleteOne(company._id)
            return res.status(400).json({staus:400, message: "Error while adding client", data: ""})  
        }
        if (new Date(newClient.subscriptionStart).toLocaleDateString() == new Date().toLocaleDateString()) {
            const response = changeStatus(newClient._id, "active");
            if (!response) {
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
