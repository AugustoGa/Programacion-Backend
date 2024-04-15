const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')
const users = require('../services/users.service')

const UserRotuer = Router()

UserRotuer.post('/', passport.authenticate('register', { session: false, failureRedirect : '/api/users/fail-Register'}),  
    async ( req , res ) => {
        try {
            res.status(HTTP_RESPONSES.CREATED).json({ message: 'Usuario registrado exitosamente' , payload: users});
        } catch (error) {
            console.error('Error post UserRouter', error.message)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
    })

    UserRotuer.get('/fail-Register', (req, res) => {
        try {
            console.log('fail register')
            res.status(HTTP_RESPONSES.BAD_REQUEST).json({ message: 'Registration failed' });
        } catch (error) {
            console.log(error)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    });
    

module.exports = UserRotuer