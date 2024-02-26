const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')

const UserRotuer = Router()

UserRotuer.post('/', passport.authenticate('register', {failureRedirect : '/api/users/fail-Register'}), 
    async ( req , res ) => {
        try {
            res.status(HTTP_RESPONSES.CREATED)
        } catch (error) {
            console.error('Error post UserRouter', error.message)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
    })

UserRotuer.get('/fail-Register',
    ( req , res) => {
        console.log('fail register')
        res.status(HTTP_RESPONSES.BAD_REQUEST)
    })

module.exports = UserRotuer