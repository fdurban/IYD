const router = require('express').Router()

const Card = require('./../models/Card.model')

router.get("/all", (req, res, next) => {

    Card
        // TODO: SELECCIONAR
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/:owner", (req, res, next) => {

    const { owner } = req.params

    Card
        .find({ owner })
        .then(renponse => res.json(renponse))
        .catch(err => next(err))
})

router.get("/category/:category", (req, res, next) => {

    const { category } = req.params

    Card
        .findById(category)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/save", (req, res, next) => {

    const { title, subject, main_content, resume1, resume2, resume3, resume4, likes, owner } = req.body

    Card
        .create({ title, subject, main_content, resume1, resume2, resume3, resume4, likes, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/:id/edit", (req, res, next) => {

    const { id } = req.params
    const { title, subject, main_content, resume1, resume2, resume3, resume4, likes, owner } = req.body

    Card
        .findByIdAndUpdate(id, { title, subject, main_content, resume1, resume2, resume3, resume4, likes, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete("/delete/:id", (req, res, next) => {

    const { id } = req.params

    Card
        .findByIdAndDelete(id)
        // TODO: REVISAR CASOS RESOLUBLES CON SENDTSTAUS
        // TODO: VER VIDEO DE CONTROLADCORES
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
})

module.exports = router