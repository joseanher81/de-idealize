const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary");
const _ = require("lodash");

cloudinary.config({
  cloud_name: "hallerjoseph",
  api_key: "913535749451377",
  api_secret: "bAghTJdVhDxlM1ruum8S_XV8Akw",
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "deidealize",
  allowedFormats: ["jpg", "png"],
});

const uploadCloudinaryAvatar = multer({ storage });
module.exports = { uploadCloudinaryAvatar };
