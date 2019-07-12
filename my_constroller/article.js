const conn = require('../my_db/index.js')
const moment=require('moment')

const showArticleAddPage = (req, res) => {
  let { user ,isLogin} = req.session
  let data = {
    user,
    isLogin
  }
  res.render('./article/add.ejs', data)
}
const addarticle = (req, res) => {
  let body = req.body
  body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
  let sql = 'insert into blog_articles set ?'
  conn.query(sql,body,(err,result)=>{
    if(err)return res.send('插入失败'+err.message)
    // let { user ,isLogin} = req.session
    // let data = {
    //   user,
    //   isLogin,
    //   insertId:result.insertId
    // }
    // console.log(data);
    res.send({msg:'添加成功',insertId:result.insertId})     
  })
  
}
const articleinfo = (req, res) => {
  // console.log(req.params); 
  const sql = 'select * from blog_articles where id=?'
  conn.query(sql,req.params.id,(err,result)=>{
    if(err)return send('读取失败'+err.message)
    console.log(result); 
    let { user ,isLogin} = req.session
    let data = {
      user,
      isLogin,
      data:result[0],     
    }
    console.log(data); 
    res.render('./article/info.ejs', data)
  }) 
}
const articleedit = (req, res) => {
  const sql = 'select * from blog_articles where id=?'
  conn.query(sql,req.params.id,(err,result)=>{
    if(err)return send('读取失败'+err.message)
    // console.log(result); 
    let { user ,isLogin} = req.session
    let data = {
      user,
      isLogin,
      data:result[0],     
    }
    res.render('./article/edit.ejs', data)
  })
}
const articleupdate = (req, res) => {
  const sql = 'update blog_articles set ? where id = ?'  
  conn.query(sql,[req.body,req.body.id],(err,result)=>{
    if(err)return send('更新失败'+err.message)
    // console.log(result); 
    res.send({status:200})
  })
}
module.exports = {
  showArticleAddPage,
  addarticle,
  articleinfo,
  articleedit,
  articleupdate
}