const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var bodyparser = require('body-parser');


const mongoose = require('mongoose');
const BookData = require('./models/bookdata');
const User = require('./models/user');

const db ="mongodb+srv://user_rajani:pwdrajani@mycluster.98jdk.azure.mongodb.net/BookStore?retryWrites=true&w=majority";
mongoose.connect(db,err=>{
    if(err){
        console.error('Error!' + err)
    }else{
        console.log('Connected to mongodb');
    }
});

var bookController = require('./controllers/bookcontroller.js')
 
var app = new express();
app.use(bodyparser.json());
app.use(cors());


app.use('/book',bookController);

function verifyToken(req,res,next){
    if (!req.headers.authorization){
         return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()

}


app.get('/books',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    BookData.find()
          .then(function(books){
              res.send(books);
          });
});
app.post('/insert',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);

var book ={
    bookId : req.body.book.bookId,
    bookName : req.body.book.bookName,
    bookCode : req.body.book.bookCode,
    authorName : req.body.book.authorName,
    description : req.body.book.description,
    price : req.body.book.price,
    starRating : req.body.book.starRating,
    imageUrl : req.body.book.imageUrl

}
var book = new BookData(book);
book.save();
});


app.post('/edit',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

    var book ={
        bookId : req.body.book.bookId,
        bookName : req.body.book.bookName,
        bookCode : req.body.book.bookCode,
        authorName : req.body.book.authorName,
        description : req.body.book.description,
        price : req.body.book.price,
        starRating : req.body.book.starRating,
        imageUrl : req.body.book.imageUrl
    
    }
console.log("Data got in server in edit " +book._id);
BookData.updateOne(
    {_id:req.body.bookItem._id},{$set:book},
     function(err,res){
     if(err){
         console.log(err)
        }
    }
     )
     
});

app.post('/delete',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

    var book ={
        bookId : req.body.book.bookId,
        bookName : req.body.book.bookName,
        bookCode : req.body.book.bookCode,
        authorName : req.body.book.authorName,
        description : req.body.book.description,
        price : req.body.book.price,
        starRating : req.body.book.starRating,
        imageUrl : req.body.book.imageUrl
    
    }
console.log("backend server item is " +book._id);
BookData.deleteOne(
    {_id:req.body.bookItem._id})
    .then(function(books){
        res.send(books);
    });
    console.log('remove() is executed')

});


app.post('/register',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS")
     let userData= req.body;
     let user = new User(userData);
     user.save((err,registeredUser)=>{
         if(err){console.log(err)}
         else{
            let payload = {subject:user._id}
            let token = jwt.sign(payload,'secretKey') 
            res.status(200).send({token})}

     })

     

})

app.post('/login',(req,res)=>{
    let userData =req.body;
    User.findOne({email: userData.email},(err,user)=>{
        if(err)
            {
                console.log(err);
            }
        else{
            if(!user)
                {
                    res.status(401).send('inavlid email')
                }
            else {
               if(user.password != userData.password)
                {
                    res.status(401).send('invalid password')
                }
            else{
                if(user.email =='rajanirussal@gmail.com' && user.password == 'admin')
                {
                    console.log("hello")
                    let token ="admin"
                    res.status(200).send({token,admin})
                }
                else{
                    console.log("hi")
                    console.log(user.password)
                    let token='user'
                    res.status(200).send({token,user})

                      // let payload = {subject:user._id}
                // let token = jwt.sign(payload,'secretKey') 
                
                }
              
                
                }
            }
        }
    })


})


    app.listen(3000,function(){
        console.log('listening to port 3000');
    });
