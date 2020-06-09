var express = require('express') //add the expressjs library
var session = require('express-session');
var flash = require('express-flash');
var path = require('path');

var cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');




var log = require('morgan')('dev');
const bodyParser= require('body-parser')

var properties = require('./config/properties');
var db = require('./config/database');

var appRoutes = require('./config/route');

var app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash());
app.use(cookieParser());

const authTokens = {};


app.use(express.static('public'))


app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'secret',
                  resave: false, 
                  saveUninitialized: false}));

//initialise express router
var router = express.Router();

db();

app.use(log);
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(express.json());



app.use('/', router);

appRoutes(router);

app.use((req, res, next) => {
    // Get auth token from the cookies
    const authToken = req.cookies['AuthToken'];

    // Inject the user to the request
    req.user = authTokens[authToken];

    next();
});

// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });


// intialise server
app.listen(properties.PORT, (req, res) => {
    console.log(`Application Server is running on ${properties.PORT} port.`);
})