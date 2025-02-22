const jwt = require('jsonwebtoken')


function getToken(payload) {
    const secret = process.env.SECRET_TOKEN
    const token = jwt.sign(payload, secret, { expiresIn: '24h' })
    return token
}

function checkToken(token) {
    const secret = process.env.SECRET_TOKEN
    const decode = jwt.verify(token, secret)
    return decode
}

module.exports = {getToken, checkToken}