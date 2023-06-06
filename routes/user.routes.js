const User = require('./../models/User.model')
const router = require('express').Router()


router.get("/getAllUsers", (req, res, next) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/:id", (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .populate('cards')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/:id/edit", (req, res, next) => {

    const { username, email, password, avatar, description, role, cards } = req.body

    User
        .create({ username, email, password, avatar, description, role, cards })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete("/:id/delete", (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/:id/favoriteCard/add", (req, res, next) => {
    const { id } = req.params;
    const { cardId } = req.body;

    User
        .findByIdAndUpdate(
            id,
            { $push: { cards: cardId } },
            { new: true }
        )
        .then((user) => {
            res.json(user);
        })
        .catch((err) => next(err));
});


router.put("/:id/favoriteCard/remove", (req, res, next) => {
    const { id } = req.params;
    const { cardId } = req.body;

    User.findByIdAndUpdate(
        id,
        { $pull: { cards: cardId } },
        { new: true }
    )
        .then((user) => {
            res.json(user);
        })
        .catch((err) => next(err));
});
module.exports = router