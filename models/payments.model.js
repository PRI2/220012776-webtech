var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paymentsSchema = new Schema({
    fullname :{
        type: String,
        unique : false,
        required : true
    },
    paymentdate :{
        type: Date,
        default : Date.now,
        required : true
    },
    amountpaid :{
        type: Number,
        required : true,
        default: 0.0
    },
    balanceamount : {
        type: Number,
        required : true
    }
}, {
    timestamps: true
});

module.exports = paymentsSchema;