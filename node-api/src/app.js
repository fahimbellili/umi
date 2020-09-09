const express = require('express');
const path = require('path');
const connectDB = require('../config/db');
const bodyParser = require('body-parser');

// const mongoUri = require('./config/default');
const urlRoute = require('./routes/url');

// mongoose
//   .connect(mongoUri.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connection successful to MongoDB !'))
//   .catch(() => console.log('Connection NOT successful to MongoDB !'));

const app = express();

// Connect to database
connectDB;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'view')));

app.use('/api/url', urlRoute);

module.exports = app;
