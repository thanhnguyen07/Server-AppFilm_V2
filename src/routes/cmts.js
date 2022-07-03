const express = require('express');
const router = express.Router()
const cmtsController = require('../app/controllers/CmtsController')

router.get('/data', cmtsController.data)
router.post('/create', cmtsController.create)

module.exports = router