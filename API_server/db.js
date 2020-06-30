// 数据操作模块

// 导入 mysql 模块
// const mysql = require('mysql')
// // 创建数据库连接
// const conn = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root',
//   database: 'my_blog',
//   // 开启执行多条Sql语句的功能
//   multipleStatements: true
// })
// ----------------------------------

const path = require("path");
//数据库的名字是"db.db"
// 导入 sqlite 模块
const sqlite3 = require("sqlite3");
var conn = new sqlite3.Database("./library.db", function(err){
 if (err) throw err;
});
module.exports = conn