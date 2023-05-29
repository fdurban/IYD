const router = require('express').Router()

router.use('/IYD', require('./card.routes'))
router.use('/IYD', require('./auth.routes'))

module.exports = router