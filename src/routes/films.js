const express = require('express')
const router = express.Router()
const filmsController = require('../app/controllers/FilmsController')

router.get('/data', filmsController.data)
router.get('/create', filmsController.create)
router.get('/:_id', filmsController.details)
router.post('/store', filmsController.store)
router.delete('/:_id', filmsController.delete)
router.get('/', filmsController.Films)

module.exports = router;
