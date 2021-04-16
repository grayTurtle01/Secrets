mongoose = require('mongoose')

//~ uri="mongodb://localhost/todo_mvc_DB"
uri=process.env.MONGO_URI

config = {useNewUrlParser: true,
          useUnifiedTopology: true}

function connectDB() {
  mongoose.connect(uri, config)
    .then(db => console.log((`  --> db is connected on: ${db.connection.host}`)))
    .catch( err => console.erro(err) )
}

module.exports = connectDB
