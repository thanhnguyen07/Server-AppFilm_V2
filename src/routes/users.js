const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/UsersController')

router.post('/store', usersController.store)
router.post('/listLike', usersController.listLike)
router.post('/listPlay', usersController.listPlay)
router.post('/listHistory', usersController.listHistory)
router.post('/login', usersController.login)
router.post('/store2', usersController.store2)
router.get('/data', usersController.dataUsers)
router.get('/create', usersController.create)
router.delete('/:_id', usersController.delete)
router.get('/:_id', usersController.details)
router.get('/', usersController.Users)

module.exports = router;
