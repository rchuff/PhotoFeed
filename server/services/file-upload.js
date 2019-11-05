const aws = require('aws-sdk'),
multer = require('multer'),
multerS3 = require('multer-s3');

require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY,
  region: 'us-east-2'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'photofeedbucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'Testing metadata'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;
