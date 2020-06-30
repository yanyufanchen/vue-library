<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="box-card">
      <!-- 借阅逾期管理 -->
      <el-row class="checking">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <span class="com_title">Borrower：</span>
            <el-input
              class="codeName"
              ref="com_name"
              size="small"
              placeholder="Please enter the borrower's name"
              v-model="input1"
              clearable
              @clear="clear"
            ></el-input>
            <span class="com_title">Titles of books：</span>
            <el-input
              class="codeName"
              size="small"
              ref="com_name"
              placeholder="Please enter title"
              v-model="value1"
              clearable
              @clear="clear"
            ></el-input>
            <el-button type="info" size="small" @click="searchClick">Query</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Borrower"></el-table-column>
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="dueDate" label="Return date"></el-table-column>
        <el-table-column prop="overdueTime" label="overdue time"></el-table-column>
        <el-table-column prop="delay_penalty" label="delay penalty"></el-table-column>
      </el-table>
      <el-pagination
        v-if="show"
        class="page_size"
        background=""
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="allCount"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
  import {getAuthorAll, getAllBook,loanBook_api,getLoan_api,addLoan_api,updataLoan_api,deleteLoan_api,getPenalty_api} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now()//如果没有后面的-8.64e7就是不可以选择今天的
       }
      },
      common: ['overdueInfo'], // 公共组件传值
      input1: '',
      value1: '',
      allCount:null,
      currentPage:1,
      pageSize:10,
      tableData: [],
      comName:[],
      comTitle:[],
      dialogFormVisible: false,
      editFormVisible: false,
      show:true,
      addForm: {
        name: '',
        title: '',
        dueDate: '',
        BookId:'',
        UserId:'',
        id:'',
      },
      editRegion: {
        name: '',
        title: '',
        dueDate: '',
        BookId:'',
        UserId:'',
        id:'',
      },
      formLabelWidth: '140px',
      rules: {
        name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
        title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
        dueDate: [{ required: true, message: 'Please input date', trigger: 'blur' }]
		  }
    }
  },
  created() {
    this.getLoanBookAll()
    // this.getAuthorAll()
    // this.getAllBook()
  },
  methods: {
    // 清除clearInput
    clear(){
      this.show = true;
        this.getLoanBookAll()
    },
    //获取借阅及逾期信息
    async getLoanBookAll() {
      const { data: penalty_res } = await getPenalty_api({PenaltyId: 1})
      let penaltyNum=penalty_res.data.delay_penalty
      if (penalty_res.status!== 200){
        penaltyNum=0
      }
      let params = {
        "pagesize":this.pageSize,
        "pageNO":this.currentPage
      }
      const { data: res } = await loanBook_api(params)
      if (res.status !== 200) return this.$message.error(res.msg)
      for (var i in res.data) {
        res.data[i].overdueTime=Math.ceil((res.data[i].dueDate-(+new Date()))/1000/60/60/24)
        
        if(res.data[i].overdueTime<=0){
          res.data[i].delay_penalty='￥ '+res.data[i].overdueTime*penaltyNum
          res.data[i].overdueTime='overdue '+Math.abs(res.data[i].overdueTime)+' day'
        }else {
          res.data[i].delay_penalty='￥ '+0
          res.data[i].overdueTime='only '+res.data[i].overdueTime+' day'
        }
        res.data[i].dueDate = moment(res.data[i].dueDate).format('YYYY-MM-DD')
      }
      this.tableData = res.data
      this.allCount = res.total
    },
    //分页
    async handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      let params = {
        "pagesize":this.pageSize,
        "pageNO":this.currentPage
      }
      const { data: res } = await loanBook_api(params)
      if (res.status !== 200) return this.$message.error(res.msg)
      for (var i in res.data) {
        res.data[i].dueDate = moment(res.data[i].dueDate).format('YYYY-MM-DD')
      }
      this.tableData = res.data
      this.allCount = res.total
    },
	  //query
	  searchClick(){ // 查询功能
	  	const nameCom = this.input1; //读者名
	  	const bookCom = this.value1; // 书名
      if(nameCom == '' && bookCom == ''){
        this.show = true;
        this.getLoanBookAll()
      }else{

        var params = {
          "bookTitle": bookCom,
          "userName": nameCom
        }
        getLoan_api(params).then(res => {
          if (res.data.status !== 200) {
            return this.$message.error(res.data.data.msg)
          } else {
            for (var i in res.data.data) {
              res.data.data[i].dueDate = moment(res.data.data[i].dueDate).format('YYYY-MM-DD')
            }
            this.tableData = res.data.data
            this.allCount = res.data.data.length
          }
        })
      }
	  },
	  //add
	  submitForm(formName){
	      var that = this
	  	this.$refs[formName].validate((valid) =>{
	  		if(valid){
          var timestamp2 = Date.parse(new Date(that.addForm.dueDate))
	  			var params ={
            "bookTitle":that.addForm.title,
            "userName":that.addForm.name,
            "dueDate":timestamp2
          }
	  			this.$confirm('Whether to commit',{
	  				confirmButtonText:'confirm',
	  				cancelButtonText:'cancel',
	  				type:'warning',
	  				center:true
	  			})
	  			.then(function(){
	  				//ajax
	  				addLoan_api(params).then(res =>{
	  					if(res.status == 200){ //此处的表单验证
	  						that.dialogFormVisible = false
	  						that.getLoanBookAll() //重新渲染数据
	  					}else{
	  					that.$confirm(res.result.msg, 'hint', {
	                    type: 'warning'
	               	})
              }
	  				}).catch(err =>{console.log(err)})
	  			})
	  			.catch(function(err){
	  				console.log('Cancel')
	  			})
	  		} else {
	  			return false
	  		}
	  	})
	  },
	  handleEdit(index, row) {
	      this.editFormVisible = true;
	      this.editRegion = Object.assign({
          dueDate: row.dueDate,
          LoanId:row.id
          }); //这句是关键！！！
	  },
	  editSubmitRegion (formName) {
	  	var that = this
	  	this.$refs[formName].validate((valid) =>{
	  		if(valid){
          var timestamp2 = Date.parse(new Date(that.editRegion.dueDate))
          var params = {
            duetime: timestamp2,
            LoanId:that.editRegion.LoanId
          }
	  			this.$confirm('Whether to commit',{
	  				confirmButtonText:'confirm',
	  				cancelButtonText:'cancel',
	  				type:'warning',
	  				center:true
	  			})
	  			.then(function(){
	  				//ajax
	  				updataLoan_api(params).then(res =>{
	  					if(res.data.status == 200){
	  						that.editFormVisible = false
	  						that.getLoanBookAll() //重新渲染数据
	  					}else{
	  						that.$confirm(res.data.msg, 'hint', {
	                    type: 'warning'
	               	})
	  					}
	  				}).catch(err =>{console.log(err)})
	  			})
	  			.catch(function(err){
	  				console.log('Cancel')
	  			})
	  		} else {
	  			return false
	  		}
	  	})
	  },
	  //delete
	  handleDelete (index,row) {
	      var _self = this;
	      this.$confirm('Are you sure to delete?', 'hint', {
        confirmButtonText:'delete',
        cancelButtonText:'waiting',
        type:'warning',
        center:true
          }).then(function(){
          let params = {
            loanId:row.id
          }
          deleteLoan_api({data:params}).then(res => {
            if(res.status == 200){
              _self.$message({
                message: 'successfully delete',
                type: 'success'
              });
          _self.getLoanBookAll() //重新渲染数据
            }
          }).catch(err =>{console.log(err)})
          }).catch(function(e){
            if(e != "cancel")
              console.log("error：" + e);
          });
      },
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.checking{
  margin: 20px 0;
  .codeName{
    width: 12.5rem;margin-right: 10px;
  }
  .add{float: right;}
}
.page_size{display: inline-block;float: right;}
</style>
