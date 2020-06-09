var Payments = require('../schemas/Payments.dao');
var Patients = require('../schemas/Patients.dao');

exports.createPayment = function (req, res, next) {
    var payment = {
        fullname: req.body.fullname,
        amountpaid: req.body.amountpaid,
        balanceamount: req.body.balanceamount,
    };

    Payments.create(payment, function(err, payment) {
       if(err) {
               req.flash('error', 'Could Not Create Payment Record');
        }
        
        req.flash('success', 'Payment created successfully');
        res.redirect('/admin/payments')
    })
}

exports.newPayment = function(req,res,next){

    Patients.get({}, function(err, data) {
         if(err) {
                res.render('patients', err)
        }

        res.render('new_payment', { patients: data})
     })
}

exports.getPayments = function(req, res, next) {
    Payments.get({}, function(err, payments) {
        if(err) {
            res.json({
                error: err
            })
        }

        if(err) {
             
        }
        res.render('payments', { payments: payments})
    })
}

exports.getPayment = function(req, res, next) {
    
    let payment = null
    let patients = null

    Payments.get({_id: req.params.id}, function(err, payment) {
        if(err) {
            res.json({
                error: err
            })
        }
        
        Patients.get({}, function(err, data) {
         if(err) {
                res.render('patients', err)
        }
    
         patients =  data;
         payment = payment[0];

         res.render('edit_payment', { payment: payment, patients: patients})
     })
     
    })
}

exports.updatePayment = function(req, res, next) {
    var payment = {
        fullname: req.body.fullname,
        amountpaid: req.body.amountpaid,
        balanceamount: req.body.balanceamount,
    };

    Payments.update({_id: req.params.id}, payment, function(err, payment) {
        if(err) {
            res.json({
                error : err
            })
        }
        req.flash('success', 'Payment updated successfully');
        res.redirect('/admin/payments')
    })
}

exports.removePayment = function(req, res, next) {
    Payments.delete({_id: req.params.id}, function(err, payment) {
        if(err) {
            res.json({
                error : err
            })
        }
         req.flash('success', 'Payment deleted successfully');
         res.redirect('/admin/payments')
    })
}