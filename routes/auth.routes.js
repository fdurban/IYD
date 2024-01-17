const router = require('express').Router()
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require("../middlewares/verifyToken.middleware")
const saltRounds = 10

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'http://localhost:5005/api/auth/oauth2/redirect/google',
    scope: ['profile'],
}, function (accessToken, refreshToken, profile, cb) {
    User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) { return cb(err); }
        if (!user) {
            const newUser = new User({
                username: profile.displayName, // Use displayName as username (you might want to adjust this)
                email: profile.emails[0].value,
                password: '', // No password for Google users
                avatar: profile.photos[0].value,
            });
            console.log(profile.displayName),

                newUser.save(function (err) {
                    if (err) { return cb(err); }
                    return cb(null, newUser);
                });
        } else {
            return cb(null, user);
        }
    });
}));


passport.serializeUser(function (user, cb) {
    cb(null, user.id); // Utiliza el campo único del usuario como identificador de la sesión
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        cb(err, user);
    });
});

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/api/auth/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: process.env.ORIGIN,
    failureRedirect: '/login'
}));

router.post('/signup', (req, res, next) => {

    const { email, password, username, description, avatar } = req.body

    console.log(req.body)

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 2 characters' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {


            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, description, avatar })
        })
        .then((createdUser) => {

            const { email, username, _id, description, avatar } = createdUser
            const user = { email, username, _id, description, avatar }

            res.status(201).json({ user })
        })
        .catch(err => {
            next(err)
        })
})

router.post('/login', (req, res, next) => {


    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, avatar } = foundUser

                const payload = { _id, email, username, avatar }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.json({ authToken: authToken, user_id: foundUser._id })
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }

        })
        .catch(err => next(err));
})

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});



router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log('EL USUARIO TIENE UN TOKEN CORRECTO Y SUS DATOS SON', req.payload)
    res.status(200).json(req.payload)
})

module.exports = router