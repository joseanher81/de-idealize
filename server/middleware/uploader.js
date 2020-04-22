require("dotenv").config();

const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary");
const _ = require("lodash");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "deidealize",
  allowedFormats: ["jpg", "png"],
});

const uploadCloudinaryAvatar = multer({ storage });
module.exports = { uploadCloudinaryAvatar };
