import AppError from "../../managers/AppError.js"

const multerFilter = (req, file, cb)=>{  //runs for each file
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

export default multerFilter;