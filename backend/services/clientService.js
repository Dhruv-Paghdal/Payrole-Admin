const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Client = require('../models/client');
const Company = require('../models/company');
const changeStatus = require('../helpers/modifyStatus');

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
        const updateCompany = await Company.updateOne(company._id, {clientID: newClient._id});
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

// companyAdmin: {
//     type: ObjectId,
//     required: true,
// },
// isActive:{
//     type: Boolean,
//     default: false,
// },

// yyyy-mm-dd