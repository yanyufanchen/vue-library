## 安装SQLite3

#### 1·用npm包安装sqlite3。

```
npm install sqlite3 –g
```

<https://blog.csdn.net/qq_38081746/article/details/90673681>

#### 2·安装依赖包

```
npm i
```

#### 3·执行项目

```
supervisor .\server.js
```

#### 4·数据库表

```
library.db
账号密码
root
root
```

#### 5·功能

##### 登录

```
路径：/login
请求方式：post
参数：{username: string,password: string}
```

##### 侧边栏

```
路径：/menus
请求方式：get
参数：
```

##### 图书信息

```
查询全部图书
路径：/getBookAll
请求方式：post
参数：{pageNO:number,pagesize:number}
根据图书名查询图书信息
路径：/getBook
请求方式：post
参数：{bookTitle: string}or{bookIsbn: number}
添加图书
路径：/addBook
请求方式：put
参数：{bookTitle:string,bookIsbn:number,authorName: string}
修改图书信息
路径：/updateBook
请求方式：update
参数：{bookTitle:string,bookIsbn:number,authorName: string,bookId: Number}
删除图书信息
路径：/deleteBook
请求方式：delete
参数：{bookId: number}
```

##### 借阅信息

```
查询全部借阅信息
路径：/getLoanAll
请求方式：post
参数：{pageNO:number,pagesize:number}
查询借阅信息
路径：/getLoan
请求方式：post
参数：{bookTitle: string}or{userName: string}
添加借阅信息
路径：/addLoan
请求方式：put
参数：{duetime: number,userId: number,bookId: number}
修改借阅信息
路径：/updateLoan
请求方式：update
参数：{duetime: number,userId: number,bookId: number,LoanId:number}
删除借阅信息
路径：/deleteLoan
请求方式：delete
参数：{loanId: number}
```

##### 读者信息

```
查询读者信息
路径：/getUserAll
请求方式：post
参数：{pageNO:number,pagesize:number}
查询读者信息
路径：/getUser
请求方式：post
参数：{userName: string}or{userBarcode: string}
添加读者信息
路径：/addUser
请求方式：put
参数：{userName: string,memberType: string}
修改读者信息
路径：/updateUser
请求方式：update
参数：{userName: string,memberType: string,userId: number}
删除读者信息
路径：/deleteUser
请求方式：delete
参数：{userId: number}
```

##### 用户信息

```
查询用户信息
路径：/getLoginAll
请求方式：post
参数
查询用户信息
路径：/getLogin
请求方式：post
参数：{userName: string}
添加用户信息
路径：/addLogin
请求方式：put
参数：{username:string,password:string}
修改用户信息
路径：/updateLogin
请求方式：update
参数：{id:string,password:string}
删除用户信息
路径：/deleteLogin
请求方式：delete
参数：{LoginId: number}
```

##### 借阅卡

```
查询所有借阅卡
路径：/getBorrowCardAll
请求方式：post
参数
查询借阅卡
路径：/getBorrowCard
请求方式：post
参数：{name:string,barcode:string}
添加借阅卡
路径：/addBorrowCard
请求方式：put
参数：{name:string,barcode:string}
修改借阅卡
路径：/updateBorrowCard
请求方式：update
参数：{name:string,barcode:string,id:string}
删除借阅卡
路径：/deletebCardr
请求方式：delete
参数：{bCardId: number}
```

##### 罚款管理

```
查询所有罚款单价
路径：/getDelayPenaltyAll
请求方式：post
参数
查询罚款单价{PenaltyId:number}
路径：/getDelayPenalty
请求方式：post
参数：{name:string,barcode:string}
修改罚款单价
路径：/updateDelayPenalty
请求方式：update
参数：{penalty_id:number,penaltyNum:number}

```

##### 逾期管理

```
查询全部借阅信息---并通过罚款单价在前端计算逾期罚款金额
路径：/getLoanAll
请求方式：post
参数：{pageNO:number,pagesize:number}


```



## API

sqlite3 Node.js包为执行查询提供了一些不同的方法

- database 新建并打开sqlite3数据库文件

- prepare

- run 用于创建或更改表格并插入或更新表格数据

- get 从一个或多个表中选择一行数据

- all 从一个或多个表中选择多行数据

- each 查单个

- exec

- map

- close 关闭数据库

  ​

#### 执行开始--------------

```
创建数据库
//数据库的名字是"db.db"
// var database;
const sqlite3 = require("sqlite3");
var conn = new sqlite3.Database("./library.db", function(err){
 if (err) throw err;
});

创建表Login
// 写入数据库----------------------------------------------
// conn.run("create table Login (id INT,username VARCHAR,password VARCHAR)",(err)=>{
//   if(err) throw err;
//   console.log("数据表创建成功")
// })

```

#### 查单个数据的实例each

```

conn.each(sql, function (err, result) {
      // const result=JSON.stringify(row)
      console.log(result,11111)
      if (err) return res.send({
        status: 500,
        msg: '登录操作错误！'
      })
      if (!result) {
        return res.send({
          msg: '账号或密码错误，请重试！',
          stasus: 502
        })
      }
      res.send({
        status: 200,
        msg: '登录成功',
        data: {
          token: 11
        }
      })
    })
```

