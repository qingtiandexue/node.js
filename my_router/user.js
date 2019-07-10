const express = require('express')
const router = express.Router()
const ctrl = require('../my_constroller/user.js')

router.get('/login', ctrl.showLoginPage)

router.get('/register', ctrl.showRegPage)

router.get('/logout',ctrl.logout)

router.post('/register', ctrl.reg)


router.post('/login',ctrl.login)


module.exports = router