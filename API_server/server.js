// 项目启动 supervisor ./server.js
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

// 注册 body-parser 中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());//数据格式化
    // 导入session
    const session = require('express-session')
    // 注册session中间件，那么，只要访问到req，就可以调用req.session
    // 启动session
const expiresTime = new Date(+new Date() + 160 * 60 * 1000) //设置cookie的过期时间
app.use(session({
        secret: 'keyboard cat', // 相当于一个加密钥匙，值可以是任意字符串
        resave: false, // 强制 session 保存到 session store 中
        saveUninitialized: false, // 强制没有'初始化'的 session 保存到 storage 中
        cookie: {
            expires: expiresTime
        }
    }))
// //设置跨域访问
// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('X-Powered-By', ' 3.2.1');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });
// 在 API 服务器端，启用 CORS 跨域资源共享
const cors = require('cors')
app.use(cors())

// 导入自己的路由模块
// 注册路由模块
// 公共路由模块
const router = require('./router/router')
app.use(router)
// 我的博客路由模块
// const router_myblog = require('./router/router_myblog')
// app.use(router_myblog)






// 让 后端项目，运行在 5001 端口
app.listen(8888, () => {
    console.log('api server running at http://127.0.0.1:8888')
})