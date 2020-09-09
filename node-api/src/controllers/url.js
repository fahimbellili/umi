const shortid = require('shortid');
const validUrl = require('valid-url');
const config = require('config');
const moment = require('moment');

const Url = require('../models/Url');

exports.createUrl = async (req, res) => {
  const { longUrl, expirationDate, aliasUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  var dateMomentObject = moment(expirationDate, 'DD/MM/YYYY');
  var dateObject = dateMomentObject.toDate();

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/api/url/' + urlCode;
        const alsUrl = 'http://' + aliasUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          aliasUrl: aliasUrl ? alsUrl : '',
          urlCode,
          creationDate: new Date().toISOString(),
          expirationDate: dateObject,
          clicks: 0,
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
};

exports.getOneUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    console.log(url);
    if (url) {
      url.clicks++;
      await url.save();
      const today = new Date();
      if (url.expirationDate - today < 0) {
        return res.status(404).json('URL out of date');
      } else {
        return res.redirect(url.longUrl);
      }
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};
