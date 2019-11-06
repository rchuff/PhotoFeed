require('dotenv').config();
const aws = require('aws-sdk');

aws.config = new aws.Config({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION
});

const s3 = new aws.S3();

const Bucket = process.env.BUCKET_NAME;

function generateGetUrl(Key){
  return new Promise((resolve, reject) => {
    const params = {
      Bucket,
      Key,
      Expires: 120
    };

    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err){
        reject(err);
      } else {

        resolve(url);
      }
    })
  })
}

function generatePutUrl(Key, ContentType){
  return new Promise((resolve, reject) => {
    const params = { Bucket, Key, ContentType};

    s3.getSignedUrl('putObject', params, function(err, url){
      if (err) {
        reject(err);
      }
      resolve(url);
    })
  })
}

module.exports = { generateGetUrl, generatePutUrl }
