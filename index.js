const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cors = require('cors');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "termos")));

require('./routes/index')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

app.listen(keys.PORT);
