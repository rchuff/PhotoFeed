const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fileRouter = require('./routes/router');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Access the req.files from the post request.
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

app.use('/api', fileRouter);


// error handler for invalid requests
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404).send('Sorry, we cannot find that.')
});


app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;
