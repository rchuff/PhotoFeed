const express = require('express');
const router = express.Router();

const upload = require('../services/file-upload');

const singleUpload = upload.single('image');

router.post('/image-upload', function(req,res){
  console.log(process.env.ACCESS_KEY)
  singleUpload(req,res, function(err){
    if (err){
      return res.status(442).send({errors: [{title: 'File Upload Error', detail: err.message}]});
    }
    return res.json({'imageUrl': req.file.location});
  });
})

module.exports = router;
