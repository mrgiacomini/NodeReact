const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cors = require('cors');
require('./models/client');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes')(app);

app.listen(keys.PORT);