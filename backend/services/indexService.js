const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require("../models/user");


exports.login= async(req, res)=>{
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({staus:400, message: error.array(), data: ""})
        }
        const conditions = {
            "isDeleted": false,
            "userName": `${req.body.user_name}`
        };
        const userExist = await User.findOne(conditions);
        if (!userExist) {
            return res.status(401).json({status: 401, message: "Invalid mobile number or password", data: ""})
        }
        const comparePassword = await bcrypt.compare(req.body.password, userExist.password);
        if (!comparePassword) {
            return res.status(401).json({status: 401, message: "Invalid mobile number or password", data: ""})
        }
        const data = {
            userType: userExist.userType,
            id: userExist._id
        }
        const token = jwt.sign(data, process.env.JWT_KEY);
        if(!token){
            return res.status(400).json({staus:400, message: "Error while login", data: ""}) 
        }
        return res.status(200).json({status: 200, message: "Login Successfull", data: token})
    } catch (error) {
        return res.status(400).json({staus:400, message: "Error while login", data: ""}) 
    }
}