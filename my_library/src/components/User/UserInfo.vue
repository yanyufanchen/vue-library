<template>
	<div>
		<!-- 导航 -->
		<Breadcrumb :value="common"></Breadcrumb>
		<el-card class="box-card">
			<el-row class="checking">
				<el-col :span="19">
					<div class="grid-content bg-purple">
						<span class="com_title">Reader name：</span>
						<el-input
							class="codeName"
							ref="com_name"
							placeholder="Please enter name"
							v-model="input1"
							size="small"
							clearable
							@clear="clear"
						></el-input>
						<span class="com_title">Reader barcode：</span>
						<el-input
							class="codeName"
							ref="com_name"
							placeholder="Please enter barcode"
							v-model="value1"
							size="small"
							@clear="clear"
							clearable
						></el-input>
						<el-button type="info" size="small" @click="searchClick">Query</el-button>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple-light">
						<el-button
							type="info"
							size="small"
							@click="dialogFormVisible = true"
							class="add"
						>New reader information</el-button>
					</div>
				</el-col>
			</el-row>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="Reader name"></el-table-column>
				<el-table-column prop="barcode" label="Reader barcode"></el-table-column>
				<el-table-column prop="memberType" label="Occupation"></el-table-column>
				<el-table-column label="Operation">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
			<el-dialog title="add Reader" :visible.sync="dialogFormVisible">
				<el-form :model="addForm" :rules="rules" ref="addForm">
					<el-form-item label="reader name" prop="name" :label-width="formLabelWidth">
						<el-input v-model="addForm.name" autocomplete="off" clearable></el-input>
					</el-form-item>
					<el-form-item label="occupation" prop="memberType" :label-width="formLabelWidth">
						<el-input v-model="addForm.memberType" autocomplete="off" clearable></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogFormVisible = false">cancel</el-button>
					<el-button size="small" type="info" @click="submitForm('addForm')">confirm</el-button>
				</div>
			</el-dialog>
			<el-dialog title="edit" :visible.sync="editFormVisible">
				<el-form :model="editRegion" :rules="rules" ref="editRegion">
					<el-form-item label="reader name" prop="name" :label-width="formLabelWidth">
						<el-input v-model="editRegion.name" autocomplete="off" clearable></el-input>
					</el-form-item>
					<el-form-item label="occupation" prop="memberType" :label-width="formLabelWidth">
						<el-input v-model="editRegion.memberType" autocomplete="off" clearable></el-input>
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
  import {allUser_api,getUser_api,addUser_api,editUser_api,deleteUser_api} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      common: ['Reader information management'], //公共组件传值
      input1:'',
      value1:'',
      allCount:null,
        currentPage:1,
        pageSize:10,
        tableData: [],
        dialogFormVisible:false,
      editFormVisible: false,
      show:true,
			addForm:{
				name:'',
				memberType:'',
			},
			editRegion: {
				name:'',
				memberType:''
			},
			formLabelWidth:'140px',
			rules:{
				name:[{required:true,message:'Please input the title',trigger:'blur'}],
				barcode:[{required:true,message:'Please input number',trigger:'blur'},
							{type: 'string',
							pattern:  /^[0-9]{1,22}$/,//正则表达式验证
							message: 'Please enter a number number！',
							trigger: 'blur'
						}],
				memberType:[{required:true,message:'Please input author',trigger:'blur'}]
			},
    }
  },
  created() {
    this.getUserAll()
  },
  methods: {
	  // 清除clearInput
    clear(){
      this.show = true;
        this.getUserAll()
    },
    async getUserAll() {
      let params = {
        "pagesize":this.pageSize,
        "pageNO":this.currentPage
      }
      const { data: res } = await allUser_api(params)
      if (res.status !== 200) return this.$message.error(res.msg)
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
      const { data: res } = await allUser_api(params)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.tableData = res.data
      this.allCount = res.total
    },
		//add
		submitForm(formName){
		    var that = this
			this.$refs[formName].validate((valid) =>{
				if(valid){
					var params ={
            "userName": that.addForm.name,
            "memberType": that.addForm.memberType
          }

					this.$confirm('Whether to commit',{
						confirmButtonText:'confirm',
						cancelButtonText:'cancel',
						type:'warning',
						center:true
					})
					.then(function(){
						//ajax
						addUser_api(params).then(res =>{
							if(res.data.status == 200){ //此处的表单验证
								that.dialogFormVisible = false
								that.getUserAll() //重新渲染数据
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
		//edit
		handleEdit(index, row) {
		    this.editFormVisible = true;
		    this.editRegion = Object.assign({name: row.name,barcode:row.barcode,memberType: row.memberType,userId: row.id}); //这句是关键！！！
		},
		editSubmitRegion (formName) {
			var that = this
			this.$refs[formName].validate((valid) =>{
				if(valid){
          var params ={
            userName: that.editRegion.name,
            memberType: that.editRegion.memberType,
            userId: that.editRegion.userId
          }
					this.$confirm('Whether to commit',{
						confirmButtonText:'confirm',
						cancelButtonText:'cancel',
						type:'warning',
						center:true
					})
					.then(function(){
						//ajax
						editUser_api(params).then(res =>{
							if(res.data.status == 200){
								that.editFormVisible = false
								that.getUserAll() //重新渲染数据
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
		//query
		searchClick(){ // 查询功能
			const nameCom = this.input1; //读者名字
			const cardCom = this.value1; // 读者编号
      if(nameCom == '' && cardCom == ''){
        this.show = true;
        this.getUserAll()
      }else{
        var  params = {
          "userName": nameCom,
          "userBarcode": parseInt(cardCom)
        }
        getUser_api(params).then(res => {
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
								userId:row.id
							}
							deleteUser_api({data:params}).then(res => {
								if(res.status == 200){
									_self.$message({
									  message: 'successfully delete',
									  type: 'success'
								  });
							_self.getUserAll() //重新渲染数据
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
