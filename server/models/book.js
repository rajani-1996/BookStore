const mongoose = require('mongoose');

var Book = mongoose.model('Book',{
     name:{type: String},
     code : {type: Number},
     colour : {type:String},
     count : {type:Number}
     },'book');
     module.exports ={ Book }; 