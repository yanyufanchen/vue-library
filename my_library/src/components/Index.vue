<template>
  <div class="home_content">
    <el-container class="constent">
      <el-header class="header">
        <div class="logo">
          <img src="../images/logo.png" alt="">
        </div>
        <div class="logo_title">
          <span>PontyBridge University</span>
        </div>
        <div class="out" @click="layout()">Sign out</div>
      </el-header>
      <!-- 页面主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="toggle_menu?'60px':'200px'" class="aside">
          <div class="toggit" @click="toggle"><i :class="tabIcon[tabIconIndex]"></i></div>
          <el-menu
            :default-active="activePath"
            class="el-menu-vertical-demo"
            background-color="#242424"
            text-color="#fff"
            active-text-color="#5CB8F3"
            @select="saveNavState"
            unique-opened
            :router="true"
            :collapse="toggle_menu"
            :collapse-transition="false"
            ref="menuRef"
          >
            <!-- 一级菜单 -->
            <el-menu-item :index="'/' + item.path" v-for="(item,index ) in menulist " :key="index">
              <i :class=" iconObj[item.id] " class="title_icon"></i>
              <template slot="title" class="first">
                <span>{{item.authName}}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
    import { asize_api } from '@/api'
    export default {
        data() {
            return {
              tabIconIndex: '001',
              tabIcon: {
                '001': 'el-icon-s-fold',
                '002': 'el-icon-s-unfold'
              },
                menulist: [],
                iconObj: {
					        '101': 'el-icon-reading',
					        '102': 'iconfont icon-danju',
					        '103': 'iconfont icon-tijikongjian',
					        '105': 'el-icon-s-order',
					        '107': 'el-icon-tickets',
					        '106': 'el-icon-coin',
                  '104': 'iconfont icon-user',
                },
                toggle_menu: false,
                // 被激活的链接地址
                 activePath: '',
            }
        },
        methods: {
            async getMenuList() {
                //刷新home页面就请求侧边栏
                const { data: res } = await asize_api()
                if (res.status !== 200) return this.$message.error(res.msg)
                this.menulist = res.data
            },
            saveNavState(key, keyPath) {
                //存储侧边栏子栏请求地址
                window.sessionStorage.setItem('activePath', keyPath[0])
                this.activePath = keyPath[0]
            },
            toggle() {
                //切换关闭侧边栏
                this.toggle_menu = !this.toggle_menu
                if(!this.toggle_menu){
                  this.tabIconIndex='001'
                }else {
                  this.tabIconIndex='002'
                }
            },
            //退出
            layout(){
              var _self = this
              this.$confirm('Do you really want to quit?',{
              		confirmButtonText:'Sign out',
              		cancelButtonText:'Think about it',
              		type:'warning',
              		center:true
              	})
              	.then(function(){
              		//退出系统
                  window.sessionStorage.removeItem('token')
              		_self.$router.push({  //核心语句
                      path:'/login',   //跳转的路径
                  })
              	})
              	.catch(function(err){
              		console.log('Cancel')
              	})
            }
        },
        created() {
            this.activePath = window.sessionStorage.getItem('activePath')
            this.getMenuList() //执行函数  刷新home页面就请求侧边栏
        },
        mounted(){
            let url = window.location.href
            let path=url.slice(url.lastIndexOf('/')+1)
            if ( path == 'bookInfo' ) {
                this.$refs.menuRef.close()
            }
            this.activePath='/'+path
            //存储侧边栏子栏请求地址
            window.sessionStorage.setItem('activePath', this.activePath)
        }
    }
</script>

<style lang="less" scoped>
.home_content {
  width: 100%;
  height: 100%;
  .constent {
    width: 100%;
    height: 100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #242424;
      .logo {
        // width: 40px;
        height: 100%;
        img {
          height: 100%;
        }
      }
      .logo_title {
        display: flex;
        margin-left: 20px;
        width: 85%;
        color: #fff;
        font-size: 20px;
        justify-content: flex-start;
      }
      .out {
        // width: 80px;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        padding: 0 20px;
        height: 35px;
        line-height: 35px;
        color: #fff;
        background-color: #7f8c8d;
      }
      .out:hover{
        cursor: pointer;
        background: #969896;
      }
    }
    .aside {
      background-color: #242424;
      .toggit {
        text-align: center;
        font-size: 20px;
        letter-spacing: 0.2em;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
        color: #fff;
        background-color: #242424;
      }
    }
    .main {
      background-color: #eee;
    }
  }
}
.el-menu {
  border-right: none;
}
.title_icon {
  margin-right: 10px;
}
</style>
<style>
.home_content .el-submenu .el-submenu__title:hover {
  background-color: #eb3b5a !important;
}
.home_content .el-submenu .el-menu-item:hover {
  background-color: #eb3b5a !important;
}
</style>
