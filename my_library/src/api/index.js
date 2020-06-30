import axios from 'axios'
// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888'
// 设置请求头
axios.interceptors.request.use(config => {
     //当进入request拦截器，表示发送了请求，我们就开启进度条
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 在最后必须 return config
    return config
})
//在response拦截器中，隐藏进度条
axios.interceptors.response.use(config =>{
    //当进入response拦截器，表示请求已经结束，我们就结束进度条
    NProgress.done()
    return config
  })
// 登录
export const login_api = (params) => {
    return axios.post('login', params)
}
// 侧边栏请求
export const asize_api = (params) => {
    return axios.get('menus', params)
}
//根据作者查询他的作品
export const getAuthorinfo = (params) => {
    return axios.post("getAuthorInfo", params);
}
//根据书名查询信息
export const getBookinfo = (params) => {
    return axios.post("getBookInfo", params);
}
//所有作者
export const getAuthorAll = (params) => {
    return axios.post("getAuthor", params);
}
//所有作者
export const getAllBook = (params) => {
    return axios.post("getAllBook", params);
}

//---------------------------------------------
// 获取所有图书
export const books_api = (params) => {
    return axios.post("getBookAll", params);
}
//添加图书
export const addBooks_api = (params) => {
    return axios.put('addBook',params)
}
//查询图书
export const getBooks_api = (params) => {
    return axios.post('getBook',params)
}
//修改图书
export const upBooks_api = (params) => {
    return axios.patch('updateBook',params)
}
//删除图书
export const deleteBooks_api = (params) => {
  return axios.delete('deleteBook', params);
}

//-----------------------------------------------------
//图书借阅所有信息
export const loanBook_api = (params) => {
    return axios.post('getLoanAll',params)
}
//图书借阅查询
export const getLoan_api = (params) => {
    return axios.post('getLoan',params)
}
//添加图书借阅
export const addLoan_api = (params) => {
    return axios.put('addLoan',params)
}
//修改图书借阅
export const updataLoan_api = (params) => {
    return axios.patch('updateLoan',params)
}
//删除图书借阅
export const deleteLoan_api = (params) => {
  return axios.delete('deleteLoan', params);
}
//全部逾期罚款查询
export const getPenaltyAll_api = (params) => {
    return axios.post('getDelayPenaltyAll',params)
}
//逾期罚款查询
export const getPenalty_api = (params) => {
    return axios.post('getDelayPenalty',params)
}
//逾期罚款查询
export const updataPenalty_api = (params) => {
    return axios.patch('updateDelayPenalty',params)
}
//---------------------------------------------------
// 所有读者信息
export const allUser_api = (params) => {
    return axios.post('getUserAll', params);
}
//查询读者
export const getUser_api = (params) => {
    return axios.post('getUser', params);
}
//读者添加
export const addUser_api = (params) => {
    return axios.put('addUser', params);
}
// 读者编辑
export const editUser_api = (params) => {
  return axios.patch('updateUser', params);
}
//删除管理员
export const deleteUser_api = (params) => {
  return axios.delete('deleteUser', params);
}

//-------------------------------------------------------
//所有管理员
export const allLogin_api = (params) => {
    return axios.post('getLoginAll', params);
}
//查询管理员
export const getLogin_api = (params) => {
    return axios.post('getLogin', params);
}
//添加管理员
export const addLogin_api = (params) => {
    return axios.put('addLogin', params);
}
//修改管理员
export const editLogin_api = (params) => {
  return axios.patch('updateLogin', params);
}
//删除管理员
export const deleteLogin_api = (params) => {
  return axios.delete('deleteLogin', params);
}


//-------------------------------------------------------
//所有借阅证
export const alllibraryCard_api = (params) => {
    return axios.post('getlibraryCardAll', params);
}
//查询借阅证
export const getlibraryCard_api = (params) => {
    return axios.post('getlibraryCard', params);
}
//添加借阅证
export const addlibraryCard_api = (params) => {
    return axios.put('addlibraryCard', params);
}
//修改借阅证
export const editlibraryCard_api = (params) => {
  return axios.patch('updatelibraryCard', params);
}
//删除借阅证
export const deletelibraryCard_api = (params) => {
  return axios.delete('deletelibraryCard', params);
}



//-------------------------------------------------------
//所有图书预约
export const allReservation_api = (params) => {
    return axios.post('getReservationAll', params);
}
//查询图书预约
export const getReservation_api = (params) => {
    return axios.post('getReservation', params);
}
//添加图书预约
export const addReservation_api = (params) => {
    return axios.put('addReservation', params);
}
//修改图书预约
export const editReservation_api = (params) => {
  return axios.patch('updateReservation', params);
}
//删除图书预约
export const deleteReservation_api = (params) => {
  return axios.delete('deleteReservation', params);
}
