<template>
<!-- 页面底层 -->
	<div class="outside">
<!-- 内容区域 -->
		<div class="inside">
<!-- 头部区域 -->
			<lol-header :showit="IsLogin.user_name" :page="Page" @toLogin="to_login" @logOut="logout"></lol-header>
<!-- 主体区域 -->
			<div class="home">
				<h1>这里是限时折扣页面,页面还没写</h1>
                <h3 v-for="i of 50" :key="i">假装我写了</h3>
			</div>
		</div>
<!-- 脚部区域 -->
		<div class="footer_place"><div class="inside"><lol-footer></lol-footer></div></div>
<!-- 登录弹窗 -->
        <lol-login :showit="ToLogin" @toLogin="to_login" @isLogin="is_login"></lol-login>
    </div>
</template>
<script>
import lolHeader from "../components/lol_header"
import lolFooter from "../components/lol_footer"
import lolLogin from "../components/lol_login"
import axios from "axios"
import qs from "qs"
import {baseURL} from "../assets/js/config.js"

export default {
    components:{lolHeader,lolFooter,lolLogin},
    data(){return{
		IsLogin:{user_name:"",money:0},
		ToLogin:0,
		Page:"discount",
		list:[],
		whologin:sessionStorage.getItem('uid')
	}},
    methods:{
		tologin(){this.ToLogin=1;},
		to_login(show){this.ToLogin=show;},
		is_login(msg){this.IsLogin=msg;},
        logout(){this.IsLogin={user_name:"",money:0};sessionStorage.clear();},
	},
    mounted(){
		document.documentElement.scrollTop=0;
		axios.get(baseURL+"/lol/list").then(result=>{
			this.list=result.data;
		})
		if(this.whologin){
			axios.post(baseURL+"/lol/whologin",qs.stringify({uid:this.whologin}))
			.then(result=>{this.is_login(result.data[0])})
		}
    }
}
</script>
<style scoped>
.outside{background: #f3f4f6 url(../assets/img/header/car_head_bg.jpg) no-repeat center top;}
.outside>.inside{background: #f3f4f6 url(../assets/img/header/car_head_bg.jpg) no-repeat center top;margin: 0 auto;position: relative;}
.inside{width: 74.1875rem;}
@media screen and (min-width:75rem){.footer_place{justify-content: center;}}
.footer_place{width: 100%;height: 22.25rem;margin-top: 2.5rem;background: #3B3F4A;display: flex;flex-wrap: wrap;}
footer{width: 100%;height: 100%;}
.footer{width: 74.1875rem;height: 22.25rem;background: #3B3F4A;}
</style>