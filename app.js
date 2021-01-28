const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ContactRouter = require('./route/contactRoute');
const Auth = require('./route/auth');
const checkUser = require('./middleware/check_auth');
const checkAdmin = require('./middleware/check_admin');


mongoose.connect("mongodb+srv://osama:osama@cluster0.7hvee.mongodb.net/<dbname>?retryWrites=true&w=majority");

const connection = mongoose.connection;

connection.on("connected" , () => {console.log("connected successfully")});
connection.on("error", () => console.log("error in connection"));

app.use([bodyParser.urlencoded({extended : true}), express.json(), cors(), express.urlencoded({extended: true})]);


//
app.use('/user', Auth);
app.get('/contact', checkUser);
app.post('/contact', checkAdmin);
app.use('/contact', ContactRouter);


const port = 3000;

app.listen(3000, ()=> {console.log("server is running......")});

module.exports = app;