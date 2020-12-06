const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const session = require('express-session');
var validator = require('express-validator');
dotenv.config({ path: './.env'});

const app = express();

//CREATE A CONNECTION WITH THE DATABASE, IN THIS CASE MYSQL
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
});

const publicdir = path.join(__dirname, './public');                        //__dirname gives the path of the current directory of your project
app.use(express.static(publicdir));

//To parse url encoded bodies
app.use(express.urlencoded({extended:false}));
//app.use(validator());      //
//to parse json bodies
app.use(express.json());
//cookieParser used to set up cookies in our browser
app.use(cookieParser());    //use this to manage cookies, terminate sessions
//app.use(session({secret : }))
app.set('view engine', 'hbs');


//CONNECT TO THE MYSQL DATABASE
db.connect( (error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log('connected to mysql database');
    }
})

//Define Routes

app.use('/', require('./routes/pages'));    
app.use('/loggedin', require('./routes/pages'));

app.use('/auth', require('./routes/auth'))

app.listen(3000, () => {
    console.log("server up and running on 3000");
});
