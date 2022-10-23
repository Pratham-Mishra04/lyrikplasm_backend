import multer from "multer";
import multerFilter from "../multerConfigs/multerFilter.js";
import multerDiskStorage from "../multerConfigs/multerDiskStorage.js";

const upload = multer({
    fileFilter: multerFilter,
    storage:multerDiskStorage("song"),
    limits:{fileSize:15*1024*1024}
    });

const songUploadParserer= upload.fields([{
    name: 'songCover', maxCount: 1
    }, {
    name: 'song', maxCount: 1
    }])

export default songUploadParserer;