import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";


const destination = path.resolve("temp");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

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
    // const fileExtension = path.extname(file);
    // console.log(fileExtension);
    const fileExtension = file.originalname.split('.').pop();
    if (fileExtension === "exe") {
       return cb(HttpError(400, ".exe file are not allowed"));
    }
    cb(true, true);
    // cb(true, false) ? fileExtension === "exe" :  cb(true, true);
}

const upload = multer({ 
    storage,
    limits,
    fileFilter,
 })

export default upload;
