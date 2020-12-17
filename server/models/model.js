const mongoose=require('mongoose');
const Schema=mongoose.Schema

const User =new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email: {
        type: String,
        unique: true // `email` must be unique
      },
    phone:{
        type:Number
    },
    profieImage:{
            type: String,
            trim: true,
            default: null
    }
})

module.exports = mongoose.model('users', User)