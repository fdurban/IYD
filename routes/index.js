const router = require('express').Router()

router.use('/cards', require('./card.routes'))
router.use('/auth', require('./auth.routes'))

module.exports = router