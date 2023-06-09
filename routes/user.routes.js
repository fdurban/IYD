const router = require('express').Router()

const { isAuthenticated } = require('../middlewares/verifyToken.middleware')

const {
    getAllUsers,
    getUserById,
    editUserById,
    deleteUserById,
    addFavoriteCard,
    removeFavoriteCard,
    getFavoriteCards
} = require('../controllers/user.controllers')

router.get("/getAllUsers", getAllUsers)

router.get("/:id", isAuthenticated, getUserById)

router.post("/:id/edit", isAuthenticated, editUserById)

router.delete("/:id/delete", isAuthenticated, deleteUserById)

router.get("/:id/favoriteCard/get", getFavoriteCards)

router.put("/:id/favoriteCard/add", addFavoriteCard)

router.put("/:id/favoriteCard/remove", removeFavoriteCard)

module.exports = router