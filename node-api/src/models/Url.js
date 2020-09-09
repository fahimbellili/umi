const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  aliasUrl : String,
  creationDate: { type: String, default: Date.now },
  expirationDate: Date,
  clicks: Number,
});

module.exports = mongoose.model('Url', UrlSchema);
