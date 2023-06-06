const router = require('express').Router()

const { isAuthenticated } = require('../middlewares/verifyToken.middleware')

const {
    getAllUsers,
    getUserById,
    editUserById,
    deleteUserById
} = require('../controllers/user.controllers')

router.get("/getAllUsers", getAllUsers)

router.get("/:id", isAuthenticated, getUserById)

router.post("/:id/edit", isAuthenticated, editUserById)

router.delete("/:id/delete", isAuthenticated, deleteUserById)


module.exports = router