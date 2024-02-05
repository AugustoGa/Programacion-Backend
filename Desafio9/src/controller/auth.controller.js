const { Router } = require('express')
const Users = require('../service/user.service')
const HTTP_RESPONSES = require('../contants/http-responses')

const users = new Users()

const AuthRouter = Router()


AuthRouter.post ('/', async (req, res) => {
    try {
        const {email,password} = req.body
        const user = await users.getOneUser({email})
        if (!user) {
            return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ message: 'Error AuthController' })
        }
        if (user.password !== password) {
           return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ message: 'Error AuthController' })
        }

        const lowercaseEmail = email.toLowerCase();

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: lowercaseEmail,
            age: user.age,
            role: user.role,
        }
        res.status(HTTP_RESPONSES.OK).json ({status: 'success', message: 'Login Succesfull'})
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Error Auth Met Post' })
    }
})

AuthRouter.get('/logout', async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ error: ' Error logout Get' });
            } else {
                return res.status(HTTP_RESPONSES.OK).json({ message: 'Logout successful' });
            }
        });
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error })
    }
})

module.exports = AuthRouter