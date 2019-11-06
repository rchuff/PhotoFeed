const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

let port = process.env.PORT;

if (port == '' || port == null) port = 3001;

app.use(bodyParser.json());

app.use('/api/', fileRoutes);



app.listen(port,() => console.log(`Server now running on port ${port}!`));
