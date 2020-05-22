const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/users');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/routes')(app);

app.listen(keys.PORT);