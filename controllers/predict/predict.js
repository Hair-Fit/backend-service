const { default: axios } = require("axios");
const { config } = require("dotenv");
const FormData = require("form-data");
// const image = require("get-image-data");
const fs = require("fs");
const { getImgByShape } = require("../bucket/getImg");
const { UserRecord } = require("../../models/UserRecord");
// var path = require("path");

config();

exports.makePredictions = async (req, res, next) => {
  const imagePath = `./tmp/img/${req && req.file.filename}`;
  const formData = new FormData();
  let img = fs.createReadStream(imagePath);
  formData.append("file", img);

  const { data } = await axios.post("https://hf-model-bic7f3q5oq-as.a.run.app/predict", formData, {
    headers: {
      ...formData.getHeaders(),
    },
  }).catch(err=>console.error(err));
  // console.log(data);
  fs.unlinkSync(imagePath, (error) => {
    if (error) {
      // console.error(error);
      console.log("error");
    }
  });
  const imgUrl = await getImgByShape(data.answer, req.user.id)
  console.log(req.user.id);
  UserRecord.create({
    prediction : data.answer,
    img : req.file.filename,
    userId : req.user.id
  })
  // const result = {
  //   prediction:data.answer,
  //   recommendation:imgUrl
  // }
  return res.json(imgUrl);
};

exports.getHistory = async (req,res,next)=>{
  return res.json(await UserRecord.findAll({attributes:['img','createdAt','prediction'],where:{userId:req.user.id},raw:true})) 
}
