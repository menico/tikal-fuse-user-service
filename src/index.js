const express = require('express')
const users = require('./core/users')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()

app.post('/user/register', bodyParser.json(), (req, res, next) => {
  return registerUser(req.body).then(result => {
    res.send({
      jwt:result
    })
  })
})
const createJwt = userData => {
  return jwt.sign({
    data: userData
  },
    'tikalFuseSecret',
    { expiresIn: '5m' }
  )
}

const registerUser = userObject => {
  return new Promise(function (resolve, reject) {
    const findUser = users.getUser(userObject.login)
    let jwtToken = findUser
    if (!findUser) {
      jwtToken = users.saveUser(userObject)
    }
    resolve(createJwt(jwtToken))
  })
}

app.listen(8080, (data) => {
  console.log('server running on 8080')
})
