import path from 'path'
import multer from 'multer';

const multerDiskStorage = modelName => multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, `./public/${modelName}Requests/${file.fieldname}s`)
    },
    filename: function(req, file, callback) {
        const name=`${req.body.songName}-${req.user.name}-${Date.now()}`+ path.extname(file.originalname);
        req.body[`${file.fieldname}`] = name
        callback(null, name);
    }
})

export default multerDiskStorage;