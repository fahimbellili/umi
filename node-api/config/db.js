const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection successful to MongoDB !'))
  .catch(() => console.log('Connection NOT successful to MongoDB !'));

module.exports = connectDB;
