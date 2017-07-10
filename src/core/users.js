const datastore = require('nedb')
const db = new datastore()

const saveUser = (userObject) => {
  db.insert({
    githubUser: userObject.login,
    githubData: userObject,
    created: new Date()
  }, function (err, doc) {
    return doc
  })
}

const getUser = (userId) => {
  db.find({ githubUser: userId }, function (err, doc) {
    return doc
  })
}

module.exports = {
  saveUser: saveUser,
  getUser: getUser
}
