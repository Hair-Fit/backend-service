const { gcs } = require("../../config/gcpBucket");
const { User } = require("../../models/User");
const { slugToTitle } = require("../../utils/slugToTitle");

const bucketName = "static-img-hairfit";

// const listAllImg = async () => {
//   let imgUrl = {}
//   let allImg = {}
//   const [files] = await gcs.bucket(bucketName).getFiles({ prefix: `haircut-recomendation-v2/` });
//   files.forEach(file => {
//     let faceType = file.name.split("/")[2];
//     let gender = file.name.split("/")[1];
//     let fileName = slugToTitle(file.name);
//     // let na = file.name.split("/")[1];
//     console.log(gender);
//     if (!allImg[gender]) allImg[gender] = [];
//     if (!imgUrl[faceType]) imgUrl[faceType] = [];
//     let hairStyle = {
//       haircut_name: fileName.split('_')[0],
//       hair_type: fileName.split('_')[1],
//       gender_fit:
//         fileName.split('_')[2]=='Men'||fileName.split('_')[2]=='Male'?"Male":"Female",
//       img: "https://storage.cloud.google.com/static-img-hairfit/"+ file.name,
//     };
//     imgUrl[faceType].push(hairStyle)
//     allImg[gender].push(imgUrl)
//   });
//   return imgUrl;
// };

const listImgBasedOnGender = async (id) => {
  const theUser = await User.findOne({where:{id:id},attributes:['gender'],raw:true})
  // console.log(gender.gender);
  let gender = theUser.gender
  let imgUrl = {}
  if(gender=='Men'||gender=='men'||gender=='male')gender='male'
  // console.log(gender);
  const [files] = await gcs.bucket(bucketName).getFiles({ prefix: `haircut-recomendation-v2/${gender}/` });
  files.forEach(file => {
    let faceType = file.name.split("/")[2];
    let fileName = slugToTitle(file.name);
    // let na = file.name.split("/")[1];
    console.log(file.name);
    if (!imgUrl[faceType]) imgUrl[faceType] = [];
    let hairStyle = {
      haircut_name: fileName.split('_')[0],
      hair_type: fileName.split('_')[1],
      gender_fit:gender,
      img: "https://storage.cloud.google.com/static-img-hairfit/"+ file.name,
    };
    imgUrl[faceType].push(hairStyle);
  });
  return imgUrl;

};

const listImgBasedOnFaceShape = async (predict='oval',id) => {
  const theUser = await User.findOne({where:{id:id},attributes:['gender'],raw:true})
  // console.log(gender.gender);
  const shape = predict.charAt(0).toUpperCase() + predict.slice(1)
  let gender = theUser.gender
  let imgUrl = {}
  if(gender=='Men'||gender=='men'||gender=='male')gender='male'
  console.log(gender);
  const [files] = await gcs.bucket(bucketName).getFiles({ prefix: `haircut-recomendation-v2/${gender}/${shape}` });
  files.forEach(file => {
    let faceType = file.name.split("/")[2];
    let fileName = slugToTitle(file.name);
    // let na = file.name.split("/")[1];
    console.log(file.name);
    if (!imgUrl[faceType]) imgUrl[faceType] = [];
    let hairStyle = {
      haircut_name: fileName.split('_')[0],
      hair_type: fileName.split('_')[1],
      gender_fit:gender,
      img: "https://storage.cloud.google.com/static-img-hairfit/"+ file.name,
    };
    imgUrl[faceType].push(hairStyle);
  });
  return imgUrl;

};

const getImgAll = async (req, res) => {
  try {
    const result = await listAllImg().catch(console.error());
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const getImgByGender = async (req, res) => {
  try {
    const result = await listImgBasedOnGender(req.user.id).catch(console.error());
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};
const getImgByShape = async (req, res) => {
  try {
    const result = await listImgBasedOnFaceShape(req.predict, req.user.id).catch(console.error());
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

module.exports = { getImgAll, getImgByGender, getImgByShape };
