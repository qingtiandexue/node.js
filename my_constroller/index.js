const conn = require('../my_db/index.js')


const showIndexPage = (req, res) => {
  let { user ,isLogin} = req.session
  let data = {
    user,
    isLogin
  }
  res.render('index.ejs', data)
}

module.exports = {
  showIndexPage
}