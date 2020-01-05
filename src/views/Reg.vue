<template>
<!-- 页面底层 -->
	<div class="reg">
<!-- 注册窗口 -->
		<div class="reg_window">
<!-- 标题 -->
			<div class="title"><p>欢迎注册LOL商城</p><p>英雄，为梦想而战！</p></div>
<!-- 信息录入区域 -->
			<div class="input">
<!-- 姓名 -->
				<div class="uname">
					<p>用户名</p>
					<input type="text" v-model="uname.val" :placeholder="uname.ph" maxlength="20" @focus="prompt_uname" @blur="test_uname">
					<p :style="uname.warn">{{uname.msg}}</p>
				</div>
<!-- 密码 -->
				<div class="upwd">
					<p>登录密码</p>
					<input type="password" v-model="upwd.val" :placeholder="upwd.ph" maxlength="18" @focus="prompt_upwd" @blur="test_upwd">
					<p :style="upwd.warn">{{upwd.msg}}</p>
				</div>
<!-- 确认密码 -->
				<div class="cpwd">
					<p>确认密码</p>
					<input type="password" v-model="cpwd.val" :placeholder="cpwd.ph" maxlength="18" @focus="prompt_cpwd" @blur="test_cpwd">
					<p :style="cpwd.warn">{{cpwd.msg}}</p>
				</div>
<!-- 邮箱 -->
				<div class="email">
					<p>邮箱</p>
					<input type="text" v-model="email.val" :placeholder="email.ph" @focus="prompt_email" @blur="test_email">
					<p :style="email.warn">{{email.msg}}</p>
				</div>
<!-- 手机号码 -->
				<div class="phone">
					<p>手机号码</p>
					<input type="text" v-model="phone.val" :placeholder="phone.ph" maxlength="11" @focus="prompt_phone" @blur="test_phone">
					<p :style="phone.warn">{{phone.msg}}</p>
				</div>
<!-- 真实姓名 -->
				<div class="user_name">
					<p>真实姓名</p>
					<input type="text" v-model="user_name.val" :placeholder="user_name.ph" maxlength="6" @focus="prompt_user_name" @blur="test_user_name">
					<p :style="user_name.warn">{{user_name.msg}}</p>
				</div>
<!-- 性别 -->
				<p class="gender">
					<span>性别</span>
					<input type="radio" id="man" name="sex" checked class="man">
					<label for="man">男</label>
					<input type="radio" id="woman" name="sex" class="woman">
					<label for="woman">女</label>
				</p>
			</div>
<!-- 提交按钮 -->
			<div class="button">
				<button class="btn" @click="reg">提交注册信息</button>
			</div>
		</div>
	</div>
</template>
<script>
import {reg_uname,reg_upwd,reg_email,reg_phone,reg_user_name} from "../assets/js/APIs/reg.js"
import axios from "axios";
import qs from "qs";
import {baseURL} from "../assets/js/config.js";

export default {
    data(){
        return {
			uname:{val:"",ph:"请输入用户名",msg:"",warn:"",isRight:false},
			upwd:{val:"",ph:"请输入密码",msg:"",warn:"",isRight:false},
			cpwd:{val:"",ph:"请确认密码",msg:"",warn:"",isRight:false},
			email:{val:"",ph:"请输入邮箱地址",msg:"",warn:"",isRight:false},
			phone:{val:"",ph:"请输入您的手机号码",msg:"",warn:"",isRight:false},
			user_name:{val:"",ph:"请输入您的真实姓名",msg:"",warn:"",isRight:false}
        }
	},
	methods:{
		prompt_uname(){
			this.uname.msg="用户名长度在6到20位之间";
			this.uname.warn={color:'#666'};
			this.uname.ph="";
		},
		prompt_upwd(){
			this.upwd.msg="密码长度在6到18位之间";
			this.upwd.warn={color:'#666'};
			this.upwd.ph="";
		},
		prompt_cpwd(){
			this.cpwd.msg="密码长度在6到18位之间";
			this.cpwd.warn={color:'#666'};
			this.cpwd.ph="";
		},
		prompt_email(){
			this.email.msg="请输入合法的邮箱地址";
			this.email.warn={color:'#666'};
			this.email.ph="";
		},
		prompt_phone(){
			this.phone.msg="请输入合法的手机号";
			this.phone.warn={color:'#666'};
			this.phone.ph="";
		},
		prompt_user_name(){
			this.user_name.msg="真实姓名长度在2到6位之间";
			this.user_name.warn={color:'#666'};
			this.user_name.ph="";
		},
		test_uname(){
			if ( this.uname.val=="" ) {
				this.uname.msg="用户名不能为空";
				this.uname.warn={color:'#ed6661'};
				this.uname.ph="请输入用户名";
				this.uname.isRight=false;
			} else {
				if ( reg_uname(this.uname.val) ) {
					axios.get(
						baseURL+"/lol/haveUname/"+this.uname.val,
					).then(result=>{
						this.uname.msg=result.data.msg
						if ( result.data.code ){
							this.uname.warn={color:'#ed6661'};
							this.uname.isRight=false;
						} else {
							this.uname.warn={color:'#168d31'};
							this.uname.isRight=true;
						}
					})
				} else {
					this.uname.msg="用户名格式不正确";
					this.uname.warn={color:'#ed6661'};
					this.uname.isRight=false;
				}
			}
		},
		test_upwd(){
			if ( this.upwd.val=="" ) {
				this.upwd.msg="用户密码不能为空";
				this.upwd.warn={color:'#ed6661'};
				this.upwd.ph="请输入密码";
				this.upwd.isRight=false;
			} else {
				if ( reg_upwd(this.upwd.val) ) {
					this.upwd.msg="密码可以使用"
					this.upwd.warn={color:'#168d31'};
					this.upwd.isRight=true;
				} else {
					this.upwd.msg="密码格式错误"
					this.upwd.warn={color:'#ed6661'};
					this.upwd.isRight=false;
				}
			}
		},
		test_cpwd(){
			if ( this.cpwd.val=="" ) {
				this.cpwd.msg="确认密码不能为空";
				this.cpwd.warn={color:'#ed6661'};
				this.cpwd.ph="请确认密码";
				this.cpwd.isRight=false;
			} else {
				if ( this.cpwd.val==this.upwd.val ) {
					this.cpwd.msg="确认密码输入正确"
					this.cpwd.warn={color:'#168d31'};
					this.cpwd.isRight=true;
				} else {
					this.cpwd.msg="两次输入的密码不一致";
					this.cpwd.warn={color:'#ed6661'};
					this.cpwd.isRight=false;
				}
			}
		},
		test_email(){
			if ( this.email.val=="" ) {
				this.email.msg="邮箱不能为空";
				this.email.warn={color:'#ed6661'};
				this.email.ph="请输入邮箱地址";
				this.email.isRight=false;
			} else {
				if ( reg_email(this.email.val) ) {
					axios.get(
						baseURL+"/lol/haveEmail/"+this.email.val,
					).then(result=>{
						this.email.msg=result.data.msg
						if ( result.data.code ){
							this.email.warn={color:'#ed6661'};
							this.email.isRight=false;
						} else {
							this.email.warn={color:'#168d31'};
							this.email.isRight=true;
						}
					})
				} else {
					this.email.msg="邮箱格式不正确";
					this.email.warn={color:'#ed6661'};
					this.email.isRight=false;
				}
			}
		},
		test_phone(){
			if ( this.phone.val=="" ) {
				this.phone.msg="手机号码不能为空";
				this.phone.warn={color:'#ed6661'};
				this.phone.ph="请输入您的手机号码";
				this.phone.isRight=false;
			} else {
				if ( reg_phone(this.phone.val) ) {
					axios.get(
						baseURL+"/lol/havePhone/"+this.phone.val,
					).then(result=>{
						this.phone.msg=result.data.msg
						if ( result.data.code ){
							this.phone.warn={color:'#ed6661'};
							this.phone.isRight=false;
						} else {
							this.phone.warn={color:'#168d31'};
							this.phone.isRight=true;
						}
					})
				} else {
					this.phone.msg="手机号码格式不正确";
					this.phone.warn={color:'#ed6661'};
					this.phone.isRight=false;
				}
			}
		},
		test_user_name(){
			if ( this.user_name.val=="" ) {
				this.user_name.msg="真实姓名不能为空";
				this.user_name.warn={color:'#ed6661'};
				this.user_name.ph="请输入您的真实姓名";
				this.user_name.isRight=false;
			} else {
				if ( reg_user_name(this.user_name.val) ) {
					this.user_name.msg="真实姓名可以使用"
					this.user_name.warn={color:'#168d31'};
					this.user_name.isRight=true;
				} else {
					this.user_name.msg="真实姓名格式错误"
					this.user_name.warn={color:'#ed6661'};
					this.user_name.isRight=false;
				}
			}
		},
		reg(){
			if ( this.uname.isRight && this.upwd.isRight && this.cpwd.isRight && this.email.isRight && this.phone.isRight && this.user_name.isRight ) {
				axios.post(
					baseURL+"/lol/reguser",
					qs.stringify({
						uname:this.uname.val,
						upwd:this.upwd.val,
						email:this.email.val,
						phone:this.phone.val,
						user_name:this.user_name.val
					})
				).then(result=>{
					if ( result.data.length ){
						alert("注册成功！\r恭喜您成为LOL商城用户！获得新手礼包（球币*200）一份！");
						sessionStorage.setItem("uid",result.data[0].uid);
						this.$router.push("/index")
					} else {
						alert("注册失败！请稍后再试！")
					}
				})
			} else {
				alert("注册失败，请确认输入信息无误！")
			}
		}
	},

	watch:{
		
	},
	computed:{
		
    }
}
</script>
<style scoped>
.reg{height: 58rem;background: url(../assets/img/reg/reg_bg.jpg) no-repeat center top;display: flex;flex-direction: row-reverse;animation:reg 2.5s linear 0s 1 normal;}
@media screen and (min-height: 45rem){body{overflow: hidden;};.reg{height: 65rem;};}
.reg_window_bg{background-color: #fff;position: absolute;right: 15rem;top: 8rem;margin: 0;border-radius: 0.25rem;animation:reg_window_bg 2.5s linear 0s 1 normal;}
.reg_window{width:34rem;height:34rem;background-color:rgba(255,255,255,.5);padding:1rem;position: relative;right: 15rem;top: 8rem;margin: 0;border-radius: 0.25rem;animation:reg_window 2.5s linear 0s 1 normal;}
@media screen and (max-width:64rem){.reg_window,.reg_window_bg{position: absolute;top: 8rem;right: 50%;margin-right: -17rem;}}
.title{width: 100%;}
.title>p:first-child{color: #222222;font-size: 2rem;font-weight: 500;}
.title>p:last-child{color: #222222;font-size: 1.5rem;font-weight: 300;margin: 0.5rem 0rem 1.5rem;}
.input>div,.gender{display: flex;height: 3.125rem;}
.input>div>p:first-child,.gender>span:first-child{color: #333;width: 5.125rem;text-align: right;line-height: 3rem;padding-right: 1rem;}
.input>div>p:last-child{color: #333;font-size: 0.875rem;width: 12rem;line-height: 2rem;height: 3rem;padding: 0.5rem 0rem 0.5rem 0.5rem;}
.input>div>input{width:15rem;padding:0.5rem;font-size:1rem;border:0.0625rem solid #999;margin: 0.5rem 0;border-radius: 0.125rem;background: rgba(255,255,255,.7);}
.gender{color: #333;line-height: 3rem;}
.gender>input{margin-top: 1.125rem;width: 2rem;}
.gender>.man{margin-left: 0.5rem;}
.gender>.woman{margin-left: 1.5rem;}
button{width:14.828125rem;height:2.5rem;margin-left: 5.125rem;color:#fff;font-size:1.125rem;background-color:#0aa1ed;border:0;border-radius:0.25rem;}
button:hover{background-color:#46aff4;}
button:active{font-size: 1.0625rem;}
</style>