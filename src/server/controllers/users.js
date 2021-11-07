var login = require('./login')

module.exports.set = (app) => {
    login.set(app)
}