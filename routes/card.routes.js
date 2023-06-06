const router = require('express').Router()

const { isAuthenticated } = require('../middlewares/verifyToken.middleware')

const {
    getAllCards,
    getCardsById,
    getOwner,
    getSubject,
    getDetails,
    saveCard,
    editCard,
    deleteCard,
    favoriteCard,
    deleteFavoriteCard
} = require('../controllers/card.controllers')

router.get("/all", getAllCards)

router.get('/:id', getCardsById)

router.get("/owner/:owner", getOwner)

router.get("/subject/:subject", getSubject)

router.get("/details/:id", getDetails)

router.post("/save", isAuthenticated, saveCard)

router.put("/:id/edit", isAuthenticated, editCard)

router.delete("/delete/:id", isAuthenticated, deleteCard)

router.put("/:id/favoriteCard/add", isAuthenticated, favoriteCard)

router.put("/:id/favoriteCard/remove", isAuthenticated, deleteFavoriteCard)

module.exports = router