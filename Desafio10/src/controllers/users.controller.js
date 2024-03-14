const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')
const UserService = require('../services/users.service')


const userService = new UserService()
const UserRotuer = Router()

UserRotuer.post('/', passport.authenticate('jwt', {failureRedirect : '/api/users/fail-Register'}), 
    async ( req , res ) => {
        try {
            const {
                first_name, 
                last_name,
                email,
                age,
                password } = req.body
                if (!first_name || !last_name || !email || !age || !password) {
                    return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ message: 'Missing required fields' });
                }
            const users = await userService.createdUser(req.body)
            res.status(HTTP_RESPONSES.CREATED).json({ users })
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