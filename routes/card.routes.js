const router = require('express').Router()

const Card = require('./../models/Card.model')

router.get("/all", (req, res, next) => {

    Card

        .find()
        .then(response => res.json(response))
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

    const { title, subject, main_content, resume1, resume2, resume3, resume4, likes } = req.body

    Card
        .create({ title, subject, main_content, resume1, resume2, resume3, resume4, likes })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/:id/edit", (req, res, next) => {

    const { id } = req.params;

    const { title, subject, main_content, resume1, resume2, resume3, resume4, likes } = req.body;

    Card
        .findByIdAndUpdate(id, { title, subject, main_content, resume1, resume2, resume3, resume4, likes })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete("/delete/:id", (req, res, next) => {
    const { id } = req.params;
    Card
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router