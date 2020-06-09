var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var patientsSchema = new Schema({
   firstname :{
        type: String,
        unique : false,
        required : true
    },
    lastname :{
        type: String,
        unique : false,
        required : true
    },
    dateofbirth :{
        type: Date,
        unique : false,
        required : true
    },
    phonenumber : {
        type: String,
        unique : true,
        required : false
    },
    residentialaddress : {
        type: String,
        unique : true,
        required : false
    },
    emergencycontactnumber : {
        type: String,
        unique : false,
        required : false
    }
}, {
    timestamps: true
});

module.exports = patientsSchema;