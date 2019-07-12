const conn = require('../my_db/index.js')


const showIndexPage = (req, res) => {
  let nowpage=Number(req.query.page)||1
  let pagesize=4
  const sql=`select a.id, a.title, a.ctime, u.nickname from blog_articles as a LEFT JOIN blog_users as u on a.authorId=u.id ORDER BY a.ctime desc limit ${(nowpage - 1) * pagesize}, ${pagesize}; SELECT count(*) as count FROM blog_articles`;
  conn.query(sql,(err,result)=>{
    if(err)return send('查询失败')
    let totalpage=Math.ceil(result[1][0].count / pagesize)   
    let { user ,isLogin} = req.session
    let data = {
      user,
      isLogin,
      articles:result[0],
      totalpage:totalpage,
      nowpage:nowpage
    }
    res.render('index.ejs', data)
  })
 
}

module.exports = {
  showIndexPage
}