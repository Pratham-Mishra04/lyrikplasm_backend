import multer from "multer";
import AppError from "../../managers/AppError.js";
import path from 'path'

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, `./public/songRequests/${file.fieldname}s`)
    },
    filename: function(req, file, callback) {
        const rand=Date.now() + path.extname(file.originalname);
        const name=`${req.body.name}-${req.user.name}-${Date.now()}`+ path.extname(file.originalname);
        req.body[`${file.fieldname}`] = name
        callback(null, file.fieldname + '-' + name);
    }

})

const multerFilter = (req, file, cb)=>{    //runs for each file
    if(file.fieldname=='songCover'){ 
        if(file.mimetype.startsWith('image')) cb(null, true)
        else cb(new AppError("Only images files are allowed", 400), false)
    }
    else if(file.fieldname=='song'){
        if(file.mimetype.startsWith('audio')) cb(null, true)
        else cb(new AppError("Only audio files are allowed", 400), false)
    }
    else cb(new AppError("Invalid input", 400), false)
}

const upload = multer({
    fileFilter: multerFilter,
    storage:storage
    });

const songUploadParserer= upload.fields([{
    name: 'songCover', maxCount: 1
    }, {
    name: 'song', maxCount: 1
    }])

export default songUploadParserer;