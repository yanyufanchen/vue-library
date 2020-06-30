<template>
	<div class="component_login">
		<div class="login_box">
			<div class="left_img">
				<img src="../assets/login.png" alt="" style="width:100%;height:100%">
			</div>
			<!-- 头像 -->
			<!-- <div class="avatar_box">
        <img src="../assets/logo.png" alt />
			</div>-->
			<!-- 输入框 -->
			<!-- 登录 -->
			<div class="right_form">
				<el-form
					class="login_form"
					ref="loginFormRef"
					:model="loginForm"
					:rules="loginFormRules"
					label-width="0px"
				>
					<div class="title">
						<i class="el-icon-s-platform"></i>登录系统
					</div>
					<!-- 账号 -->
					<el-form-item prop="username" class="username_input">
						<el-input
							v-model="loginForm.username"
							placeholder="Please enter your account number"
							prefix-icon="iconfont icon-user"
						></el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item prop="password" class="username_input">
						<el-input
							v-model="loginForm.password"
							placeholder="Please input a password"
							prefix-icon="iconfont icon-3702mima"
							type="password"
						></el-input>
					</el-form-item>
					<!-- 按钮区域 -->
					<el-form-item class="btns">
						<el-button class="loginIn" type="info" @click="login">Sign in</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
    import {login_api} from "@/api"
    export default {
    	data() {
    		return {
    			loginForm: {
    				username: 'admin',
    				password: '000000'
    			},
    			// 表单验证规则
    			loginFormRules: {
    				// 验证用户名
    				username: [{ required: true, message: 'Please enter your account number', trigger: 'blur' }, { min: 3, max: 20, message: '3 to 20 characters in length', trigger: 'blur' }],
    				// 验证密码
    				password: [{ required: true, message: 'Please input a password', trigger: 'blur' }, { min: 3, max: 6, message: '3 to 6 characters in length', trigger: 'blur' }]
    			}
    		}
    	},
    	methods: {
    		reset() {
    			this.$refs.loginFormRef.resetFields()
    		},
    		login() {
    			this.$refs.loginFormRef.validate(async valid => {
    				if (!valid) return this.$message.error('Incorrect input')
                    const { data: res}=await login_api(this.loginForm)
    				if (res.status !== 200) return this.$message.error('Login failed')
    				this.$message.success('Login successfully')
    				// 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
    				//   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
    				//   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
    				window.sessionStorage.setItem('token', res.data.token)
    				// 跳转到index页面
    				this.$router.push('/index')
    			})
    		}
    	}
    };
    </script>
    <style lang="less" scoped>
    .component_login {
    	width: 100%;
    	height: 100%;
		background: url(../assets/background.jpg) no-repeat;
		background-size: cover;
		position: absolute;
		overflow: hidden;
    	.login_box {
    		width: 650px;
    		height: 350px;
    		background-color: #FFFFF0;
    		position: absolute;
    		top: 50%;
    		left: 50%;
    		transform: translate(-50%, -50%);
			border-radius: 5px;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left_img {
				width: 250px;
				height: 350px;
			}
    		.login_form {
				margin-right: 60px;
    			.btns {
    				display: flex;
    				justify-content: center;
					.loginIn{
						width:200px;
					}
				}
				.title {
					font-size: 16px;
					color: #000;
					height: 35px;
					line-height: 35px;
					i {
						color: #75B9E6;
						margin-right:10px;
					}
				}
				.username_input{
					display: flex;
					justify-content: center;
					/deep/ input {
					 // border:1px solid #FFFFF0;
					 width: 300px;
					 background-color: #FFFFF0;
				  }
				}
    		}
    	}
    }
</style>
