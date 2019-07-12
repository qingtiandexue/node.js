const express = require('express')
const router = express.Router()
const ctrl = require('../my_constroller/article.js')

router.get('/article/add', ctrl.showArticleAddPage)
router.post('/article/add', ctrl.addarticle)
router.get('/article/info/:id', ctrl.articleinfo)
router.get('/article/edit/:id', ctrl.articleedit)
router.post('/article/update', ctrl.articleupdate)


module.exports = router