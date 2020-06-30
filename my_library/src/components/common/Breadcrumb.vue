<template>
   <el-breadcrumb separator=">">
   <!--  -->
      <el-breadcrumb-item :to="{ path: '/bookInfo' }" @click.native="toHome" >Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>{{value[0]}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{value[1]}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
           
<script>
export default{
      props:["value"],
       data(){
          return{
             activePath:'welcome'
          }
       } ,
      methods: {
         toHome(){
            window.sessionStorage.setItem('activePath', '/bookInfo')
            
         }
      },
      mounted() {
         // eventHub
      },
}
</script>
<style scoped>
            
</style>