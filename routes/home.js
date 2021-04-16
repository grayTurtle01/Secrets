express = require('express')
router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')


homeControler  = require("../controllers/home")
todosControler = require('../controllers/todos')

router.get("/", ensureGuest, homeControler.renderHome )

router.get("/public", todosControler.renderAllTodos)

module.exports = router
