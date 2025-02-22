const jwt = require('../helpers/jwt')
const {User} = require('../models/index')

function authentication(req, res, next) {
    const token = req.headers.token
    try {
        const decoded = jwt.checkToken(token)
        req.decoded = decoded
        console.log(decoded, 'auth')
        next()
      } catch(err) {
        res.status(403).json({
            message: 'Forbidden - gabisa',
            data: err
        })
      }
}
function authorization(req, res, next) {
  try {
      const id = req.params.id
      User.findById(id)
      .then(data =>{
          console.log(req.decoded, 'asd')
          if(String(data.UserId) == req.decoded.id){
              next()
          }else{
              res.status(401).json({
                  message: 'Not Authorized',
                  data: data.username
              })
          }
      })
      .catch(err => {
          res.status(404).json({
              message: 'Not Found',
              data: err
          })
      })
  } catch (err) {
      res.status(500).json({
          message: 'Internal Server Error',
          data: err
      })
  }
  
}


module.exports = {authentication, authorization}