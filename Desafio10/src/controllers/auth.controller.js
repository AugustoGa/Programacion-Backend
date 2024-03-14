const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')
const UserService = require('../services/users.service')
const { createHash } = require('../utils/cryp-password.util')
const { generateToken } = require('../utils/jwt.util')

const userService = new UserService()

const AuthRouter = Router()

AuthRouter.post('/', passport.authenticate ( 'login' , { failureRedirect : '/auth/fail-login'}) ,
    async ( req , res ) => {
        try {
            const { email, password } = req.body
            const user = await userService.getOneUser({ email })
                if ( !user ){
                    return res.status(HTTP_RESPONSES.BAD_REQUEST) 
                }
                if ( password === user.password ) {
                    const tokenInf = generateToken ({
                        email : user.email,
                        role : user.role
                    })
                    const token = generateToken(tokenInf)
                    return res.status(HTTP_RESPONSES.OK).json({ token })
                } else {
                    return res.status(HTTP_RESPONSES.BAD_REQUEST)
                }
        } catch (error) {
            console.error('Error post AuthRotuer' , error)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
})

AuthRouter.get('/fail-login' , ( req , res ) => {
    console.log('fail login')
    res.status(HTTP_RESPONSES.BAD_REQUEST)
})

AuthRouter.get('logout' , async ( req , res ) => {
    try {
        res.status(HTTP_RESPONSES.OK).json({ message: 'Logout successful' }
        )
    } catch (error) {
        console.error('Error get AuthRotuer' , error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

AuthRouter.post('/forgotPassword' , async ( req , res ) => {
    try {
        const { email , password } = req.body
        const passwordEncrypted = createHash( password )
        res.status(HTTP_RESPONSES.OK)
    } catch (error) {
        console.error('Error post AuthRotuer' , error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

AuthRouter.get('/github' , passport.authenticate( 'github' , { scope : [ 'user : email']}, ( req , res )=> {}))

AuthRouter.get('/githubcallback' , passport.authenticate( 'github' , { failureRedirect : '/login'}),
    ( req , res ) => {
        req.session.user = req.user
        res.redirect('/profile')
    })

module.exports = AuthRouter