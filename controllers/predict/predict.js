const tf = require("@tensorflow/tfjs-node");
const { config } = require("dotenv");
// const image = require("get-image-data");
const fs = require("fs");
// var path = require("path");

config()

const classes = ["rock", "paper", "scissors"];

exports.makePredictions = async (req, res, next) => {
  const imagePath = `./tmp/img/${req && req.file.filename}`;
  // console.log(req.file);
  try {
    const loadModel = async (img) => {
      const output = {};
      // laod model
      console.log("Loading.......");
      // local path model
      const handler = tf.io.fileSystem("./model-tfjs/model.json");
      // const handler = tf.io.fileSystem("./model-tfjs-rps/model.json");

      // bucket path model
      // const handler = process.env.GCLOUD_BUCKET_FOR_MODEL
      // console.log(handler);
      const model = await tf.loadLayersModel(handler);

      let predictions = await model.predict(img, { batchSize: 10 }).data();
      // predictions = Array.from(predictions);
      console.log(`prediction : ${predictions}`);
      predictions = Array.from(predictions)
        // Construct
        .map((prob, idx) => {
          // var classes = ['paper', 'rock', 'scissors'];
          return { class: classes[idx], probability: prob };
        })
        // Sort Descending, Get the highest one
        .sort((a, b) => b.probability - a.probability)[0];
      output.success = true;
      output.message = `Success.`;
      output.predictions = predictions;
      res.statusCode = 200;
      res.json(output);
    };
      try {
        const image = fs.readFileSync(imagePath);
        let tensor = tf.node.decodeImage(image);
        const resizedImage = tensor.resizeNearestNeighbor([100, 150]);
        const batchedImage = resizedImage.expandDims(0);
        const input = batchedImage.toFloat().div(tf.scalar(255));
        
        await loadModel(input).then((result) => console.log(result));
        // await loadModel(input);
        // delete image file
        fs.unlinkSync(imagePath, (error) => {
          if (error) {
            console.log('blabla');
            console.error(error);
          }
        });
      } catch (error) {
        res.status(500).json({ message: error, test: "ngab" });
      }
  } catch (error) {
    console.log(error);
  }
};
