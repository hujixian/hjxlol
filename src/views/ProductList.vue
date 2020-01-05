<template>
<!-- 页面底层 -->
	<div class="outside">
<!-- 内容区域 -->
		<div class="inside">
<!-- 头部区域 -->
			<lol-header :showit="IsLogin.user_name" :page="Page" @toLogin="to_login" @logOut="logout"></lol-header>
<!-- 主体区域 -->
			<div class="home">
				<div class="d1">
					<div class="title">您现在的位置：全部商品</div>
					<div class="user" v-if="IsLogin.user_name==''">召唤师信息：<a href="javascript:;" class="login" @click="tologin">未登录</a></div>
					<div class="user" v-else>召唤师信息：{{IsLogin.user_name}}</div>
				</div>
<!-- 侧边栏商品窗口 -->
				<div class="d2">
					<div class="left">
<!-- 热门商品窗口 -->
						<lol-hot></lol-hot>
<!-- 喜欢商品窗口 -->
						<lol-like></lol-like>
					</div>
					<div class="right">
<!-- 主商品窗口一楼 -->
						<div class="right_d1">
							<span>关键字：</span>
							<input type="text" class="findwhat" v-model="findwhat">
							<span>价格区间(球币)：</span>
							<input type="text" class="qmin" v-model="qmin">
							<span>-</span>
							<input type="text" class="qmax" v-model="qmax">
							<button @click="findit">确定</button>
						</div>
<!-- 主商品窗口二楼_商品信息窗口 -->
						<div class="right_d2">
							<div class="list">
								<div class="prop" v-for="(msg,i) of show_prop" :key="i">
									<router-link :to="`/detail/${msg.pid}`"><img :src="msg.show_way" alt=""></router-link>
									<router-link :to="`/detail/${msg.pid}`"><p>{{msg.title}}</p></router-link>
									<p>球币价：&nbsp;&nbsp;<span>{{msg.q_price.toFixed(2)}}球币</span></p>
									<p>微信价：&nbsp;&nbsp;<span>¥{{msg.v_price.toFixed(2)}}</span></p>
									<button @click="cannotbuy" v-if="canbuy(msg.pid)">立即购买</button>
									<button @click="tocar(msg.pid)" v-else>立即购买</button>
								</div>
							</div>
						</div>
						<div class="right_d3">
							<a href="javascript:;" @click="tofirst">首页</a>
							<a href="javascript:;" @click="toprevious">上一页</a>
							<span v-show="whichpage>=4 && num_page>=4">...</span>
							<span><a href="javascript:;" v-for="i of num_page" :key="i" @click="changepage(i)" :class="{atwhich:whichpage==i}" v-show="showwhich(i)">{{i}}</a></span>
							<span v-show="whichpage<=num_page-2 && num_page>=4">...</span>
							<a href="javascript:;" @click="tonext">下一页</a>
							<a href="javascript:;" @click="tolast">尾页</a>
							<span>共{{num_page}}页 到第<input type="text" v-model="gowhich">页</span>
							<button @click="towhich">确定</button>
						</div>
					</div>
				</div>
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
import lolHot from "../components/lol_hot"
import lolLike from "../components/lol_like"
import axios from "axios"
import qs from "qs"
import {baseURL} from "../assets/js/config.js"

export default {
    components:{lolHeader,lolFooter,lolLogin,lolHot,lolLike},
    data(){return{
		IsLogin:{user_name:"",money:0},
		ToLogin:0,
		Page:"list",
		list:[],
		show_prop:[],
		all_prop:[],
		whologin:sessionStorage.getItem('uid'),
		findwhat:"",
		qmin:"",
		qmax:"",
		whichpage:1,
		gowhich:1,
		havepro:[],
	}},
	watch:{
		whichpage(){
			this.show_prop=this.all_prop.slice((this.whichpage-1)*16,(this.whichpage*16));
		}
	},
	computed:{num_page(){return Math.ceil(this.all_prop.length/16)}},
    methods:{
		tologin(){this.ToLogin=1;},
		to_login(show){this.ToLogin=show;},
		is_login(msg){this.IsLogin=msg;},
		logout(){this.IsLogin={user_name:"",money:0};sessionStorage.clear();},
		findit(){
			if ( this.findwhat != "" || this.qmin != "" || this.qmax != "" ) {
				var qbmin,qbmax;
				if ( this.qmin == "" ){ qbmin=0; } else { qbmin=this.qmin };
				if ( this.qmax == "" ){ qbmax=99999999; } else { qbmax=this.qmax };
				this.all_prop=[];
				var reg = new RegExp(this.findwhat);
				for(var i=0;i<this.list.length;i++){
					if( (reg.test(this.list[i].title)||reg.test(this.list[i].type)) && this.list[i].q_price>qbmin && this.list[i].q_price<qbmax ){
						this.all_prop.push(this.list[i]);
					}
				}
				this.show_prop=this.all_prop.slice(0,16);
			} else {
				this.all_prop=this.list;
				this.show_prop=this.all_prop.slice(0,16);
			}
		},
		changepage(i){
			document.documentElement.scrollTop=0;
			this.whichpage=i;
		},
		tofirst(){if(this.whichpage>1){document.documentElement.scrollTop=0;this.whichpage=1;}},
		tolast(){if(this.whichpage<this.num_page){document.documentElement.scrollTop=0;this.whichpage=this.num_page;}},
		toprevious(){if(this.whichpage>1){document.documentElement.scrollTop=0;this.whichpage-=1;}},
		tonext(){if(this.whichpage<this.num_page){document.documentElement.scrollTop=0;this.whichpage+=1;}},
		towhich(){if(this.whichpage!=this.gowhich){document.documentElement.scrollTop=0;this.whichpage=this.gowhich;}},
		showwhich(i){
			if(this.whichpage<3){if(i>4){return false}else{return true}}
			else if(this.whichpage>this.num_page-2){if(i<this.num_page-3){return false}else{return true}}
			else{if(i>this.whichpage-3 && i<this.whichpage+2){return true}else{return false}}
		},
		tocar(pid){
			if(this.whologin){
				axios.post(baseURL+"/lol/tocar",qs.stringify({uid:this.whologin,pid})).then(result=>{
                	alert(result.data.msg);
            	})
			}else{alert("请您先登录！")}
		},
		cannotbuy(){
			alert("您已拥有该商品，请勿重复购买！")
		},
		canbuy(pid){
			if(this.whologin){
				for (var msg of this.havepro){
					if (msg.pid==pid){return true}
				}
				return false;
			}else{return false}
		}
	},
    created(){
		document.documentElement.scrollTop=0;
		axios.get(baseURL+"/lol/list").then(result=>{
			this.list=result.data;
			this.all_prop=this.list;
			this.show_prop=this.all_prop.slice(0,16);
		})
		if(this.whologin){
			axios.post(baseURL+"/lol/whologin",qs.stringify({uid:this.whologin}))
			.then(result=>{this.is_login(result.data[0])});
			axios.get(baseURL+"/lol/havepro"+this.whologin).then(result=>{
				this.havepro=result.data;
			})
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
.home{width: 100%;margin-bottom: 2.5rem;}
.home>.d1{display: flex;justify-content: space-between;height: 1.125rem;margin: 1.5rem 0rem 0.5rem;}
.home>.d1>div{color: #606060;font-size: 0.5rem;}
.home>.d1>.title>a{color: #3a3f4a;}
.home>.d1>div>a:hover{color: #000;text-decoration: underline;}
.home>.d1>.user>a{color: #3a3f4a;font-size: 0.875rem;font-weight: 700;}
.home>.d2{display: flex}
.home>.d2>.left{width: 14.25rem;height: 100%;}
.home>.d2>.left>div{width: 100%;height: 25.9375rem;background: #fafbfc;padding: 0rem 1.125rem 0.5rem;}
.home>.d2>.left>.prop_hot{margin-bottom: 0.625rem;}
.home>.d2>.left .left_title{width: 100%;height: 3rem;display: flex;border-bottom: 0.125rem solid #eee;}
.home>.d2>.left .left_title>div{width: 5rem;height: 100%;color: #555555;font-size: 1rem;font-weight: 700;text-align: center;line-height: 3rem;border-bottom: 0.125rem solid #36ab87;margin-top: 0.125rem;}
.home>.d2>.left a>div{width: 100%;height: 5.5625rem;padding-top: 1rem;display: flex;}
.home>.d2>.left a+a>div{border-top: 0.0625rem dashed #ddd;}
.home>.d2>.left a>div>div:first-child{width: 4.75rem;height: 3.375rem;margin-left: 0.5rem;}
.home>.d2>.left a>div>div>img{width: 4.75rem;}
.home>.d2>.left a>div>div>p{font-size: 0.5rem;color: #000;}
.home>.d2>.left a>div>div>p:last-child>span{font-weight: 700;}
.home>.d2>.left a>div>div>p:first-child{font-weight: 700;margin-bottom: 0.375rem;}
.home>.d2>.left a>div:hover>div>p:first-child{color: #36ab87;text-decoration: underline;}
.home>.d2>.left a>div:hover>div>p:last-child{color: #ff5900;}
.home>.d2>.right{width: 59.5rem;height: 100%;padding: 0rem 1.15625rem;margin-left: 0.625rem;background: #fafbfc;}
.home>.d2>.right>.right_d1{width: 100%;height: 3.0625rem;padding: 0rem 2rem;line-height: 3rem;border-bottom: 0.125rem solid #eee;}
.home>.d2>.right>.right_d1>span{color: #606060;font-size: 0.875rem;}
.home>.d2>.right>.right_d1>.findwhat{width: 15rem;height: 1.875rem;padding: 0rem 0.25rem;outline: none;margin-right: 5rem;}
.home>.d2>.right>.right_d1>.qmin,.home>.d2>.right>.right_d1>.qmax{width: 2.25rem;height: 1.875rem;padding: 0rem 0.25rem;outline: none;margin: 0rem 0.5rem;text-align: center;}
.home>.d2>.right>.right_d1>button{width: 3rem;height: 1.875rem;color: #606060;font-size: 1rem;margin-left: 2rem;}
.home>.d2>.right>.right_d2{width: 58.375rem;max-height: 97.25rem;overflow: hidden;}
.home>.d2>.right>.right_d2>.list{width: 100%;display: flex;flex-wrap: wrap;}
.home>.d2>.right>.right_d2>.list>div{width: 12.625rem;height: 23.125rem;margin: 0rem 0.8125rem 1.1875rem;text-align: center;background: url(../assets/img/index/home_navico.png) -14.8125rem -0.3125rem no-repeat;}
.home>.d2>.right>.right_d2>.list>div:hover{background: url(../assets/img/index/home_navico.png) -14.8125rem -24.0625rem no-repeat;}
.home>.d2>.right>.right_d2>.list>.prop img{width: 7.25rem;height: 13.25rem;margin: 1.4375rem 2.6875rem 0.5rem;}
.home>.d2>.right>.right_d2>.list>.prop>*>p{color: #000;font-weight: 700;font-size: 0.875rem;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.home>.d2>.right>.right_d2>.list>.prop>p{color: #606060;font-size: 0.625rem;margin-bottom: 0.25rem;}
.home>.d2>.right>.right_d2>.list>.prop>p>span{color: #ff5900;font-weight: 700;font-size: 0.875rem;}
.home>.d2>.right>.right_d2>.list>.prop button{width: 60%;height: 2rem;color: #ffffff;font-size: 0.875rem;line-height: 2rem;background: #36ab87;border: 0;border-radius: 0.0625rem;}
.home>.d2>.right>.right_d3{color: #333;height: 5rem;justify-content: center;text-align: center;display: flex;padding-top: 1.25rem;line-height: 2.5rem;}
.home>.d2>.right>.right_d3 a{color: #333;margin: 0rem 0.5rem;height: 2.5rem;border: #666 solid 0.0625rem;margin-right: 1rem;padding: 0rem 0.5rem;border-radius: 0.125rem;}
.home>.d2>.right>.right_d3>span{display: flex;margin: 0rem 0.5rem;}
.home>.d2>.right>.right_d3>span>a{border: #666 solid 0.0625rem;width: 2.5rem;}
.home>.d2>.right>.right_d3>span>.atwhich{border: #1994eb solid 0.0625rem;color: #1994eb;}
.home>.d2>.right>.right_d3>span>input{width: 2.5rem;height: 2.5rem;margin: 0rem 0.5rem;border-radius: 0.125rem;text-align: center;outline: none;font-size: 1rem;border: #666 solid 0.0625rem;}
.home>.d2>.right>.right_d3>button{width: 3.5rem;font-size: 1rem;height: 2.5rem;background: #fdfdfd;;margin: 0rem 0.5rem;border-radius: 0.125rem;border: #666 solid 0.0625rem;color: #333;}
.home>.d2>.right>.right_d3>button:hover{background: #dfdfdf;}
</style>