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
    expect(response.body).toHaveLength(initialCards.length)
})

test('the first role is about math', async () => {
    const response = await api.get('/api/cards/all')
    expect(response.body[0].subject).toBe('MATH')
})

//testing posts

test(' a valid card can be added', async () => {
    const newCard = {
        title: "card about weird anatomy",
        subject: "ANATOMY",
        main_content: "Write here your main content",
        resume1: "Write here your first resume",
        resume2: "Write here your second resume",
        resume3: "Write here your third resume",
        resume4: "Write here your fourth resume",
        likes: 0,
        owner: '65a937a3360544bd9023c64f'
    }

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE5MzdjMDM2MDU0NGJkOTAyM2M2NTUiLCJlbWFpbCI6Imx1ZHVyYmFuQG1zbi5jb20iLCJ1c2VybmFtZSI6Ikx1Y8OtYSIsImF2YXRhciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RrY2YzbXY0ci9pbWFnZS91cGxvYWQvdjE3MDU1ODg2NjYvaHIzbXFsaTVqZ3JkbGVkcWN5YjIuanBnIiwiaWF0IjoxNzA1NjYzNTk5LCJleHAiOjE3MDU2ODUxOTl9.Plh6jKCj3lZWJkzSnYATComzzTS2NYpp1ZYYCOfn5to'
    try {
        const response = await api
            .post('/api/cards/save')
            // .set('Authorization', `Bearer ${token}`)
            .send(newCard)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        console.log(response.body); // Log the response body

    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to fail the test
    }
})

afterAll(() => {
    mongoose.connection.close()
})