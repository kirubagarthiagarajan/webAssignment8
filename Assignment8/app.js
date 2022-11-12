const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use(cors());


dotenv.config({ path: './config/config.env' });
connectDatabase();


//routers
app.use('/', require('./routes/index'));

app.listen(3000);