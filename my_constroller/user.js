const conn = require('../my_db/index.js')

const moment = require('moment')

const showLoginPage = (req, res) => {

  res.render('./user/login.ejs', {})
}

const showRegPage = (req, res) => {

  res.render('./user/register.ejs', {})
}

const reg = (req, res) => {
  //校验合法性
  if (req.body.username.length <= 0 ||
    req.body.password.length <= 0 ||
    req.body.nickname.length <= 0
  ) {
    return res.send({msg: '请填写完整的表单数据后再注册用户！', status: 501})
  }

  //检查是否有相同用户
  const sql = `select count(*) as count from blog_users where username=?`
  conn.query(sql, req.body.username, (err, result) => {
    if (err) return res.send({msg: '数据库查询失败！', status: 502})
    if (result[0].count !== 0) return res.send({msg: '请更换其它用户名后重新注册！', status: 503})

    //没有相同用户，则插入用户
    const sql2 = 'insert into blog_users set ?'
    req.body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    conn.query(sql2, req.body, (err, result) => {
      if (err) return res.send({msg: '数据库插入失败！', status: 503})
      res.send({msg: '注册新用户成功！', status: 200})
    })
  })
}

const login =(req,res)=>{

  const sql = "select * from blog_users where username=? and password=?"
  conn.query(sql,[req.body.username,req.body.password],(err,result)=>{
    if(err) return res.send({msg:'用户登录失败',status:500})
    if(result.length !== 1) return res.send({msg:'用户登录失败',status:501})


    req.session.user = result[0]
    req.session.isLogin = true

    res.send({msg:'用户登录成功',status:200})
  })
}


const logout = (req,res) =>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
}

module.exports = {
  showLoginPage,
  showRegPage,
  reg,
  login,
  logout
}

