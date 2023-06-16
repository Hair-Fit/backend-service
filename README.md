# Backend Service for Bangkit's Capstone Project "Hair Fit"
# Backend environment that this project use
- Node Js (`v18.16.0 LTS`)
- NPM (`9.5.1`)
- MySQL or MariaDB
- We use vscode prettier extention
# Setup
It is up to you to run it on local or cloud
1. git clone this repository
2. Configure your environment variable for the local environment
```bash
cp .env.example .env
```

# Deployment
After setup, you are good to go for deployment
## Local environment
1. Install depedencies 
```bash
npm install
```
2. Run migration 
```
npx sequelize-cli db:migrate
```
3. Run the app 
```bash
npm run dev
```

## Cloud
### Setup Cloud SQL and GCP Bucket
1. Enable the neccesary GCP API for cloud sql, cloud run, secret manager, and cloud storage bucket
2. Setup your cloud SQL (MySQL)
3. You can use any method to initiate the DB like using transfer file form navicat, etc. But if you want to initiate it on mysql shell, follow the step number 3 until 5. Enter the MySQL shell :
```shell
gcloud sql connect db_name --user=root --quiet
```
4. Create and use the database 

5. Run this query to initiate the structure 
```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for RefreshTokens
-- ----------------------------
DROP TABLE IF EXISTS `RefreshTokens`;
CREATE TABLE `RefreshTokens`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `hashedToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `RefreshTokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for UserRecords
-- ----------------------------
DROP TABLE IF EXISTS `UserRecords`;
CREATE TABLE `UserRecords`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `prediction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `UserRecords_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gender` enum('male','female') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
```
6. Set your GCP Bucket <br>
- Make the bucket that are private to store your model
- Make the bucket that are serve as static file storage that are open to public

The file structure of static file storage from Hair-Fit :
```
static-img-hairfit
|-|haircut-recomendation-v2
|--|male
|---|Oblong
|----|img1.jpg
|--|female
|---|Oblong
|----|img2.jpg
```
so on the `contorllers/bucket/getImg.js`, you can change this :
```
https://storage.cloud.google.com/static-img-hairfit/
```
into this :
```
https://storage.cloud.google.com/your-static-file-bucket/
```
and also this :
```javascript
haircut-recomendation-v2/${gender}/${shape}/
```
into this
```javascript
your-img-folder/${gender}/${shape}/
```

The hair cut recommendation can be downloaded [here](https://drive.google.com/drive/folders/1Jde8rzb_jR5S59WtoLxlVw1Y2UFeti6v?usp=drive_link)

### Make create and run the cloud run container
1. Give the authorization, run it on cloud shell (the example is using asia-southeast1)
```shell
gcloud auth configure-docker asia-southeast1.pkg.dev
```
```shell
gcloud auth configure-docker asia-southeast1-docker.pkg.dev
```
2. Make the artifact repository, remember the name of it
3. Build the image on cloud shell
```shell
docker build -t asia-southeast1-docker.pkg.dev/project-id/artifact-repository/image-name:tag .
```
4. Push the image on cloud shell
```shell
docker push asia-southeast1-docker.pkg.dev/project-id/artifact-repository/image-name:tag
```
5. Create and configure service in GCP cloud run page 
  - Make sure the region is same like artifact repository 
  - Add the environment variable (you can see the reference on `.example.env`)
# API Documentation

The documentation of the API done in [this](https://docs.google.com/document/d/1aaJcLe5-s6SUGMQ73vFn6M4qNnv8Uqg7duflDy3UtK0/edit?usp=drive_link) document
