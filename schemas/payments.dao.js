var mongoose = require('mongoose');
var paymentsSchema = require('../models/payments.model');

paymentsSchema.statics = {
    create : function(data, cb) {
        var payment = new this(data);
        payment.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },
    getByName: function(query, cb) {
        this.find(query, cb);
    },
    getPaymentTotal: function(query){
        this.aggregate([
                       { $group: { _id: null, totalPaid: { $sum: "$amountpaid" } , totalBalance: { $sum: "$balanceamount" } } }
                        ])
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var paymentsModel = mongoose.model('payments', paymentsSchema);
module.exports = paymentsModel;