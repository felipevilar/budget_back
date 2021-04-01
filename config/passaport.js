const authSecret = '$#%#sff23sd41SDF_rwsdf!!@$kdslSdkD023'
const passaport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then((user) => done(null, user ? {...payload} : false))
            .catch((err) => done(err, false))
    })

    passaport.use(strategy)

    return {
        authenticate: () => passaport.authenticate('jwt', { session: false })
    }
}