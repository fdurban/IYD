const router = require('express').Router()

router.use('/cards', require('./card.routes'))
router.use('/users', require('./user.routes'))
router.use('/auth', require('./auth.routes'))
router.use('/users', require('./user.routes'))
// TODO ELIMINAR

module.exports = router