// 公共业务处理模块

const conn = require('../db.js')
// let bId = ''
// let uId = ''
module.exports = {
  // 测试 API 服务器能否正常被请求
  testAPI: (req, res) => {
    res.send('api-success')
  },
  // 登录{username: string,password: string}
  Login: (req, res) => {
    const body = req.body
    const sql = 'select * from Login WHERE username="' + body.username + '"and password="' + body.password + '"'
    conn.each(sql, function (err, result) {
      if (err) return res.send({
        status: 500,
        msg: '登录操作错误！'
      })
      if (!result) {
        return res.send({
          msg: '账号或密码错误，请重试！',
          status: 502
        })
      }
      res.send({
        status: 200,
        msg: '登录成功',
        data: {
          token: new Date()
        }
      })
    })
  },
  // 查询menus左侧边栏
  getTab: (req, res) => {
    const result = [{
      id: 101,
      authName: "Book information", //图书信息管理
      path: 'bookInfo'
    }, {
      id: 102,
      authName: "Book borrowing", //图书借阅管理
      path: 'bookBorrow'
    }, {
      id: 103,
      authName: "Reader information", //读者信息管理
      path: 'userInfo'
    }, {
      id: 105,
      authName: "Library card", //借阅证信息管理
      path: 'cardBorrowing'
    }, {
      id: 107,
      authName: "overdue information", //借阅逾期信息---
      path: 'overdueInfo'
    }, {
      id: 106,
      authName: "Delay Penalty", //逾期罚款管理
      path: 'penaltyInfo'
    }, {
      id: 104,
      authName: "System setup", //系统设置
      path: 'userManage'
    }, ]
    res.send({
      status: 200,
      msg: 'get menus~ok',
      data: result
    })
  },
  //根据作者查询作者的作品
  getAuthorInfo: (req, res) => {
    const body = req.body
    const sql = `select * from Book WHERE authorId = '${body.id}'`;
    conn.all(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!result) {
        return res.send({
          msg: 'null',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
  },
  //根据图书查询相信信息{id:number}
  bookinfoAll:(req,res)=>{
    let body = req.body
     const sql1 = `SELECT b.id,b.title,b.isbn,b.createdAt,b.id,b.authorId,a.name FROM Book b LEFT JOIN Author a WHERE b.authorId=a.id and b.id=${body.id};`
    conn.all(sql1, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!result) {
        return res.send({
          msg: '查询失败',
          status: 502
        })
      }
      if (result.length == 0) {
        return res.send({
          msg: '暂无该信息',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
     },
  //查询所有作者的
  getAuthorAllmes: (req, res) => {
    const body = req.body
    const sql = `select * from Author `;
    conn.all(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!result) {
        return res.send({
          msg: 'null',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
  },
  //查询所有的书
  getAllBookmes: (req, res) => {
    const body = req.body
    const sql = `select * from Book`;
    conn.all(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!result) {
        return res.send({
          msg: 'null',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
  },
  // 查询全部图书信息{pageNO:number,pagesize:number}
  getBookAllmes: (req, res) => {
    let body = req.body
    const sql1 = `SELECT b.id,b.title,b.isbn,b.createdAt,b.id,b.authorId,a.name FROM Book b LEFT JOIN Author a WHERE b.authorId=a.id LIMIT(${body.pageNO}-1)*${body.pagesize},${body.pagesize};`
    const sql2 = `SELECT COUNT(*) FROM Book b LEFT JOIN Author a  WHERE b.authorId=a.id;`
    conn.all(sql1, (err, bookrows) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!bookrows) {
        return res.send({
          msg: '查询失败',
          status: 502
        })
      }
      if (bookrows.length == 0) {
        return res.send({
          msg: '暂无图书',
          status: 200
        })
      }
      conn.all(sql2, (err, total) => {
        // 如果读取数据失败，则返回一个失败的结果
        if (err) return res.send({
          status: 500,
          msg: err.message,
          data: null
        })
        // 如果获取数据成功，则直接返回成功的数据结果
        res.send({
          status: 200,
          msg: 'getbook~ok',
          data: bookrows,
          total: total[0]['COUNT(*)']
        })
      })

    })
  },
  // 根据图书名查询图书信息{bookTitle: string}or{bookIsbn: number}
  getBookmes: (req, res, next) => {
    const body = req.body
    let sql_mes = ''
    if (body.bookTitle) {
      sql_mes = 'b.title="' + body.bookTitle + '"'
    } else if (body.bookIsbn) {
      sql_mes = 'b.isbn=' + body.bookIsbn
    } else if (body.bookTitle && body.bookIsbn) {
      sql_mes = 'b.title="' + body.bookTitle + '" and b.isbn="' + body.bookIsbn + '"'
    } else {
      sql_mes = '1=1'
    }
    const sql = `select * from Book b LEFT JOIN Author a ON b.authorId=a.id WHERE ${sql_mes}`
    conn.get(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!result) {
        return res.send({
          msg: 'null',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
  },
  // 添加图书{bookTitle:string,bookIsbn:number,authorName: string}
  addBookmes: async (req, res) => {
    let ctime = +new Date()
    let utime = +new Date()
    const body = req.body
    let sqlbook = `select * from Book WHERE title="${body.bookTitle}"`
    conn.get(sqlbook, (err, bookrow) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (bookrow) {
        return res.send({
          msg: 'Books already exist',
          status: 200
        })
      }

      let sqlauthor = `select * from Author WHERE name="${body.authorName}"`
      conn.get(sqlauthor, (err, authorrow) => {
        if (err) return res.send({
          status: 500,
          msg: err.message,
          data: null
        })
        let sql2 = ''
        if (authorrow) {
          sql2 = `INSERT INTO Book (title,isbn,AuthorId) VALUES ('${body.bookTitle}','${body.bookIsbn}',${authorrow.id})`
          conn.run(sql2, (err) => {
            if (err) return res.send({
              status: 500,
              msg: err.message,
              data: null
            })
            res.send({
              status: 200,
              msg: 'ok',
              data: null
            })
          })
        } else {
          sql2 = `INSERT INTO Author (name,createdAt,updatedAt) VALUES ('${body.authorName}',${ctime},${utime})`
          sql3 = `INSERT INTO Book (title,isbn,createdAt,updatedAt,AuthorId) VALUES ('${body.bookTitle}','${body.bookIsbn}',${ctime},${utime},(select a.id from Author as a WHERE name='${body.authorName}'));`
          conn.run(sql2, (err) => {
            if (err) return res.send({
              status: 500,
              msg: err.message,
              data: null
            })
            conn.run(sql3, (err) => {
              if (err) return res.send({
                status: 500,
                msg: err.message,
                data: null
              })
              res.send({
                status: 200,
                msg: 'ok',
                data: null
              })
            })
          })

        }

      })
    })

  },
  // 修改图书信息{bookTitle:string,bookIsbn:number,authorName: string,bookId: Number}
  updateBookmes: (req, res) => {
    const body = req.body
    let ctime = +new Date()
    let utime = +new Date()
    let sqlauthor = `select * from Author WHERE name="${body.authorName}"`
    conn.get(sqlauthor, (err, authorrow) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      // 如果有该作者，就获取到该作者id,然后覆盖authorId,没有就重新写入author
      if (authorrow) {
        let sql = `UPDATE Book SET title='${body.bookTitle}',isbn=${body.bookIsbn},updatedAt=${utime},AuthorId=${authorrow.id} WHERE id=${body.bookId}`
        conn.run(sql, (err) => {
          if (err) return res.send({
            status: 500,
            msg: err.message,
            data: null
          })
          res.send({
            status: 200,
            msg: 'updateBook~ok',
            data: null
          })
        })
      } else {
        let sql2 = `INSERT INTO Author (name,createdAt,updatedAt) VALUES ('${body.authorName}',${ctime},${utime})`
        let sql3 = `UPDATE Book SET title='${body.bookTitle}',isbn=${body.bookIsbn},updatedAt=${utime},AuthorId=(select a.id from Author as a WHERE name='${body.authorName}') WHERE id=${body.bookId}`
        conn.run(sql2, (err) => {
          if (err) return res.send({
            status: 500,
            msg: err.message,
            data: null
          })
          conn.run(sql3, (err) => {
            if (err) return res.send({
              status: 500,
              msg: err.message,
              data: null
            })
            res.send({
              status: 200,
              msg: 'updateBook~ok,同时新增作者',
              data: null
            })
          })
        })
      }
    })

  },
  // 删除图书信息{bookId: number}
  deleteBookmes: (req, res) => {
    const body = req.body
    let sql = `DELETE FROM Book WHERE id=${body.bookId}`
    conn.run(sql, (err, row) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })

      res.send({
        status: 200,
        msg: 'deleteBook~ok',
        data: null
      })
    })

  },


  // 查询借阅信息{pageNO:number,pagesize:number}
  getLoanAllmes: (req, res) => {
    let body = req.body
    const sql1 = `SELECT l.dueDate,u.name,b.title,l.id FROM Loan l LEFT JOIN User u ON l.UserId=u.id LEFT JOIN Book b ON l.BookId=b.id LIMIT(${body.pageNO}-1)*${body.pagesize},${body.pagesize};`
    const sql2 = `SELECT COUNT(*) FROM Loan`
    conn.all(sql1, (err, loanrows) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!loanrows) {
        return res.send({
          msg: '查询失败',
          status: 502
        })
      }
      if (loanrows.length == 0) {
        return res.send({
          msg: '暂无借阅记录',
          status: 200
        })
      }

      conn.all(sql2, (err, total) => {
        // 如果读取数据失败，则返回一个失败的结果
        if (err) return res.send({
          status: 500,
          msg: err.message,
          data: null
        })
        // 如果获取数据成功，则直接返回成功的数据结果
        res.send({
          status: 200,
          msg: 'getloan~ok',
          data: loanrows,
          total: total[0]['COUNT(*)']
        })
      })
    })
  },
  // 根据图书名查询图书信息{bookTitle: string}or{userName: string}
  getLoanmes: (req, res) => {
    const body = req.body
    let sql_mes = ''
    if (body.bookTitle) {
      sql_mes = 'b.title="' + body.bookTitle + '"'
    } else if (body.userName) {
      sql_mes = 'u.name="' + body.userName + '"'
    } else {
      return res.send({
        status: 502,
        msg: '参数不准确',
        data: null
      })
    }
    const sql = `SELECT u.name,u.barcode,u.memberType,l.dueDate,l.id,l.BookId,l.UserId,b.title FROM Loan l LEFT JOIN User u ON u.id=l.UserId LEFT JOIN Book b ON l.BookId=b.id WHERE ${sql_mes}`
    conn.all(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!result) {
        return res.send({
          msg: '查询失败',
          status: 502
        })
      }
      if (result.length == 0) {
        return res.send({
          msg: '暂无该借阅记录',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })

  },
  // 添加借阅信息{duetime: number,userId: number,bookId: number}
  addLoanmes: (req, res) => {
    const body = req.body
    let ctime = +new Date()
    let utime = +new Date()
    let duetime = body.dueDate
    let sql = `INSERT INTO Loan (dueDate,createdAt,updatedAt,UserId,BookId) VALUES ('${duetime}','${ctime}','${utime}','${body.userName}','${body.bookTitle}')`
    conn.run(sql, (err) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'ok',
        data: null
      })
    })
  },
  // 修改借阅信息{duetime: number,userId: number,bookId: number,LoanId:number}
  updateLoanmes: (req, res) => {
    const body = req.body
    let utime = +new Date()
    let sql = `UPDATE Loan SET dueDate=${body.duetime},updatedAt=${utime} WHERE id=${body.LoanId}`
    conn.run(sql, (err) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'updateLoan~ok',
        data: null
      })
    })
  },
  // 删除借阅信息{loanId: number}
  deleteLoanmes: (req, res) => {
    const body = req.body
    let sql = `DELETE FROM Loan WHERE id=${body.loanId}`
    conn.run(sql, (err, row) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'deleteLoan~ok',
        data: null
      })
    })

  },


  // 查询读者信息{pageNO:number,pagesize:number}
  getUserAllmes: (req, res) => {
    let body = req.body
    let sql1=''
    if(Object.getOwnPropertyNames(req.body).length != 0){
      sql1 = `SELECT * FROM User LIMIT(${body.pageNO}-1)*${body.pagesize},${body.pagesize};`
    }else {
      sql1 = `SELECT * FROM User ;`
    }
    const sql2 = `SELECT COUNT(*) FROM User ;`
    conn.all(sql1, (err, userrows) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!userrows) {
        return res.send({
          msg: '查询失败',
          status: 502
        })
      }
      if (userrows.length == 0) {
        return res.send({
          msg: '暂无读者信息',
          status: 200
        })
      }
      conn.all(sql2, (err, total) => {
        // 如果读取数据失败，则返回一个失败的结果
        if (err) return res.send({
          status: 500,
          msg: err.message,
          data: null
        })
        // 如果获取数据成功，则直接返回成功的数据结果
        res.send({
          status: 200,
          msg: 'getuser~ok',
          data: userrows,
          total: total[0]['COUNT(*)']
        })
      })
    })
  },
  // 根据读者名查询图书信息{userName: string}or{userBarcode: string}
  getUsermes: (req, res) => {
    const body = req.body
    let sql_mes = ''
    if (body.userName) {
      sql_mes = 'name="' + body.userName + '"'
    } else if (body.userBarcode) {
      sql_mes = 'barcode="' + body.userBarcode + '"'
    } else {
      return res.send({
        status: 502,
        msg: '参数不准确',
        data: null
      })
    }
    const sql = `SELECT * FROM User WHERE ${sql_mes}`
    conn.each(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!result) {
        return res.send({
          msg: '查询失败',
          status: 502
        })
      }
      if (result.length == 0) {
        return res.send({
          msg: '暂无该读者',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
  },
  // 添加读者信息{userName: string,memberType: string}
  addUsermes: (req, res) => {
    const body = req.body
    let ctime = +new Date()
    let utime = +new Date()
    // 唯一随机编号
    let barcode = Date.now().toString(36)
    let sql = `INSERT INTO User (name,barcode,memberType,createdAt,updatedAt) VALUES ('${body.userName}','${barcode}','${body.memberType}',${ctime},${utime})`
    conn.run(sql, (err) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'ok',
        data: null
      })
    })
  },
  // 编辑读者信息{userName: string,memberType: string,userId: number}
  updateUsermes: (req, res) => {
    const body = req.body
    let ctime = +new Date()
    let utime = +new Date()
    // 唯一随机编号
    let barcode = Date.now().toString(36)
    let sql = `UPDATE User SET name='${body.userName}',memberType='${body.memberType}',updatedAt=${utime} WHERE id=${body.userId}`
    conn.run(sql, (err) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'updateUser~ok',
        data: null
      })
    })
  },
  // 删除读者信息{userId: number}
  deleteUsermes: (req, res) => {
    const body = req.body
    let sql = `DELETE FROM User WHERE id=${body.userId}`
    conn.run(sql, (err, row) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'deleteUser~ok',
        data: null
      })
    })

  },


  //获取用户信息
  getLoginAllmes: (req, res) => {
    let body = req.body
    const sql1 = `SELECT * FROM Login;`
    conn.all(sql1, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })

      if (!result) {
        return res.send({
          msg: 'null',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
  },

  //添加管理员 {username:string,password:string}
  addLoginmes: (req, res) => {
    const body = req.body
    let sql = `INSERT INTO Login (username,password,isSuper) VALUES ('${body.username}','${body.password}',2)`
    conn.run(sql, (err, result) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'ok',
        data: null
      })
    })
  },

  //查询管理员信息
  getLoginmes: (req, res, next) => {
    const body = req.body
    let sql_mes = '';
    sql_mes = 'username="' + body.username + '"'
    const sql = `select * from Login WHERE ${sql_mes}`
    conn.each(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) {
        throw err
      } else {
        res.send({
          status: 200,
          msg: 'ok',
          data: result
        })
      }

    })
  },

  //修改管理员 {id:string,password:string}
  updateLoginmes: (req, res) => {
    const body = req.body
    let sql = `UPDATE Login SET password=${body.password} WHERE id=${body.id}`
    conn.run(sql, (err) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'updateLoan~ok',
        data: null
      })
    })
  },
  // 删除管理员信息{LoginId: number}
  deleteLoginmes: (req, res) => {
    const body = req.body
    let sql = `DELETE FROM Login WHERE id=${body.LoginId}`
    conn.run(sql, (err, row) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'deleteUser~ok',
        data: null
      })
    })

  },


  //借书证办理（所有信息）
  getlibraryCardAllmes: (req, res) => {
    let body = req.body
    const sql1 = `SELECT * FROM BorrowCard;`
    conn.all(sql1, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })

      if (!result) {
        return res.send({
          msg: 'null',
          status: 200
        })
      }
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
  },

  //添加借书证 {name:string,barcode:string}
  addlibraryCardmes: (req, res) => {
    const body = req.body
    let sql = `INSERT INTO BorrowCard (name,barcode) VALUES ('${body.name}','${body.barcode}')`
    conn.run(sql, (err, result) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'ok',
        data: null
      })
    })
  },

  //查询借书证信息{name:string,barcode:string}
  getlibraryCardmes: (req, res, next) => {
    const body = req.body
    let sql_mes = ''
    if (body.name) {
      sql_mes = 'name="' + body.name + '"'
    } else if (body.barcode) {
      sql_mes = 'barcode="' + body.barcode + '"'
    } else {
      return res.send({
        status: 502,
        msg: '参数不准确',
        data: null
      })
    }
    const sql = `select * from BorrowCard WHERE ${sql_mes}`
    conn.each(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) {
        throw err
      } else {
        res.send({
          status: 200,
          msg: 'ok',
          data: result
        })
      }

    })
  },

  //修改借书证 {name:string,barcode:string,id:string}
  updatelibraryCardmes: (req, res) => {
    const body = req.body
    let sql = `UPDATE BorrowCard SET barcode='${body.barcode}',name = '${body.name}' WHERE id=${body.id}`
    conn.run(sql, (err) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'updateLoan~ok',
        data: null
      })
    })
  },
  // 删除借书证信息{bCardId: number}
  deletelibraryCardmes: (req, res) => {
    const body = req.body
    let sql = `DELETE FROM BorrowCard WHERE id=${body.bCardId}`
    conn.run(sql, (err, row) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'deleteUser~ok',
        data: null
      })
    })

  },


  //查询罚款单价全部信息{pageNO:number,pagesize:number}
  getDelayPenaltyAll: (req, res) => {
    let body = req.body
    const sql1 = `SELECT * FROM delayPenalty ;`
    const sql2 = `SELECT COUNT(*) FROM delayPenalty`
    conn.all(sql1, (err, loanrows) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      if (!loanrows) {
        return res.send({
          msg: '查询失败',
          status: 502
        })
      }
      if (loanrows.length == 0) {
        return res.send({
          msg: '暂无借阅记录',
          status: 200
        })
      }

      conn.all(sql2, (err, total) => {
        // 如果读取数据失败，则返回一个失败的结果
        if (err) return res.send({
          status: 500,
          msg: err.message,
          data: null
        })
        // 如果获取数据成功，则直接返回成功的数据结果
        res.send({
          status: 200,
          msg: 'getPenalty~ok',
          data: loanrows,
          total: total[0]['COUNT(*)']
        })
      })
    })
  },
  //查询罚款单价信息{PenaltyId:number}
  getDelayPenalty: (req, res, next) => {
    const body = req.body
    const sql = `select * from delayPenalty WHERE id=${body.PenaltyId}`
    conn.each(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'ok',
        data: result
      })
    })
  },

  // 修改罚款单价/day {penalty_id:number,penaltyNum:number}
  updateDelayPenalty: (req, res) => {
    const body = req.body
    let sql = `UPDATE delayPenalty SET delay_penalty='${body.penaltyNum}' WHERE id=${body.penalty_id}`
    conn.run(sql, (err) => {
      if (err) return res.send({
        status: 500,
        msg: err.message,
        data: null
      })
      res.send({
        status: 200,
        msg: 'updatePenalty~ok',
        data: null
      })
    })
  },
  











}