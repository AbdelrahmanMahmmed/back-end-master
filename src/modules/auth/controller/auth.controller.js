const register = require('./functions/register');
const login = require('./functions/forgotpassword');
const forgotpassword = require('./functions/forgotpassword');
const middlewareFunctions = require('./functions/middlewareFunctions');

module.exports  = {
    register,
    login,
    middlewareFunctions,
    forgotpassword
}