const jwt = require ('jsonwebtoken')


const SECRET = 'CodSecreto'

const generateToken = user => {
    const payload = {
        sub: user._id,
        email: user.email, 
    };
    return jwt.sign( payload, SECRET , { expires : '1d'})
}

module.exports = { generateToken , SECRET }