const { Router } = require('express')
const Users = require('../service/user.service')
const HTTP_RESPONSES = require('../contants/http-responses')

const users = new Users()

const UserRouter = Router()

UserRouter.post ('/', async (req, res) => {
    try {
        const {first_name,last_name,age,email,password} = req.body
        const newUserInfo = {
            first_name,
            last_name,
            age,
            email,
            password,
        }
        console.log ('NewUserInfo:', newUserInfo)
        const user = await users.createdUser(newUserInfo)
        res.status(HTTP_RESPONSES.CREATED).json({ status: 'success', message: user });
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
})


module.exports = UserRouter