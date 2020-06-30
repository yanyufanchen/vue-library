<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="box-card">
      <el-row class="checking">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <span class="com_title">Title of book：</span>
            <el-input
              class="codeName"
              ref="com_name"
              placeholder="Please enter the title"
              v-model="input1"
              size="small"
              clearable
              @clear="clear"
            ></el-input>
            <span class="com_title">Book bar code：</span>
            <el-input
              class="codeName"
              ref="com_code"
              placeholder="Please enter barcode"
              v-model="value1"
              size="small"
              clearable
              @clear="clear"
            ></el-input>
            <el-button type="info" size="small" @click="searchClick">Query</el-button>
            <!-- //查询 -->
            <el-button plain size="small" @click="reset">Reset</el-button>
            <!-- // 重置 -->
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <el-button
              type="info"
              size="small"
              @click="dialogFormVisible = true"
              class="add"
            >Add new book</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="Title of book">
          <template slot-scope="scope">
            <a href="javascript:;" class="author" @click="openBook(scope.row.id)">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="isbn" label="Book bar code"></el-table-column>
        <el-table-column label="Book author">
          <template slot-scope="scope">
            <a href="javascript:;" class="author" @click="open(scope.row.authorId)">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="date"></el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <!-- 编辑 -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
            <!-- 删除 -->
          </template>
        </el-table-column>
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
      <el-dialog title="add book" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <el-form-item label="book title" prop="title" :label-width="formLabelWidth">
            <el-input v-model="addForm.title" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="number" prop="isbn" :label-width="formLabelWidth">
            <el-input v-model="addForm.isbn" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="author" prop="name" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">cancel</el-button>
          <el-button size="small" type="info" @click="submitForm('addForm')">confirm</el-button>
        </div>
      </el-dialog>
      <el-dialog title="edit" :visible.sync="editFormVisible">
        <el-form :model="editRegion" :rules="rules" ref="editRegion">
          <el-form-item label="book title" prop="title" :label-width="formLabelWidth">
            <el-input v-model="editRegion.title" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="number" prop="isbn" :label-width="formLabelWidth">
            <el-input v-model="editRegion.isbn" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="author" prop="name" :label-width="formLabelWidth">
            <el-input v-model="editRegion.name" autocomplete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click.native="editFormVisible = false">edit</el-button>
          <el-button size="small" type="info" @click="editSubmitRegion('editRegion')">confirm</el-button>
        </div>
      </el-dialog>
      <!-- //根据作者获取作品 -->
      <el-dialog title="information" :visible.sync="dialoginfo">
        <el-table :data="gridData">
          <el-table-column property="id" label="id"></el-table-column>
          <el-table-column property="title" label="book title"></el-table-column>
          <el-table-column property="isbn" label="number"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialoginfo = false">cancel</el-button>
        </div>
      </el-dialog>
      <!-- //根据书名获取信息 -->
      <el-dialog title="detailed information" :visible.sync="dialogBookinfo">
        <el-table :data="bookData">
          <el-table-column property="title" label="Title"></el-table-column>
          <el-table-column property="isbn" label="ISBN"></el-table-column>
          <el-table-column property="name" label="Author"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBookinfo = false">cancel</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { books_api, getBooks_api,upBooks_api,addBooks_api,deleteBooks_api,getAuthorinfo,getBookinfo } from '@/api'
import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      common: ['Book Info'], // 公共组件传值
      input1: '',
      value1: '',
      allCount:null,
      currentPage:1,
      pageSize:10,
      tableData: [],
      gridData:[],
      bookData: [],
      dialogFormVisible:false,
	  editFormVisible: false,
    dialoginfo:false,
    dialogBookinfo: false,
    show:true,
	  addForm: {
	  	title: '',
	  	isbn: '',
	  	name: ''
	  },
	  editRegion: {
	  	title: '',
	  	isbn: '',
	  	name: ''
	  },
	  formLabelWidth: '140px',
	  rules: {
        title: [{ required: true, message: 'please input title', trigger: 'blur' }],
	  	isbn: [{ required: true, message: 'please input number', trigger: 'blur' },
          { type: 'string',
            pattern: /^[0-9]{1,22}$/, // 正则表达式验证
            message: 'Please enter a number number！',
            trigger: 'blur'
          }],
	  	name: [{ required: true, message: 'please input author', trigger: 'blur' }]
	  }
    }
  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD')
    }
  },
  created() {
    this.getBookAll()
  },
  methods: {
    // 清除clearInput
    clear(){
      this.show = true;
        this.getBookAll()
    },
    //获取图书信息
    openBook(id) {
      var params = {
        id:id
      }
      getBookinfo(params).then(res=>{
        if(res.status == 200){
          this.dialogBookinfo=true;
          this.bookData = res.data.data
        }
      }).catch(err=>{console.log(err)})
    },
    //获取作者信息
    open(id) {
      var params = {
        id:id
      }
      getAuthorinfo(params).then(res=>{
        if(res.status == 200){
          this.dialoginfo=true;
          this.gridData = res.data.data
        }
      }).catch(err=>{console.log(err)})
    },

    async getBookAll() {
      // 刷新home页面就请求图书信息
      let params = {
        "pagesize":this.pageSize,
        "pageNO":this.currentPage
      }
      const { data: res } = await books_api(params)
      if (res.status !== 200) return this.$message.error(res.msg)
      for (var i in res.data) {
        res.data[i].createdAt = moment(res.data[i].createdAt).format('YYYY-MM-DD')
      }
			// console.log(res)
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
      const { data: res } = await books_api(params)
      if (res.status !== 200) return this.$message.error(res.msg)
      for (var i in res.data) {
        res.data[i].createdAt = moment(res.data[i].createdAt).format('YYYY-MM-DD')
      }
      // console.log(res)
      this.tableData = res.data
      this.allCount = res.total
    },
	  reset() { // 重置功能
	  	this.input1 = '',
	  	this.value1 = ''
	  },
    //add
    submitForm(formName){
        var that = this
    	this.$refs[formName].validate((valid) =>{
    		if(valid){
    			var params ={
            "bookTitle": that.addForm.title,
            "bookIsbn":that.addForm.isbn,
            "authorName":that.addForm.name
          }
    			this.$confirm('Whether to commit',{
    				confirmButtonText:'confirm',
    				cancelButtonText:'cancel',
    				type:'warning',
    				center:true
    			})
    			.then(function(){
    				//ajax
    				addBooks_api(params).then(res =>{
    					if(res.data.status === 200){ //此处的表单验证
    						that.dialogFormVisible = false
    						that.getBookAll() //重新渲染数据
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
	  // edit
	  handleEdit(index, row) {
	      this.editFormVisible = true
	      this.editRegion = Object.assign({}, row) // 这句是关键！！！
	  },
	  editSubmitRegion (formName) {
	  	var that = this
	  	this.$refs[formName].validate((valid) => {
	  		if (valid) {
	  		var params ={
          "bookId":that.editRegion.id,
          "authorName":that.editRegion.name,
          "bookTitle":that.editRegion.title,
          "bookIsbn":that.editRegion.isbn
        }
        // console.log(params)
	  			this.$confirm('Whether to commit',{
	  				confirmButtonText:'confirm',
	  				cancelButtonText:'cancel',
	  				type:'warning',
	  				center:true
	  			})
	  			.then(function(){
	  				//ajax
	  				upBooks_api(params).then(res =>{
              console.log(res.data.status)
	  					if(res.data.status === 200){
	  						that.editFormVisible = false
	  						that.getBookAll() //重新渲染数据
	  					}else if(res.result.status == 2){
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
	  // query
	  searchClick() { // 查询功能
	  	// 获取当前页面的信息，发送给后台 刷新页面

	  	const nameCom = this.input1 // 书名
	  	const cardCom = this.value1 // 书名编号

      if(nameCom == '' && cardCom == ''){
        this.show = true;
        this.getBookAll()
      }else{
        var  params = {
          "bookTitle": nameCom,
          "bookIsbn": parseInt(cardCom)
        }
        getBooks_api(params).then(res => {
          if (res.data.status !== 200) {
            return this.$message.error(res.data.msg)
          } else {
            // res.data.data.createdAt = moment(res.data.data.createdAt).format('YYYY-MM-DD')
            var arr = []
            arr.push(res.data.data)
            this.tableData = arr
            this.show = false;
          }
        })
      }
	  },
	  // delete
	  handleDelete (index, row) {
	      var _self = this
	      this.$confirm('Are you sure to delete?', 'hint', {
	          confirmButtonText: 'delete',
            cancelButtonText: 'waiting',
            type: 'warning',
            center: true
              }).then(function() {
            let params = {
              bookId:row.id
            }
        deleteBooks_api({data:params}).then(res => {
          console.log(res)
        	if(res.status == 200){
        		_self.$message({
        		  message: 'successfully delete',
        		  type: 'success'
        	  });
        _self.getBookAll() //重新渲染数据
        	}
        }).catch(err =>{console.log(err)})
				  }).catch(function(e) {
					  if (e != 'cancel') { console.log('error' + e) }
				  })
		  }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.checking{
  margin: 20px 0;
  .codeName{
    width: 12.5rem;margin-right: 10px;
  }
  .add{float: right;}
}
.page_size{display: inline-block;float: right;}
.author{text-decoration:none;}
</style>
