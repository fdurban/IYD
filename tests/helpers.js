const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User.model')


const api = supertest(app)

const getAllCardsTest = async () => {


    const response = await api.get('/api/cards/all')
    console.log('REESPUESTA DE LA LLAMADA A LA APIIIIIII GETTTTTTT', { response })

    return {
        contents: response.body.map(note => note.title),
        response
    }


}


const initialCards = [
    {
        title: "card lucia",
        subject: "MATH",
        main_content: "Write here your main content",
        resume1: "Write here your first resume",
        resume2: "Write here your second resume",
        resume3: "Write here your third resume",
        resume4: "Write here your fourth resume",
        likes: 0,
        cards: [],
        date: new Date()
    },
    {
        title: "not anatomy",
        subject: "ANATOMY",
        main_content: "Write here your main content",
        resume1: "Write here your first resume",
        resume2: "Write here your second resume",
        resume3: "Write here your third resume",
        resume4: "Write here your fourth resume",
        likes: 0,
    }
]

const getUsers = async () => {
    const usersDB = await User.find({})
    return usersDB.map(user => user.toJSON())
}

module.exports = { api, initialCards, getAllCardsTest, getUsers }