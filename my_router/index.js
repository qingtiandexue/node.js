const express = require('express')
const router = express.Router()
const ctrl = require('../my_constroller/index.js')

router.get('/', ctrl.showIndexPage)


module.exports = router