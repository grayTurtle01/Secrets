mongoose = require('mongoose')

UserSchema = new mongoose.Schema({
    microsoftId: {
      type: String,
      // require: true
    },
     displayName: {
      type: String,
      require: true
    },
    
})

module.exports = mongoose.model('User', UserSchema)
