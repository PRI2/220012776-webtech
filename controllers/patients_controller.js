var Patients = require('../schemas/Patients.dao');

exports.createPatient = function (req, res, next) {
    var patient = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dateofbirth: req.body.dateofbirth,
        phonenumber: req.body.phonenumber,
        residentialaddress: req.body.residentialaddress,
        emergencycontactnumber: req.body.emergencycontactnumber
    };

    Patients.create(patient, function(err, patient) {
        if(err) {
            // req.flash('error', err)
            res.render('new_patient')
        }

        // req.flash('success', 'Patient successfully added');
        res.redirect('/admin/patients')
    })
}

exports.getPatients = function(req, res, next) {
    Patients.get({}, function(err, data) {
         if(err) {
                res.render('patients', { patients: err, messages: {}})
        }
        else
        {
            res.render('patients', { patients: data, messages: {}})
        }

    })
}

exports.getPatient = function(req, res, next) {

    
    Patients.get({_id: req.params.id}, function(err, patient) {
        if(err) {
            res.json({
                error: err
            })
        }
      
        res.render('edit_patient', { patient: patient[0]})
    })
}

exports.updatePatient = function(req, res, next) {
    var patient = {
        phonenumber: req.body.firstname,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dateofbirth: req.body.dateofbirth,
        phonenumber: req.body.phonenumber,
        residentialaddress: req.body.residentialaddress,
        emergencycontactnumber: req.body.emergencycontactnumber
    };

    Patients.update({_id: req.params.id}, patient, function(err, patient) {
        if(err) {
            res.json({
                error : err
            })
        }
         req.flash('success', 'Patient updated successfully');
         res.redirect('/admin/patients')
    })
}

exports.removePatient = function(req, res, next) {
    Patients.delete({_id: req.params.id}, function(err, patient) {
        if(err) {
            res.json({
                error : err
            })
        }

         req.flash('success', 'Patient deleted successfully');
         res.redirect('/admin/patients')
    })
}