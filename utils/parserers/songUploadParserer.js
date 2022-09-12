import multer from "multer";
import multerFilter from "../multerConfigs/multerFilter.js";
import multerDiskStorage from "../multerConfigs/multerDiskStorage.js";

const upload = multer({
    fileFilter: multerFilter,
    storage:multerDiskStorage("song"),
    });

const songUploadParserer= upload.fields([{
    name: 'songCover', maxCount: 1
    }, {
    name: 'song', maxCount: 1
    }])

export default songUploadParserer;