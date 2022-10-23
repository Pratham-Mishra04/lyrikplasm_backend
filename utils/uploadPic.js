import multer from "multer";

const multerStrorage= multer.memoryStorage();  //creates a buffer in the memory

const multerFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image')) cb(null, true)
    else cb(new AppError("Only images files are allowed", 400), false)
}

const uploadPhoto = multer({
    storage: multerStrorage,
    fileFilter: multerFilter,
    limits:{fileSize:15*1024*1024}
})

const uploadPic= name =>(req, res, next)=>{ 
    uploadPhoto.single(`${name}`);
    next()
}

export default uploadPic