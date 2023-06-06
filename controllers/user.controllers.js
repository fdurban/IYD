const User = require('./../models/User.model')

const getAllUsers = (req, res, next) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getUserById = (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editUserById = (req, res, next) => {

    const { username, email, password, avatar, description, role, cards } = req.body

    User
        .create({ username, email, password, avatar, description, role, cards })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteUserById = (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const favoriteCard = (req, res, next) => {
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
}

const deleteFavoriteCard = (req, res, next) => {
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
}

module.exports = {
    getAllUsers,
    getUserById,
    editUserById,
    deleteUserById,
    favoriteCard,
    deleteFavoriteCard
}