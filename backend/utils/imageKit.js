// imageKit.js
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const initImageKit = function () {
  var imagekit = new ImageKit({
    publicKey: process.env.PUBLICK_KEY_IMAGEKIT,
    privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
    urlEndpoint: process.env.ENDPOINT_URL_IMAGEKIT,
  });

  return imagekit;
};

export { initImageKit };
