const { default: mongoose } = require('mongoose')
const Card = require('../models/Card.model')
const { api, initialCards, getAllCardsTest } = require('./helpers')

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


    const getTokenFromHeaders = (req) => {
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            const token = req.headers.authorization.split(" ")[1];
            return token;
        }
        return null;
    };
    const newCard = {
        title: "card about weird anatomy",
        subject: "ANATOMY",
        main_content: "Write here your main content",
        resume1: "Write here your first resume",
        resume2: "Write here your second resume",
        resume3: "Write here your third resume",
        resume4: "Write here your fourth resume",
        likes: 0,
        owner: 0
    }
    const token = getTokenFromHeaders
    console.log('ESTE ES EL SUPERTOKENNNNNNNNNN', token)
    try {
        await api
            .post('/api/cards/save')
            .set('Authorization', `Bearer ${token}`)
            .send(newCard)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { contents, response } = await getAllCards()

        expect(contents).toContain(newCard.title)

    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to fail the test
    }
})

test(' a card cannot be added without title', async () => {
    const newCardwithoutcontent = {
        title: "",
        required: true
    }
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE5MzdjMDM2MDU0NGJkOTAyM2M2NTUiLCJlbWFpbCI6Imx1ZHVyYmFuQG1zbi5jb20iLCJ1c2VybmFtZSI6Ikx1Y8OtYSIsImF2YXRhciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RrY2YzbXY0ci9pbWFnZS91cGxvYWQvdjE3MDU1ODg2NjYvaHIzbXFsaTVqZ3JkbGVkcWN5YjIuanBnIiwiaWF0IjoxNzA1NjYzNTk5LCJleHAiOjE3MDU2ODUxOTl9.Plh6jKCj3lZWJkzSnYATComzzTS2NYpp1ZYYCOfn5to'
    try {
        await api
            .post('/api/cards/save')
            // .set('Authorization', `Bearer ${token}`)
            .send(newCardwithoutcontent)
            .expect(500)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/cards/all')
        expect(response.body).toHaveLength(initialCards.length)

    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to fail the test
    }
})

test('a card can be deleted', async () => {

    const { response: firstResponse } = await getAllCardsTest
    const { body: notes } = firstResponse
    const noteToDelete = notes[0]
    console.log("ESTA ES LA SUPERNOTAAAAAAAAA", noteToDelete)

    await api
        .delete(`/api/cards/delete/${noteToDelete._id}`)
        .expect(204)

    const { contents, response: secondResponse } = await getAllCards()

    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)

    expect(contents).not.toContain(noteToDelete.content)

})

afterAll(() => {
    mongoose.connection.close()
})