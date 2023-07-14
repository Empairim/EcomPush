const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName:{type:String,default:null},
        lastName:{type:String,default:null},
        email:{type:String,default:null},
        password:{type:String,default:null},        
        token:{type:String,default:null},
        roles:{type:[String],enum:['admin','user','sales','accounts','warehouse'], default:'user'},

    }
)

module.exports = mongoose.model('user',userSchema);