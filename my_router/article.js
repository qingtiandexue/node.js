const express = require('express')
const router = express.Router()
const ctrl = require('../my_constroller/article.js')

router.get('/article/add', ctrl.showArticleAddPage)


module.exports = router