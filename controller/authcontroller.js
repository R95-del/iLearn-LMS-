const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Tasks = require('../models/Tasks');

//handle error
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = {email:'',password:''};

//incorrect Email
if(err.message === 'incorrect email'){
    errors.email = 'that email is not registered';
}
//incorrect password
if(err.message === 'incorrect password'){
    errors.password = 'that password is incorrect';
}
//duplicates error code
if(err.code === 11000){
    errors.email = 'that email is already registered';
    return errors;
}

//validation errors
if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
        
    });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
    return jwt.sign({id},'secret',{
        expiresIn: maxAge
    });
}
 
module.exports.signup_get = (req,res) =>{
    res.render('signup');
}   

module.exports.login_get = (req,res) =>{
    res.render('login');
}

module.exports.signup_post = async(req,res) =>{
    const{ name,email,password} = req.body;

    try{
       const user = await User.create({name,email,password});
       const token = createToken(user._id);
       res.cookie('jwt',token, {httpOnly:true, maxAge: maxAge * 1000});
       res.status(201).json({user: user._id});
    }
    catch (err){
       const errors = handleErrors(err);
        res.status(400).json({errors});
    }
    
}

module.exports.login_post = async (req,res) =>{
    const{ email,password} = req.body;
    
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id);
        res.cookie('jwt',token, {httpOnly:true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id})
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req,res) =>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}   

module.exports.task_get = (req,res) =>{
    var mytask;
    Tasks.find({},(err,data)=>{
         if(err){
            console.log(err);
        }
        if(data){
            mytask = data;
        }
         res.render('tasks',{data:mytask});
    }); 
   
}
 
module.exports.add_task_post = (req,res)=>{
    const task = req.body.task;
    Tasks({task: task }).save(function (err,doc) {
        if(err){
            console.log(err);
        }
        res.redirect('/tasks');
    });
}

module.exports.delete_task_post = (req,res)=>{
    const id = req.body.id;

    Tasks.findOneAndRemove({_id: id},(err,doc)=>{
        res.redirect('/tasks');
    });
}

module.exports.update_task_post = (req,res)=>{
     const id = req.body.id;

     Tasks.findOneAndUpdate({ _id:id},(err,doc)=>{
         res.redirect('/tasks');

     })
}

