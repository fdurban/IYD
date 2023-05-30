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