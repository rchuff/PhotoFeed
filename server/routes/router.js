const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/upload', (req, res, next) => {
  let imageFile = req.files.file;

  imageFile.mv(path.normalize(`${__dirname}/../public/${req.body.filename}.jpg`), function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}.jpg`});
  });
});

module.exports = router;
