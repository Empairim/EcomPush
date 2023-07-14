const jwt = require("jsonwebtoken");
const user = require("../model/user");
require('dotenv').config()
const {TOKEN_KEY}=process.env

const verifyToken = async (req,res, next)=>{
    const token = req.body.token ||
        req.query.token ||
        req.params.token ||
        req.headers["x-access-token"] ||
        req.headers.token;

    if(!token){
        return res.status(403).json({errors:["The token is requered either from specified scources Help :- req.body.token || req.query.token || req.params.token || req.headers['x-access-token'] || req.headers.token"]})
    }
    try{
        const decoded = jwt.verify(token,process.env.TOKEN_KEY)

        req.user= decoded;
    }catch(error){
        return res.status(401).json({errors:["The token is invalid "+ error]})
    }
    return next();
}

module.exports = verifyToken
