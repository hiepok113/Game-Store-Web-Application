const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
