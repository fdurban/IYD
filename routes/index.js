const router = require('express').Router()

router.use('/cards', require('./card.routes'))
router.use('/users', require('./user.routes'))
router.use('/auth', require('./auth.routes'))
router.use('/upload', require('./upload.routes'))

// TODO ELIMINAR

module.exports = router