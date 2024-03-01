const clientRouter = require('express').Router();
const clientService = require("../services/clientService");
const validation = require("../helpers/validation");
const {checkSchema, query, param} = require('express-validator')
const {check} = require('express-validator');
const moment = require('moment');

clientRouter.get("/list", [
    query('page').notEmpty().withMessage('Page value is requried').isInt().withMessage('Value must be Integer'), 
    query('row').notEmpty().withMessage('Row value is requried').isInt().withMessage('Value must be Integer'),
    query('sort').notEmpty().withMessage('Sort value is requried'),
    query('filter').notEmpty().withMessage('Filter feild value is requried')
], clientService.clientList);

clientRouter.get("/:clientId/detail", param('clientId').notEmpty().withMessage('ClientId value is required'), clientService.clientDetail);

clientRouter.post("/add",checkSchema(validation.addClient), [
    check('subscription_end').custom((startDate, { req }) => {
        if (moment(startDate).format("YYYY-MM-DD").toString() < moment(req.body.subscription_start).format("YYYY-MM-DD").toString()) {
            throw new Error('End date must be after start date');
        }
        return true
    }),
    check('subscription_start').custom((startDate) => {
        if (moment(startDate).format("YYYY-MM-DD").toString() < moment().format("YYYY-MM-DD").toString()) {
            throw new Error('Start date must be greater then present date');
        }
        return true
    })
], clientService.addClient);

clientRouter.put("/:clientId/update", param('clientId').notEmpty().withMessage('ClientId value is required'), clientService.updateClient);

clientRouter.put("/:clientId/delete", param('clientId').notEmpty().withMessage('ClientId value is required'), clientService.deleteClient);

module.exports = clientRouter;