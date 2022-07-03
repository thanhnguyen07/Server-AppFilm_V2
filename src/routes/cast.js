const express = require('express');
const router = express.Router()
const castController = require('../app/controllers/CastController')

// router.get('/', castsController.Casts)
router.get('/data', castController.Cast)

module.exports = router