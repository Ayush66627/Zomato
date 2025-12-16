require("dotenv").config();
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");


const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  try {
    const fileObj = await toFile(file.buffer, file.originalname);

    const response = await imagekit.files.upload({
      file: fileObj,
      fileName: fileName,
      isPrivateFile: false,
    });

    console.log("Upload success! URL:", response.url);
    return {
      success: true,
      url: response.url,
      fileId: response.fileId,
    };
  } catch (error) {
    console.error("ImageKit Upload Error:", error.message);
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

module.exports = { uploadFile };
