import multerFilter from "../multerConfigs/multerFilter.js";
import multerDiskStorage from "../multerConfigs/multerDiskStorage.js";
import multer from "multer";

const upload = multer({
    fileFilter: multerFilter,
    storage:multerDiskStorage("review"),
    });

const reviewUploadParserer= upload.fields([{
    name: 'songCover', maxCount: 1
    }, {
    name: 'song', maxCount: 1
    }])

export default reviewUploadParserer;