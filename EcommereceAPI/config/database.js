// here the database url should be dynamic and the developer must have the privilage to cghange it to any database any time 
// so do not hardcode it rather make it envirnment based
require('dotenv').config()
const { default: mongoose } = require("mongoose")

const {MONGO_URI}=process.env

exports.connection = () =>{
    // connecting to a database 
    mongoose.connect(MONGO_URI,{
        autoIndex:true,
        autoCreate: true
    })
    .then(()=>{console.log(`The Database at ${ MONGO_URI} connected successfully !` )})
    .catch((error)=>{
            console.log(`The Database at ${MONGO_URI} could not connected due to the ${error} successfully !` )
            process.exit(1);
    })
}