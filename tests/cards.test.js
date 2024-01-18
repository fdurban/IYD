const { default: mongoose } = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Card = require('../models/Card.model')


const api = supertest(app)


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


beforeEach(async () => {
    await Card.deleteMany({})

    const newcard1 = new Card(initialCards[0])
    await newcard1.save()
    const newcard2 = new Card(initialCards[1])
    await newcard2.save()
})

test('cards are returned as json', async () => {
    await api
        .get('/api/cards/all')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 2 cards an', async () => {

    const response = await api.get('/api/cards/all')
    expect(response.body).toHaveLength(2)
})

afterAll(() => {
    mongoose.connection.close()
})