
const multer = require("multer")

var diskStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){        
        let fileName = file.mimetype.split("/");

        let fileExt = fileName.length >1?fileName[1]:"No";        
        cb(null,file.fieldname + '-'+Date.now()+"."+fileExt)
    }
});


module.exports= diskStorage