//importing important modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // conncting database by mongoose
const session = require('express-session'); // session-cookie managing tools
const MongodbStore = require('connect-mongodb-session')(session); // modules storing session to mongodb
const flash = require('connect-flash');

// our mongodb database link
const dbLink = 'mongodb://localhost:27017/dreamEms';

//initializing modules
const app = express();

// storing session into mongodb
const store = new MongodbStore({
    uri: dbLink,
    collection: 'sessions'
});

//setting up web environment
const PORT = process.env.PORT || 3000;

app.set('view engine','pug');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//session middleware function to handle session
app.use(session({secret: 'Hello why when', resave: false, saveUninitialized: false, store}));
app.use(flash());//flash initialization after session

//importing routes
const userRoute = require('./routes/user');

//setting routes
app.use('/user', userRoute);
// starting my app 
mongoose.connect(dbLink ).then(()=>{
    app.listen(PORT, console.log('Connected to port: ', PORT));
}).catch(err=>{
    console.log(err);
})
