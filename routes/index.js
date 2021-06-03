const router = require('express').Router()
const auth = require('./routeAuth')
const player = require('./routerPlayer')

// console.log(true);
router.use('/', auth)
router.use('/', player)

module.exports = router