const express = require('express');
const router = express.Router();
// const {
//   generateGetUrl,
//   generatePutUrl
// } = require('../services/AWSPresigner');
//
// router.get('/generate-get-url', (req, res) => {
//   const { Key } = req.query;
//   generateGetUrl(Key)
//   .then(getURL => {
//     res.send(getURL);
//   })
//   .catch(err => {
//     res.send(err);
//   });
// });
//
// router.get('/generate-put-url', (req, res) => {
//   const { Key, ContentType } = req.query;
//   generatePutUrl(Key, ContentType).then(putURL => {
//     res.send({putURL});
//   })
//   .catch(err => {
//     res.send(err);
//   });
// });

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.BUCKET_REGION
})

const upload = require('../services/file-upload');

const singleUpload = upload.single('image');

router.post('/image-upload', function(req,res){
  singleUpload(req,res, function(err){
    if (err){
      return res.status(442).send({errors: [{title: 'File Upload Error', detail: err.message}]});
    }
    return res.json({'imageUrl': req.file.location});
  });
})

router.get("/image-download/:imageId", function(req, res) {
  const s3 = new aws.S3();
  var params = { Bucket: process.env.BUCKET_NAME, Key: req.params.imageId };
  s3.getObject(params, function(err, data) {
    if (err) {
      return res.send({ error: err });
    }
    res.send(data.Body);
  });
});

module.exports = router;
