const register = require('./functions/Register');
const login = require('./functions/Login');
const forgotpassword = require('./functions/forgotpassword');
const middlewareFunctions = require('./functions/middlewareFunctions');

module.exports  = {
    register,
    login,
    middlewareFunctions,
    forgotpassword
}