import upload from "../config/multer.js";

const handleImageUpload = (req, res, next) => {
  console.log("Multer upload initiated");

  const uploadMiddleware = upload.single("image");
  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err.message);
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

export default handleImageUpload;
