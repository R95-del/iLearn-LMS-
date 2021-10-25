const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authroutes = require('./routes/authroutes');
const coookieParser = require('cookie-parser');
const {requireauth,checkUser} = require('./middleware/authmiddleware');
const User = require('./models/User');


//express app
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//database connection
const dbURI = 'mongodb+srv://Rishi:test123@stigefinal.mij9d.mongodb.net/stige_LMS?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then((result) =>app.listen(3000))
 .catch((err) => console.log(err));

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(coookieParser());

//view Engine
app.set('view engine','ejs')


//routes
app.get('*',checkUser);
app.get('/',(req,res)=> {
    res.render('Home')});

app.get('/dashboard',requireauth,(req,res)=> {
    res.render('dashboard')});

app.get('/dashboard/full-stack',(req,res)=>{
    res.render('web')
})
app.get('/dashboard/full-stack/lecture-1',(req,res)=>{
    res.render('web1')
})
app.get('/dashboard/full-stack/lecture-2',(req,res)=>{
    res.render('web2')
})
app.get('/dashboard/full-stack/lecture-3',(req,res)=>{
    res.render('web3')
})
app.get('/about',(req,res)=>{
    res.render('about');
})


app.use(authroutes);


