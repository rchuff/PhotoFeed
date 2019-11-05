const express = require('express');
const fileRoutes = require('./routes/file-upload');
const bodyParser = require('body-parser');


const app = express();

let port = process.env.PORT;

if (port == '' || port == null) port = 3001;

app.use(bodyParser.json());

app.use('/api/', fileRoutes);



app.listen(port,() => console.log(`Server now running on port ${port}!`));
