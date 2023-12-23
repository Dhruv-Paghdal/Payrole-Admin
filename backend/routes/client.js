const clientRouter = require('express').Router();
const clientService = require("../services/clientService");
const validation = require("../helpers/validation");
const {checkSchema} = require('express-validator')
const {check} = require('express-validator')

clientRouter.post("/add",checkSchema(validation.addClient), [
    check('subscription_end').toDate(),
    check('subscription_start').toDate().custom((startDate, { req }) => {
        if (startDate.getTime() > req.body.subscription_end.getTime()) {
            throw new Error('Start date must be before end date');
        }
        return true
    }),
    check('subscription_start').toDate().custom((startDate) => {
        if (new Date(startDate).toLocaleDateString() < new Date().toLocaleDateString()) {
            throw new Error('Start date must be greater then present date');
        }
        return true
    })
], clientService.addClient);
module.exports = clientRouter;