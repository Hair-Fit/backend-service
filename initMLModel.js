const extract = require("extract-zip");
const path = require("path");
const fs = require("fs");
const { gcs } = require("./config/gcpBucket");
const { config } = require("dotenv");

config()
// this is branch that keep tfjs
const extractFolder = async () => {
  const zipFile = path.resolve(process.env.ML_MODEL_ZIP);
  const modelFolder = zipFile.split(".")[0];
  try {
    await extract(zipFile, { dir: path.resolve(modelFolder) });
    fs.unlink(zipFile,(err=>{if(err)console.log(err);}))
    console.log("Extraction complete");
  } catch (err) {
    // handle any errors
    console.error(err);
  }
};

const downloadModelZip = async () => {
  try {
    await gcs
      .bucket("tfjs-model-hair-fit")
      .file(process.env.ML_MODEL_ZIP)
      .download({ destination: path.resolve(process.env.ML_MODEL_ZIP) }).then(async()=>await extractFolder())
    return console.log('Finish');
  } catch (error) {
    console.log(error);
  }
};

downloadModelZip().catch(err=>console.log(err))