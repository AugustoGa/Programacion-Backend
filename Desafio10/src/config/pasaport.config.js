const passport = require('passport');
const jwt = require('passport-jwt');



const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2');
const { SECRET } = require('../utils/jwt.util');
const extractJwt = require('../utils/extractJwt.util');
const { ghClientId, ghClientSecret } = require('./db.config');
const UserService = require('../services/users.service');

const userService = new UserService()

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([extractJwt]),
        secretOrKey: SECRET,
    }, async (payload, done) => {
        try {
            const user = await userService.getOneUser(payload.sub);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userService.getOneUser({ email: username });
            if (!user) {
                console.log('usuario no existe');
                return done(null, false);
            }
            if (!useValidPassword(user, password)) {
                console.log('password incorrecta');
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('github', new GithubStrategy({
        clientID: ghClientId,
        clientSecret: ghClientSecret,
        callbackURL: 'http://localhost:3000/api/auth/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const { id, login, name, email } = profile._json;
            const user = await Users.findOne({ email: email });
            if (!user) {
                const newUserInfo = {
                    first_name: name,
                    email: email,
                    githubId: id,
                    githubUsername: login,
                };
                const newUser = await Users.create(newUserInfo);
                return done(null, newUser);
            }
            return done(null, user);
        } catch (error) {
            console.log(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await Users.findById(id);
        done(null, user);
    });
};

module.exports = initializePassport;
