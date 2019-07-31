const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id   : mongoose.Schema.Types.ObjectId,
    firstName : String,
    lastName : String,
    fullName : String,
    email : { 
        type : String, 
        required : true, 
        unique : true, 
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : { type : String , required :true },
    photo : { type : String  },
    City : String,
    State : String,
    Zip : String,
});

module.exports = mongoose.model('User', userSchema)