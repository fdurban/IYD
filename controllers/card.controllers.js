const Card = require('./../models/Card.model')

const getAllCards = async (req, res, next) => {
    try {

        const cards = await Card.find()
        res.json(cards)
    }
    catch (error) { next(error) }

}

const getCardsById = (req, res, next) => {

    const { id } = req.params

    Card
        .findById(id)
        .then(renponse => res.json(renponse))
        .catch(err => next(err))
}

const getCardsbyOwner = (req, res, next) => {

    const { owner } = req.params

    Card
        .find({ owner })
        .then(renponse => res.json(renponse))
        .catch(err => next(err))
}

const getSubject = (req, res, next) => {

    const { subject } = req.params

    Card
        .findById(subject)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getDetails = (req, res, next) => {

    const { id } = req.params

    Card
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const saveCard = async (req, res, next) => {

    const { title, subject, main_content, resume1, resume2, resume3, resume4, likes } = req.body
    const owner = req.payload ? req.payload._id : null;

    try {
        const savedCard = await Card
            .create({ title, subject, main_content, resume1, resume2, resume3, resume4, likes, owner })
        res.json(savedCard)
    }
    catch (error) { next(error) }
}

const editCard = (req, res, next) => {

    const { id } = req.params
    const { title, subject, main_content, resume1, resume2, resume3, resume4, likes, owner } = req.body

    Card
        .findByIdAndUpdate(id, { title, subject, main_content, resume1, resume2, resume3, resume4, likes, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteCard = (req, res, next) => {

    const { id } = req.params

    Card
        .findByIdAndDelete(id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}

module.exports = {

    getAllCards,
    getCardsById,
    getCardsbyOwner,
    getSubject,
    getDetails,
    saveCard,
    editCard,
    deleteCard
}