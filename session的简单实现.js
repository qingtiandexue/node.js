// 1. 定义：什么是cookie呢。cookie就是存储在客户端的一小段文本；
// 2. cookie是一门客户端的技术，因为 cookie 是存储在客户端浏览器中的；
// 3. cookie 的作用，是为了实现 客户端与 服务器端之间的状态保持；
// 4. cookie 技术，不安全，不要使用 cookie 保持敏感信息；
// 5. cookie 默认，在浏览器页面关闭之后，就立即失效了；如果想指定 cookie 的过期时间，需要通过 expires 属性来实现

const http = require('http')

const server = http.createServer()

// 需求：如果客户端是第一次请求 服务器，就返回文本 "送你一朵小红花"
// 如果不是第一次请求服务器，就返回文本 "不要太贪心"


let i = 0
let session = []
server.on('request', (req, res) => {
  if (req.url === '/') {
    // 每次客户端请求服务器，我们都可以解析一下请求头中，是否携带了 cookie，如果携带了cookie，则把 cookie 解析出来，解析为一个对象；
    const cookie = {}
    req.headers.cookie &&
    req.headers.cookie.split('; ').forEach(item => {
      const parts = item.split('=')
      cookie[parts[0]] = parts[1]
    })

    let vipNum = cookie.vip
    //有卡号，且能查到这个人
    if (vipNum && session[Number(vipNum) -1 ]) {
      res.writeHeader(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })

      //打印根据卡号查询到的个人信息
      console.log(session[Number(vipNum) -1 ]);
      res.end('我知道你是谁')
    } else {
      //否则给他办个会员卡

      const expiresTime = new Date(Date.now() + 60 * 60 * 1000).toUTCString()

      //set-cookie中返回会员卡号
      res.writeHeader(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': ['vip='+ (++i) + ';expires=' + expiresTime, 'test=ook; ']
      })

      //并且把个人信息存在服务端的session这个变量里
      session.push({
        name:'zs' + i,
        tel:'1300000000' + i
      })

      res.end('你是新客户，我已经帮你办了一张卡')
    }
  } else {
    res.end('404')
  }
})

server.listen(4321, () => {
  console.log('server running at http://127.0.0.1:4321')
})
