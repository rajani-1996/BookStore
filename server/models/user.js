const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv:user_rajani:pwdrajani@mycluster.98jdk.azure.mongodb.net/eventsdb?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:String,
    password:String
})

// module.exports = mongoose.model('user',userSchema,'users');
var User = mongoose.model('user',userSchema,'users');
module.exports = User;