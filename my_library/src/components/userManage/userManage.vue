<template>
	<div>
		<!-- 导航 -->
		<Breadcrumb :value="common"></Breadcrumb>
		<el-card class="box-card">
			<el-row class="checking">
				<el-col :span="20">
					<div class="grid-content bg-purple">
						<span class="com_title">Administrator name：</span>
						<el-input
							class="codeName"
							ref="com_name"
							placeholder="Please enter administrator name"
							v-model="input1"
							size="small"
							clearable
							@clear="clear"
						></el-input>
						<el-button type="info" size="small" @click="searchClick">Query</el-button>
					</div>
				</el-col>
				<el-col :span="4">
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
				<el-table-column prop="username" label="Administrator name"></el-table-column>
				<el-table-column prop="password" label="Administrator password"></el-table-column>
				<el-table-column prop="isSuper" label="Administrator"></el-table-column>
				<el-table-column label="Operation">
					<template slot-scope="scope">
						<el-button
							v-if="scope.row.isSuper !='Super Admin' "
							size="mini"
							@click="handleEdit(scope.$index, scope.row)"
						>Edit</el-button>
						<el-button
							v-if="scope.row.isSuper !='Super Admin'"
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)"
						>Delete</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog title="add Admin" :visible.sync="dialogFormVisible">
				
				<!-- <el-form :model="addForm" :rules="rulesRegion" ref="addForm"> -->
				<el-form :model="addForm" :rules="rulesRegion" ref="addForm">
					<el-form-item  label="username" prop="username" :label-width="formLabelWidth">
						<el-input v-model="addForm.username" autocomplete="off" clearable></el-input>
					</el-form-item>
					<el-form-item label="password" prop="password" :label-width="formLabelWidth">
						<el-input v-model="addForm.password" autocomplete="off" clearable></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogFormVisible = false">cancel</el-button>
					<el-button size="small" type="info" @click="submitForm('addForm')">confirm</el-button>
				</div>
			</el-dialog>
			<el-dialog title="edit" :visible.sync="editFormVisible">
				<el-form :model="editRegion"  ref="editRegion">
					<el-form-item :rules="rulesRegion1" label="password111" prop="validator" :label-width="formLabelWidth">
						<el-input v-model="editRegion.password" autocomplete="off" clearable></el-input>
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
  import { allLogin_api, getLogin_api,addLogin_api,editLogin_api,deleteLogin_api } from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      common: ['System setup'], //公共组件传值
      input1:'',
      value1:'',
      tableData: [],
      dialogFormVisible:false,
      editFormVisible:false,
      addForm:{
			username:'',
			password:'',
		},
		editRegion: {
			password:''
		},
		formLabelWidth:'140px',
		rulesRegion:{
			username:[{required:true,message:'Please input username',trigger:'blur'}],
			password:[{required:true,message:'Please input password',trigger:'blur'}]
		},
		rulesRegion1: {
			validator: (rule,value,callback)=>{
				console.log(value,this.editRegion.password,111);
				if(this.editRegion.password.length<=10){
					return callback('请输入正确密码')
				}
			}
		}
    }
  },
  created() {
    this.getLoginAll()
  },
  methods: {
	    // 清除clearInput
    clear(){
      this.show = true;
        this.getLoginAll()
    },
	  async getLoginAll() {
	    const { data: res } = await allLogin_api()
	    if (res.status !== 200) return this.$message.error(res.msg)
      for(var i in res.data){
        if(res.data[i].isSuper == 1){
          res.data[i].isSuper = 'Super Admin'
        }else{
          res.data[i].isSuper = 'Admin'
        }
      }
	    this.tableData = res.data
	  },
	  //add
	  submitForm(formName){
	      var that = this
	  	this.$refs[formName].validate((valid) =>{
	  		if(valid){

	  			var params ={
            "username":that.addForm.username,
            "password":that.addForm.password
          }
	  			this.$confirm('Whether to commit',{
	  				confirmButtonText:'confirm',
	  				cancelButtonText:'cancel',
	  				type:'warning',
	  				center:true
	  			})
	  			.then(function(){
	  				//ajax
	  				addLogin_api(params).then(res =>{
	  					if(res.status == 200){ //此处的表单验证
	  						that.dialogFormVisible = false
	  						that.getLoginAll() //重新渲染数据
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
	  //edit
	  handleEdit(index, row) {
	      this.editFormVisible = true;
	      this.editRegion = Object.assign({id:row.id,password:row.password}); //这句是关键！！！
	  },
	  editSubmitRegion (formName) {
	  	var that = this
	  	this.$refs[formName].validate((valid) =>{
	  		if(valid){
	  		var params = that.editRegion
	  			this.$confirm('Whether to commit',{
	  				confirmButtonText:'confirm',
	  				cancelButtonText:'cancel',
	  				type:'warning',
	  				center:true
	  			})
	  			.then(function(){
	  				//ajax
	  				editLogin_api(params).then(res =>{
	  					if(res.status == 200){
	  						that.editFormVisible = false
	  						that.getLoginAll() //重新渲染数据
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
	  //query
	  searchClick(){ // 查询功能
	  	//获取当前页面的信息，发送给后台 刷新页面
	  	const nameCom = this.input1; //管理员名称
      if(nameCom == ''){
        this.getLoginAll()
      }else{
        var  params = {
          "username": nameCom,
        }
        getLogin_api(params).then(res => {
          if (res.data.status !== 200) {
            return this.$message.error(res.data.msg)
          } else {
            if(res.data.data.isSuper == 1){
              res.data.data.isSuper = 'Super Admin'
            }else{
              res.data.data.isSuper = 'Admin'
            }
            var arr = []
            arr.push(res.data.data)
            this.tableData = arr
          }
        })
      }

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
	  						LoginId:row.id
	  					}
	  					deleteLogin_api({data:params}).then(res => {
	  						if(res.status == 200){
	  							_self.$message({
	  							  message: 'successfully delete',
	  							  type: 'success'
	  						  });
	  					_self.getLoginAll() //重新渲染数据
	  						}
	  					}).catch(err =>{console.log(err)})
	  				  }).catch(function(e){
	  					  if(e != "cancel")
	  						  console.log("error:" + e);
	  				  });
	  		  },
  },
  mounted() {}
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
