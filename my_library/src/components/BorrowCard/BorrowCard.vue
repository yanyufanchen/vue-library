<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="box-card">
      <!-- //借书证 -->
      <el-row class="checking">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <span class="com_title">read name：</span>
            <el-input
              class="codeName"
              ref="com_name"
              placeholder="Please enter read name"
              v-model="input1"
              size="small"
              clearable
              @clear="clear"
            ></el-input>
            <span class="com_title">card No：</span>
            <el-input
              class="codeName"
              ref="com_name"
              placeholder="Please enter card No"
              v-model="value1"
              size="small"
              clearable
              @clear="clear"
            ></el-input>
            <el-button type="info" size="small" @click="searchClick">Query</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-button
              type="info"
              size="small"
              @click="dialogFormVisible = true"
              class="add"
            >Add administrator</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="Order"></el-table-column>
        <el-table-column prop="name" label="Borrower"></el-table-column>
        <el-table-column prop="barcode" label="Borrower No"></el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Add a library card" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <el-form-item label="card name" prop="name" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="card number" prop="barcode" :label-width="formLabelWidth">
            <el-input v-model="addForm.barcode" autocomplete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">cancel</el-button>
          <el-button size="small" type="info" @click="submitForm('addForm')">confirm</el-button>
        </div>
      </el-dialog>
      <el-dialog title="edit a library card" :visible.sync="editFormVisible">
        <el-form :model="editRegion" :rules="rules" ref="editRegion">
          <el-form-item label="card name" prop="name" :label-width="formLabelWidth">
            <el-input v-model="editRegion.name" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="card number" prop="barcode" :label-width="formLabelWidth">
            <el-input v-model="editRegion.barcode" autocomplete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click.native="editFormVisible = false">cancel</el-button>
          <el-button size="small" type="info" @click="editSubmitRegion('editRegion')">confirm</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
  import { alllibraryCard_api, getlibraryCard_api,addlibraryCard_api,editlibraryCard_api,deletelibraryCard_api } from '@/api'
export default {
  data() {
    return {
      common: ['Borrow card management'], //公共组件传值
      input1:'',
      value1:'',
      tableData: [],
      dialogFormVisible:false,
      editFormVisible: false,
      addForm: {
      	barcode: '',
      	name: ''
      },
      editRegion: {
      	barcode: '',
      	name: ''
      },
      formLabelWidth: '140px',
      rules: {
      	barcode: [{ required: true, message: 'Please input card number', trigger: 'blur' },
            { type: 'string',
              pattern: /^[0-9]{1,22}$/, // 正则表达式验证
              message: 'Please enter a number number！',
              trigger: 'blur'
            }],
      	name: [{ required: true, message: 'Please input author', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getBorrowCardAll()
  },
  methods: {
    // 清除clearInput
    clear(){
      this.show = true;
        this.getBorrowCardAll()
    },
    async getBorrowCardAll() {

      const { data: res } = await alllibraryCard_api()
      if (res.status !== 200) return this.$message.error(res.msg)
      this.tableData = res.data
    },
    //query 查询
    searchClick(){
       const nameCom = this.input1 // 姓名
       const cardCom = this.value1 // 编号

       if(nameCom == '' && cardCom == ''){
         this.show = true;
         this.getBorrowCardAll()
       }else{
         var  params = {
           "name": nameCom,
           "barcode": cardCom
         }
         getBorrowCard_api(params).then(res => {
           if (res.data.status !== 200) {
             return this.$message.error(res.data.msg)
           } else {
             // res.data.data.createdAt = moment(res.data.data.createdAt).format('YYYY-MM-DD')
             var arr = []
             arr.push(res.data.data)
             this.tableData = arr
           }
         })
       }
    },
    // edit
    handleEdit(index, row) {
        this.editFormVisible = true
        this.editRegion = Object.assign({id:row.id}, row) // 这句是关键！！！
    },
    editSubmitRegion (formName) {
    	var that = this
    	this.$refs[formName].validate((valid) => {
    		if (valid) {
    		var params ={
          "id":that.editRegion.id,
    		  "name": that.editRegion.name,
    		  "barcode":that.editRegion.barcode,
    		}
    			this.$confirm('Whether to commit',{
    				confirmButtonText:'confirm',
    				cancelButtonText:'cancel',
    				type:'warning',
    				center:true
    			})
    			.then(function(){
    				//ajax
    				editlibraryCard_api(params).then(res =>{
    					if(res.status === 200){
    						that.editFormVisible = false
    						that.getBorrowCardAll() //重新渲染数据
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
    //add 添加
    submitForm(formName){
        var that = this
    	this.$refs[formName].validate((valid) =>{
    		if(valid){
    			var params ={
            "name": that.addForm.name,
            "barcode":that.addForm.barcode,
          }
    			this.$confirm('Whether to commit',{
    				confirmButtonText:'confirm',
    				cancelButtonText:'cancel',
    				type:'warning',
    				center:true
    			})
    			.then(function(){
    				//ajax
    				addlibraryCard_api(params).then(res =>{
    					if(res.status === 200){ //此处的表单验证
    						that.dialogFormVisible = false
    						that.getBorrowCardAll() //重新渲染数据
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
              bCardId:row.id
            }
        deletelibraryCard_api({data:params}).then(res => {
        	if(res.status == 200){
        		_self.$message({
        		  message: 'successfully delete',
        		  type: 'success'
        	  });
        _self.getBorrowCardAll() //重新渲染数据
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
</style>
