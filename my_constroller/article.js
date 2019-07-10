const conn = require('../my_db/index.js')


const showArticleAddPage = (req, res) => {

  res.render('./article/add.ejs', {})
}

module.exports = {
  showArticleAddPage
}