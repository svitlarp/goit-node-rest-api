import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";


const destination = path.resolve(process.cwd(), "../temp");

const storage = multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
        const uniqPrefix = `${Date.now()}_${Math.round(Math.random()*1E9)}`;
        const filename = `${uniqPrefix}_${file.originalname}`;
        cb(null, filename);
    }
})

const limits = {
    fileSize: 1024 * 1024 * 10,
}

const fileFilter = (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    if (fileExtension === "exe") {
       return cb(HttpError(400, ".exe file are not allowed"));
    }
    cb(null, true);
}

const upload = multer({ 
    storage,
    limits,
    fileFilter,
 })

export default upload;
