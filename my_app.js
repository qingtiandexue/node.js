const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const staticPath = path.join(__dirname, './node_modules')
const session = require('express-session')
const bodyParser = require('body-parser')


const expiresTime = new Date(+new Date() + 60*60*1000)
app.use(
  session({
    secret: '这是加密的密钥',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires:expiresTime
    }
  }))

fs.readdir(path.join(__dirname, './my_router'), (err, filenames) => {


  filenames.forEach((filename) => {
    let router = require('./my_router/' + filename)
    app.use(router)
  })
})


// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板页面的存放路径
app.set('views', path.join(__dirname, './my_views'))


app.use('/node_modules', express.static(staticPath))

app.use(bodyParser.urlencoded({extended: true}))

/*app.use(router1)
app.use(router2)*/


app.listen(80, () => {
  console.log("running at http://127.0.0.1");
})