// 公共路由
// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require('express')
const router = express.Router()

// 导入自己的 业务逻辑处理模块
const ctrl = require('../controller/controllerModule.js')
// 只要有人请求 后台的 / 根路径地址，就提示他，请求API服务器成功了！
router.get('/', ctrl.testAPI)
// checkLogin----------------------------
router.post('/login', ctrl.Login)
// getmenus左侧边栏
router.get('/menus', ctrl.getTab)

//根据作者查询他的作品
router.post('/getAuthorInfo', ctrl.getAuthorInfo)
//查询所有作者
router.post('/getAuthor', ctrl.getAuthorAllmes)
//查询所有书的id
router.post('/getAllBook', ctrl.getAllBookmes)
//根据书名查询所有信息
router.post('/getBookInfo', ctrl.bookinfoAll)
// book----------------------------
// get_BookAll
router.post('/getBookAll', ctrl.getBookAllmes)
// get_Book
router.post('/getBook', ctrl.getBookmes)
// add_Book
router.put('/addBook', ctrl.addBookmes)
// update_Book
router.patch('/updateBook', ctrl.updateBookmes)
// delete_Book
router.delete('/deleteBook', ctrl.deleteBookmes)

// loan----------------------------
// getLoanAll
router.post('/getLoanAll', ctrl.getLoanAllmes)
// getLoan
router.post('/getLoan', ctrl.getLoanmes)
// add_Loan
router.put('/addLoan', ctrl.addLoanmes)
// update_Loan
router.patch('/updateLoan', ctrl.updateLoanmes)
// delete_Loan
router.delete('/deleteLoan', ctrl.deleteLoanmes)

// user----------------------------
// getUserAll
router.post('/getUserAll', ctrl.getUserAllmes)
// getUser
router.post('/getUser', ctrl.getUsermes)
// add_user
router.put('/addUser', ctrl.addUsermes)
// update_user
router.patch('/updateUser', ctrl.updateUsermes)
// delete_User
router.delete('/deleteUser', ctrl.deleteUsermes)



//getLogin-----------------------------
// getLoginAll
router.post('/getLoginAll', ctrl.getLoginAllmes)
// getLogin
router.post('/getLogin', ctrl.getLoginmes)
// add_Login
router.put('/addLogin', ctrl.addLoginmes)
// update_Login
router.patch('/updateLogin', ctrl.updateLoginmes)
// delete_Login
router.delete('/deleteLogin', ctrl.deleteLoginmes)



//getlibrarycard-------------------------------
// getlibrarycardAll
router.post('/getlibraryCardAll', ctrl.getlibraryCardAllmes)
// getlibrarycard
router.post('/getlibraryCard', ctrl.addlibraryCardmes)
// add_librarycard
router.put('/addlibraryCard', ctrl.addlibraryCardmes)
// update_librarycard
router.patch('/updatelibraryCard', ctrl.updatelibraryCardmes)
// delete_librarycard
router.delete('/deletelibraryCard', ctrl.deletelibraryCardmes)



// //penalty-------------------------------
// getpenaltyAll
router.post('/getDelayPenaltyAll', ctrl.getDelayPenaltyAll)
// getpenalty
router.post('/getDelayPenalty', ctrl.getDelayPenalty)
// update_DelayPenalty
router.patch('/updateDelayPenalty', ctrl.updateDelayPenalty)
// delete_DelayPenalty
// router.delete('/deleteDelayPenalty', ctrl.deleteDelayPenalty)

// 抛出
module.exports = router