module.exports = {
    login: {
        "user_name": {
            notEmpty: true,
            errorMessage: "User-name cannot be empty",
        },
        "password": {
            notEmpty: true,
            errorMessage: "Password cannot be empty",  
        }
    },
    addClient: {
        "company_name":{
            notEmpty: true,
            errorMessage: "Company name cannot be empty",
        },
        "company_email": {
            optional: {
                checkFalsy: true,
            },
            isEmail: true,
            errorMessage: "Enter a valid email address",
        },
        "compnay_mobile": {
            notEmpty: true,
            errorMessage: "Mobile number cannot be empty",
            isLength:{
                options: { min: 10 , max : 10},
                errorMessage: "Enter a valid mobile number"   
            },
        },
        "subscription_start": {
            notEmpty: true,
            isDate: true,
            errorMessage: "Enter valid start date",
        },
        "subscription_end": {
            notEmpty: true,
            isDate: true,
            errorMessage: "Enter valid end date",
        },
        "company_admin_username":{
            notEmpty: true,
            errorMessage: "Admin User-name cannot be empty",
        },
        "company_admin_password":{
            notEmpty: true,
            errorMessage: "Admin Password cannot be empty",
        }
    }
}