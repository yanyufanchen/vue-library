<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="box-card">
      <!-- 逾期罚款管理 -->
      <el-row class="checking">
        <!-- <el-col :span="18">
          <div class="grid-content bg-purple">
            <span class="com_title">Borrower：</span>
            <el-input
              class="codeName"
              ref="com_name"
              size="small"
              placeholder="Please enter a borrower name"
              v-model="input1"
              clearable
            ></el-input>
            <span class="com_title">Titles of books：</span>
            <el-input
              class="codeName"
              size="small"
              ref="com_name"
              placeholder="Please enter a title"
              v-model="value1"
              clearable
            ></el-input>
            <el-button type="info" size="small" @click="searchClick">Query</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          
        </el-col>-->
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="delay_penalty" label="delay penalty(￥)"></el-table-column>
        <el-table-column prop="condition" label="condition"></el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">Extend</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="edit delay penalty" :visible.sync="editFormVisible">
        <el-form :model="editRegion" :rules="rules" ref="editRegion">
          <el-form-item label="delay penalty" prop="delay_penalty" :label-width="formLabelWidth">
            <el-input v-model="editRegion.delay_penalty" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="condition" prop="condition" :label-width="formLabelWidth">
            <el-input v-model="editRegion.condition" :disabled="true" autocomplete="off" clearable></el-input>
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
  import {getAuthorAll, getAllBook,loanBook_api,getLoan_api,addLoan_api,updataLoan_api,deleteLoan_api,getPenalty_api,getPenaltyAll_api,updataPenalty_api} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now()//如果没有后面的-8.64e7就是不可以选择今天的
       }
      },
      common: ['delay penalty'], // 公共组件传值
      allCount:null,
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
        delay_penalty: '',
        condition: '',
        id:'',
      },
      formLabelWidth: '140px',
      rules: {}
    }
  },
  created() {
    this.getDelayPenaltyAll()
  },
  methods: {
    //获取所以罚款信息
    async getDelayPenaltyAll() {
      const { data: penalty_res } = await getPenaltyAll_api()
      if (penalty_res.status !== 200) return this.$message.error(res.msg)
      this.tableData = penalty_res.data
      this.allCount = penalty_res.total
    },
	  handleEdit(index, row) {
	      this.editFormVisible = true;
	      this.editRegion = Object.assign({
          delay_penalty: row.delay_penalty,
          condition: row.condition,
          PenaltyId:row.id
          }); //这句是关键！！！
	  },
	  editSubmitRegion (formName) {
	  	var that = this
	  	this.$refs[formName].validate((valid) =>{
	  		if(valid){
          // var timestamp2 = Date.parse(new Date(that.editRegion.dueDate))
          var params = {
            penaltyNum: that.editRegion.delay_penalty,
            penalty_id:that.editRegion.PenaltyId
          }
	  			this.$confirm('Whether to commit',{
	  				confirmButtonText:'confirm',
	  				cancelButtonText:'cancel',
	  				type:'warning',
	  				center:true
	  			})
	  			.then(function(){
	  				//ajax
	  				updataPenalty_api(params).then(res =>{
	  					if(res.data.status == 200){
	  						that.editFormVisible = false
	  						that.getDelayPenaltyAll() //重新渲染数据
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
