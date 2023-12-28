const clientRouter = require('express').Router();
const clientService = require("../services/clientService");
const validation = require("../helpers/validation");
const {checkSchema, query, param} = require('express-validator')
const {check} = require('express-validator')

clientRouter.get("/list", [
    query('page').notEmpty().withMessage('Page value is requried').isInt().withMessage('Value must be Integer'), 
    query('row').notEmpty().withMessage('Row value is requried').isInt().withMessage('Value must be Integer'),
    query('sort').notEmpty().withMessage('Sort value is requried'),
    query('filter').notEmpty().withMessage('Filter feild value is requried')
], clientService.clientList);

clientRouter.get("/:clientId/detail", param('clientId').notEmpty().withMessage('ClientId value is required'), clientService.clientDetail);

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

clientRouter.put("/:clientId/update", param('clientId').notEmpty().withMessage('ClientId value is required'), checkSchema(validation.updateClient), clientService.updateClient);

clientRouter.put("/:clientId/delete", param('clientId').notEmpty().withMessage('ClientId value is required'), clientService.deleteClient);

module.exports = clientRouter;