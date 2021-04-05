const multer = require("multer");

exports.uploadFile = (imageFile) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // rename file
    },
  });

  //filter
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeMB = 100;
  const maxSize = sizeMB * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: imageFile,
      maxCount: 1,
    },
  ]);

  //return middlewares handle
  return (req, res, next) => {
    upload(req, res, (error) => {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.files && !error)
        return res.status(400).send({
          message: "Please select files to upload",
        });
      if (error) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "max file size 100MB",
          });
        }
        return res.status(400).send(error);
      }
      return next();
    });
  };
};
