import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import( /* webpackChunkName:"login_index_welcome" */ './components/Login.vue')
const Index = () => import( /* webpackChunkName:"login_index_welcome" */ './components/Index.vue')

const BookInfo = () => import( /* webpackChunkName:"BookInfo_BookBorrow_OverdueInfo_UserInfo_Manage" */ './components/Book/BookInfo.vue')
const BookBorrow = () => import( /* webpackChunkName:"BookInfo_BookBorrow_UserInfo_Manage" */ './components/Book/BookBorrow.vue')
const OverdueInfo = () => import( /* webpackChunkName:"BookInfo_BookBorrow_OverdueInfo_UserInfo_Manage" */ './components/Book/OverdueInfo.vue')
const DelayPenalty = () => import( /* webpackChunkName:"DelayPenalty" */ './components/Penalty/DelayPenalty.vue')
const UserInfo = () => import( /* webpackChunkName:"BookInfo_BookBorrow_OverdueInfo_UserInfo_Manage" */ './components/User/UserInfo.vue')
const userManage = () => import( /* webpackChunkName:"BookInfo_BookBorrow_OverdueInfo_UserInfo_Manage" */ './components/userManage/userManage.vue')
const BorrowCard = () => import( /* webpackChunkName:"BookInfo_BookBorrow_OverdueInfo_UserInfo_Manage" */ './components/BorrowCard/BorrowCard.vue')





Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [{
          path: '/index',
          redirect: '/bookInfo'
        },
        {
          path: '/bookInfo',
          component: BookInfo
        },
        {
          path: '/bookBorrow',
          component: BookBorrow
        },
        {
          path: '/overdueInfo',
          component: OverdueInfo
        }, {
          path: '/penaltyInfo',
          component: DelayPenalty
        },
        {
          path: '/userInfo',
          component: UserInfo
        },
        {
          path: '/userManage',
          component: userManage
        },
        {
          path: '/cardBorrowing',
          component: BorrowCard
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  var tokenstr = window.sessionStorage.getItem('token')
  if (to.path == '/login' && !tokenstr) return next()
  if (!tokenstr) return next('/login')
  if (to.path == '/login') return next('/home')

  next()
})
export default router
