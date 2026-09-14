import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        const uploadPath = path.join(
            process.cwd(),
            "uploads",
            "portfolio"
        );

        fs.mkdirSync(uploadPath, {
            recursive: true
        });

        cb(null, uploadPath);
    },


    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }

});


const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];


    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed."
            ),
            false
        );

    }

};


const portfolioUpload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});


export default portfolioUpload;