const { Router } = require('express')
const Users = require('../Dao/models/user.model')
const HTTP_RESPONSES = require('../constants/http-responses')



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
        const user = await Users.create(newUserInfo)
        res.status(HTTP_RESPONSES.CREATED).res.json ({status: 'success', messae: user })
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
})


module.exports = UserRouter