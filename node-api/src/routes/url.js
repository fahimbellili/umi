const express = require('express');
const router = express.Router();

const urlController = require('../controllers/url');

router.post('/item', urlController.createUrl);
router.get('/:code', urlController.getOneUrl);

module.exports = router;
