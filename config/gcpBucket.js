const { Storage } = require("@google-cloud/storage");
const { config } = require("dotenv");
const path = require("path");
config();

const gcs = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: path.resolve("./serviceaccount.json"),
});
// console.log(path.resolve('./serviceaccount.json'));

// const downloadFolderWithTFM = async ()=>

module.exports = { gcs };
