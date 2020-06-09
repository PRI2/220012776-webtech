var Patients = require('../controllers/patients_controller');
var Payments = require('../controllers/payments_controller');

const authTokens = {};
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
 }

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

const users = [
    // This user is added to the array to avoid creating a new user on each restart
    {
        firstName: 'Prince',
        lastName: 'Kwarteng',
        email: 'princekwartengadomako@gmail.com',
        // This is the SHA256 hash for value of `password`
        password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
    }
];


module.exports = function(router) {
	router.get('/', function(req, res) {
 		   res.render('index')
    })
	router.get('/register', (req, res) => {
    	res.render('register');
	});
	router.post('/register', (req, res) => {


    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPassword) {

        // Check if user with the same email is also registered
        if (users.find(user => user.email === email)) {

            res.render('register', {
                message: 'User already registered.',
                messageClass: 'alert-danger'
            });

            return;
        }

        const hashedPassword = getHashedPassword(password);

        // Store user into the database if you are using one
        users.push({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.render('login', {
            message: 'Registration Complete. Please login to continue.',
            messageClass: 'alert-success'
        });
    } else {
        res.render('register', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }
	})
  router.post('/login', (req, res) => {

    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = users.find(u => {
        return u.email === email && hashedPassword === u.password
    });

    

    if (user) {
        const authToken = generateAuthToken();

        // Store authentication token
        authTokens[authToken] = user;

        // Setting the auth token in cookies
        res.cookie('AuthToken', authToken);

        // Redirect user to the protected page
        res.redirect('/admin');
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }
});
router.get('/admin', (req, res) => {
    if (req.user) {
        res.render('admin');
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
});
    router.post('/admin/addPayment',Payments.createPayment)
	router.post('/admin/addPatient', Patients.createPatient) 
	router.post('/admin/updatePayment/:id',Payments.updatePayment)
	router.post('/admin/updatePatient/:id', Patients.updatePatient) 

	router.get('/admin/deletePayment/:id',Payments.removePayment)
	router.get('/admin/deletePatient/:id', Patients.removePatient) 

    router.get('/admin/patients', Patients.getPatients)   
    router.get('/admin/payments', Payments.getPayments)   

    router.get('/admin/editPayment/:id', Payments.getPayment)   
    router.get('/admin/editPatient/:id', Patients.getPatient)   

    router.get('/admin/addPatient', function (req, res) {
     res.render('new_patient')
    })   
    router.get('/admin/addPayment', Payments.newPayment)  
    router.get('/login', function (req, res) {
     res.render('login')
    })   
}
