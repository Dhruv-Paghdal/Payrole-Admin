const indexRouter = require('express').Router();
const indexService = require('../services/indexService');
const validation = require("../helpers/validation");
const { checkSchema } = require('express-validator');

indexRouter.post("/login", checkSchema(validation.login), indexService.login);

module.exports = indexRouter;