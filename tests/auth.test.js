const { default: mongoose } = require('mongoose')
const User = require('../models/User.model')
const { api, getUsers } = require('./helpers')
const bcrypt = require('bcryptjs')
const saltRounds = 10

describe('creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync('pswd', salt)

        // const passwordHash = await bcrypt.hash(', 10)
        const user = new User({ username: 'miduroot', email: 'ferbrizie@gmail.com', password: hashedPassword })

        await user.save()
    })

    test('works as expected creating a fresh username', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
            email: "midudev@msn.com",
            username: 'midudev',
            name: 'Miguel',
            password: 'tw1tch'
        }

        await api
            .post('/api/auth/signup')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await getUsers()

        expect(newUser.password.length).toBeGreaterThan(4);

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('expected new user to have a password greater or equal to 4', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
            email: "alita@msn.com",
            username: 'alita',
            name: 'Alejandra',
            password: 'nico'
        }

        await api
            .post('/api/auth/signup')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await getUsers()

        expect(newUser.password.length).toBeGreaterThanOrEqual(4);

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
            email: "midu@msn.com",
            username: 'miduroot',
            name: 'Miguel',
            password: 'midutest'
        }

        const result = await api
            .post('/api/auth/signup')
            .send(newUser)
            .expect(409)
            .expect('Content-Type', /application\/json/)


        expect(result.body.errorMessages).toContain('El registro ya se encuentra en la base de datos')

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('a user can login with the stablished token ', async () => {


        const loginUser = {
            email: "ferbrizie@gmail.com",
            password: 'pswd'
        }

        const result = await api
            .post('/api/auth/login')
            .send(loginUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toHaveProperty('authToken');

        // console.log('ESTE ES EL RESULTADO', result)
    })


})