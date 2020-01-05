<template>
<!-- 页面底层 -->
	<div class="outside">
<!-- 内容区域 -->
		<div class="inside">
<!-- 头部区域 -->
			<lol-header :showit="IsLogin.user_name" :page="Page" @toLogin="to_login" @logOut="logout"></lol-header>
<!-- 主体区域 -->
			<div class="home">
<!-- 主体一楼 -->
				<div class="d1">
<!-- 信息栏 -->
					<div class="msg">
						<div class="msg_1 nolog">
							<div class="qq_img"><img src="" alt=""></div>
							<div class="login_msg nolog" v-if="IsLogin.user_name==''">
								<p>你还未登录哦，<a href="javascript:;" @click="tologin">立即登录</a></p>
								<p>购买超值商品！</p>
							</div>
							<div class="login_msg islog" v-else>
								<p>欢迎来到LOL商城！</p>
								<p><span>{{IsLogin.user_name}}</span><a  href="javascript:;" @click="logout">退出</a></p>
							</div>
						</div>
						<div class="msg_2 nolog" v-if="IsLogin.user_name==''"><p>当前未绑定角色</p><p><a href="javascript:;">立即绑定&gt;</a></p></div>
						<div class="msg_2 islog" v-else>
							<p><span>账户余额： {{IsLogin.balance}} 球币</span><a href="javascript:;" @click="openrecharge">充值&gt;</a></p>
							<div>
								<div :style="vip"></div>
								<div>
									<div :style="schedule"></div>
									<div>{{money}}/{{exp}}</div>
								</div>
							</div>
						</div>
						<div class="msg_3">
                            <div><div></div><a href="javascript:;">我的优惠券</a></div>
                            <div><div></div><a href="javascript:;">查询Q币Q点余额</a></div>
                        </div>
						<div class="msg_4">
							<table>
								<tr><td><h5>公告</h5></td><td><a href="javascript:;">更多&gt;</a></td></tr>
								<tr><td colspan="2"><hr></td></tr>
								<tr><td><a href="javascript:;">道具城7周年瓜分百万Q币...</a></td><td>09/17</td></tr>
								<tr><td><a href="javascript:;">网络异常公告</a></td><td>03/23</td></tr>
								<tr><td><a href="javascript:;">2019元旦官网恢复通知</a></td><td>01/01</td></tr>
								<tr><td><a href="javascript:;">LOL聚诚品免费抓娃娃</a></td><td>03/30</td></tr>
							</table>
						</div>
					</div>
<!-- 轮播图 -->
					<div class="shift_img" @mouseenter="stopIt" @mouseleave="startIt">
<!-- 轮播图图片 -->
						<div class="pic_border">
							<div class="pic" :style="playIt">
								<a href="javascript:;" v-for="(msg,i) of shift_pic" :key="i"><img :src="msg.img" alt="" class="shift_pic"></a>
							</div>
						</div>
						<div class="navigation">
							<a href="javascript:;"><div :class="{hover:lookWhich==1}" @mouseover="lookOne_1">玉剑传说</div></a>
							<a href="javascript:;"><div :class="{hover:lookWhich==2}" @mouseover="lookOne_2">冠军之志瑞兹</div></a>
							<a href="javascript:;"><div :class="{hover:lookWhich==3}" @mouseover="lookOne_3">总决赛2019通行证</div></a>
							<a href="javascript:;"><div :class="{hover:lookWhich==4}" @mouseover="lookOne_4">LOL商城 重磅上新</div></a>
						</div>
					</div>
<!-- 一楼右侧窗口 -->
					<div class="right">
						<a href="javascript:;"><div class="right_1">活动中心</div></a>
						<a href="javascript:;"><div class="right_2">英雄商城</div></a>
						<div class="right_3"><img src="../assets/img/index/wechat.jpg" alt=""><p>手机付款，更便捷</p></div>
					</div>
				</div>
<!-- 主体二楼 -->
				<div class="d2">
<!--- 主商品窗口 -->
					<div class="left">
<!-- 主商品窗口一楼 -->
						<div class="left_d1">
<!-- 主商品窗口标题 -->
							<div class="left_d1_title">
								<a href="javascript:;" :class="{oneProp:oneprop==1}" @click="one_prop_1"><div>新品上架</div></a>
								<a href="javascript:;" :class="{oneProp:oneprop==2}" @click="one_prop_2"><div>热门推荐</div></a>
								<a href="javascript:;" :class="{oneProp:oneprop==3}" @click="one_prop_3"><div>西部魔影</div></a>
							</div>
<!-- "更多标签" -->
							<div><a href="javascript:;">更多&gt;</a></div>
						</div>
<!-- 主商品窗口二楼_商品信息窗口 -->
						<div class="left_d2">
							<div class="prop_center" :style="PropCenter">
								<div class="prop" v-for="(msg,i) of center_pro" :key="i">
									<router-link :to="`/details/${msg.pid}`"><img :src="msg.pic_way" alt=""></router-link>
									<router-link :to="`/details/${msg.pid}`"><p>{{msg.title}}</p></router-link>
									<p>球币价：&nbsp;&nbsp;<span>{{msg.q_price.toFixed(2)}}球币</span></p>
									<p>微信价：&nbsp;&nbsp;<span>¥{{msg.v_price.toFixed(2)}}</span></p>
									<router-link :to="`/details/${msg.pid}`"><button>立即购买</button></router-link>
								</div>
							</div>
						</div>
					</div>
<!-- 侧边栏商品窗口 -->
					<div class="right">
<!-- 热门商品窗口 -->
						<lol-hot></lol-hot>
<!-- 喜欢商品窗口 -->
						<lol-like></lol-like>
					</div>
				</div>
<!-- 主体三楼 -->
				<div class="d3">
<!-- 标题栏 -->
					<div class="p1"><div>周边商城</div><div><a href="javascript:;">更多&gt;</a></div></div>
<!-- 周边商品窗口 -->
					<div class="p2">
						<a href="javascript:;" v-for="(msg,i) of surround_pro" :key="i"><div class="p1"><img :src="msg.pic_way" alt=""><div><span>{{msg.title}}</span><span>¥{{msg.v_price}}</span></div></div></a>
					</div>
				</div>
<!-- 主体四楼 -->
				<div class="d4">
<!-- 标题栏 -->
					<div class="p1"><div>精彩活动</div><div><a href="javascript:;">更多&gt;</a></div></div>
<!-- 活动信息窗口 -->
					<div class="p2">
						<a href="javascript:;" v-for="(msg,i) of activity_pro" :key="i"><div class="p1"><img :src="msg.pic_way" alt=""><p>{{msg.title}}</p><p>活动时间：{{msg.term}}</p></div></a>
					</div>
				</div>
			</div>
		</div>
<!-- 脚部区域 -->
		<div class="footer_place"><div class="inside"><lol-footer></lol-footer></div></div>
<!-- 登录弹窗 -->
		<lol-login :showit="ToLogin" @toLogin="to_login" @isLogin="is_login"></lol-login>
<!-- 充值窗口 -->
		<div class="recharge" v-show="torecharge">
			<div class="close"><a href="javascript:;" @click="closerecharge"></a></div>
			<div class="putmoney"><input type="text" placeholder="请输入您想充值的金额" v-model="putmoney"></div>
			<div class="putupwd"><input type="password" placeholder="请输入充值密码" v-model="putupwd"></div>
			<button class="recharge_btn" @click="recharge">确 认 充 值</button>
		</div>
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
		shift_pic:[],
		center_pro:[],
		surround_pro:[],
		activity_pro:[],
		IsLogin:{user_name:"",money:0},
		ToLogin:0,
		Page:"index",
		money:0,
		exp:10,
		vip:{backgroundPosition:"-52px -471px"},
		timer:setInterval(this.shift,2500),
		playIt:{marginLeft:"0%"},
		lookWhich:1,
		oneprop:1,
		PropCenter:{marginTop:"0%"},
		whologin:sessionStorage.getItem('uid'),
		putmoney:"",
		putupwd:"",
		torecharge:0,
	}},
	methods:{
		openrecharge(){this.torecharge=1},
		closerecharge(){this.torecharge=0},
		recharge(){
			if (/^\+?[1-9][0-9]*$/.test(this.putmoney)){
				this.putmoney=parseInt(this.putmoney)
				if(this.putupwd==123456){
					axios.put(baseURL+"/lol/recharge",qs.stringify({uid:this.whologin,money:this.putmoney})).then(result=>{
						alert("充值成功！");
						this.torecharge=0;
						this.money+=this.putmoney;
						this.IsLogin.balance+=this.putmoney;
						this.putmoney="";
						this.putupwd="";
					})
				}else{alert("充值密码有误！请重新输入！")}
			}else{alert("输入金额有误！请重新输入！")}
		},
		tologin(){this.ToLogin=1;},
		to_login(show){this.ToLogin=show;},
		is_login(msg){this.IsLogin=msg;this.money=msg.money;},
		logout(){this.IsLogin={user_name:"",money:0};sessionStorage.clear();},
		shift(){if(this.lookWhich==4){ this.lookWhich=1;}else{this.lookWhich+=1;}},
		stopIt(){clearInterval(JSON.stringify(this.timer));},
		lookOne_1(){this.lookWhich=1},
		lookOne_2(){this.lookWhich=2},
		lookOne_3(){this.lookWhich=3},
		lookOne_4(){this.lookWhich=4},
		startIt(){this.timer=setInterval(this.shift,2500)},
		one_prop_1(){this.oneprop=1;this.PropCenter={marginTop:"0%"};},
		one_prop_2(){this.oneprop=2;this.PropCenter={marginTop:"-83.3%"};},
		one_prop_3(){this.oneprop=3;this.PropCenter={marginTop:"-166.6%"};}
	},
	watch:{
		lookWhich(){this.playIt.marginLeft=-(this.lookWhich-1)*100+"%";},
		money(){
			if(this.money<10){this.exp=10;this.vip={backgroundPosition:"-52px -471px"}}
			else if(this.money<100){this.exp=100;this.vip={backgroundPosition:"-69px -471px"}}
			else if(this.money<1000){this.exp=1000;this.vip={backgroundPosition:"-85px -471px"}}
			else if(this.money<10000){this.exp=10000;this.vip={backgroundPosition:"-102px -471px"}}
			else if(this.money<100000){this.exp=100000;this.vip={backgroundPosition:"-120px -471px"}}
			else{this.exp="MAX";this.vip={backgroundPosition:"-138px -471px"}}
		}
	},
	computed:{
		schedule(){
			if(this.exp=="MAX"){return "width:100%"}
			else{return "width:"+((this.money/this.exp)*100)+"%"}
		}
	},
    mounted(){
		axios.get(baseURL+"/lol/index_carousel").then(result=>{this.shift_pic = result.data;})
		axios.get(baseURL+"/lol/index_pro").then(result=>{
        	var n_c=0,n_s=0,n_a=0;
			for(var item of result.data){
				if(item.prop_place=="center"){this.center_pro[n_c] = item;n_c++;}
				else if (item.prop_place=="surround"){this.surround_pro[n_s] = item;n_s++;}
				else if (item.prop_place=="activity"){this.activity_pro[n_a] = item;n_a++;}
			}
			this.center_pro=JSON.parse(JSON.stringify(this.center_pro))
			this.surround_pro=JSON.parse(JSON.stringify(this.surround_pro))
			this.activity_pro=JSON.parse(JSON.stringify(this.activity_pro))
		})
		if(this.whologin){
			axios.post(baseURL+"/lol/whologin",qs.stringify({uid:this.whologin}))
			.then(result=>{this.is_login(result.data[0])})
		}
    }
}
</script>
<style scoped>
.outside{background: #f3f4f6 url(../assets/img/index/bg-outside.jpg) no-repeat center top;}
.outside>.inside{background: #f3f4f6 url(../assets/img/index/bg-inside.jpg) no-repeat;margin: 0 auto;position: relative;}
.inside{width: 74.1875rem;}
@media screen and (min-width:75rem){.footer_place{justify-content: center;}}
.header .d3>.navigation>a:first-child>div{color: #fff;font-weight: 700;background: url(../assets/img/header/header_navico.png) no-repeat -18rem -0.3125rem;}
.footer_place{width: 100%;height: 22.25rem;margin-top: 2.5rem;background: #3B3F4A;display: flex;flex-wrap: wrap;}
footer{width: 100%;height: 100%;}
.footer{width: 74.1875rem;height: 22.25rem;background: #3B3F4A;}
.home>.d1{width: 100%;height: 23.375rem;margin-bottom: 1.75rem;display: flex;}
.home>.d1>.msg{width: 13.75rem;height: 100%;color: #555555;background: #fff;margin-right: 0.3125rem;}
.home>.d1>.msg a{color: #1C8BE0;}
.home>.d1>.msg a:hover{text-decoration: underline;}
.home>.d1>.msg>.msg_1{width: 100%;height: 4.6875rem;padding: 1.0625rem 0rem 1.0625rem 1.25rem;display: flex;}
.home>.d1>.msg>.msg_1>.qq_img{width: 2.875rem;height: 2.875rem;margin-right: 0.5rem;background: url(../assets/img/index/home_navico.png) no-repeat -0.375rem -46.4375rem;}
.home>.d1>.msg>.msg_1>.login_msg>p{font-size: 0.7875rem;margin: 0.25rem 0rem;}
.home>.d1>.msg>.msg_1>.login_msg.islog>p>span{display: inline-block;width: 6.5rem;}
.home>.d1>.msg>.msg_2{width: 100%;height: 3.125rem;padding: 0.2rem 0.625rem 0rem 0.625rem;font-size: 0.7875rem;background: #f3f4f6;}
.home>.d1>.msg>.msg_2.nolog>p:first-child{margin: 0.25rem 0rem 0.25rem 0.5rem;}
.home>.d1>.msg>.msg_2.nolog>p:last-child{text-align: right;}
.home>.d1>.msg>.msg_2.islog>p{margin: 0.25rem 0rem 0.25rem 0.5rem;}
.home>.d1>.msg>.msg_2.islog>p>span{display: inline-block;width: 9.75rem;}
.home>.d1>.msg>.msg_2.islog>div{margin: 0.5rem 0rem 0.25rem 0.5rem;display: flex;}
.home>.d1>.msg>.msg_2.islog>div>div:first-child{height: 1rem;width: 1rem;margin-right: 0.75rem;background: url(../assets/img/index/index_navico.png);}
.home>.d1>.msg>.msg_2.islog>div>div:last-child{height: 0.75rem;width: 10rem;margin-top: 0.125rem;background: #aaa;border-radius: 0.375rem;position: relative;overflow: hidden;}
.home>.d1>.msg>.msg_2.islog>div>div>div:first-child{height: 100%;background: #fdab18}
.home>.d1>.msg>.msg_2.islog>div>div>div:last-child{height: 100%;width: 100%;font-size: 0.625rem;color: #333;text-align: center;position: absolute;top:-0.1875rem;left:0;}
.home>.d1>.msg>.msg_3{width: 100%;height: 3.5625rem;font-size: 0.875rem;padding: 0.375rem 0rem 0.375rem 1rem;}
.home>.d1>.msg>.msg_3>div{display: flex;margin: 0.125rem 0rem;}
.home>.d1>.msg>.msg_3>div:first-child{width: 6.5rem;}
.home>.d1>.msg>.msg_3>div:last-child{width: 8.75rem;}
.home>.d1>.msg>.msg_3>div>div{width: 1.25rem;height: 1.25rem;margin-right: 0.75rem;}
.home>.d1>.msg>.msg_3>div:first-child>div{background: url(../assets/img/index/home_navico.png) -0.0625rem -44.75rem no-repeat;}
.home>.d1>.msg>.msg_3>div:last-child>div{background: url(../assets/img/index/home_navico.png) -0.0625rem -51.3125rem no-repeat;}
.home>.d1>.msg>.msg_3>div:first-child:hover>div{background-position: -1.25rem -44.75rem;}
.home>.d1>.msg>.msg_3>div:last-child:hover>div{background-position: -0.0625rem -50.3125rem;}
.home>.d1>.msg>.msg_3>div:hover>a{color: #36AB87;}
.home>.d1>.msg>.msg_3 a{color: #555555;}
.home>.d1>.msg>.msg_4{height: 11.875rem;padding: 0.75rem 0.75rem 1rem 0.75rem;font-size: 0.5rem;background: #f3f4f6;}
.home>.d1>.msg>.msg_4>table hr{margin: 0.5rem 0rem;}
.home>.d1>.msg>.msg_4>table a{color: #555555;}
.home>.d1>.msg>.msg_4>table td:first-child{width: 10rem;height: 1.5rem;}
.home>.d1>.msg>.msg_4>table td:last-child{text-align: right;}
.home>.d1>.shift_img{width: 48.125rem;height: 100%;margin-right: 0.3125rem;}
.home>.d1>.shift_img>.pic_border{width: 100%;height: 20.625rem;overflow: hidden;}
.home>.d1>.shift_img>.pic_border>.pic{width: 400%;transition: 0.5s ease-out;}
.home>.d1>.shift_img>.pic_border>.pic:hover{animation-play-state: paused;}
.home>.d1>.shift_img>.navigation{width: 100%;display: flex;}
.home>.d1>.shift_img>.navigation div{width: 12.03125rem;height: 2.75rem;font-size: 0.875rem;color: #606167;background: #e8e8e8;text-align: center;line-height: 2.75rem;}
.home>.d1>.shift_img>.navigation div{width: 12.03125rem;height: 2.75rem;font-size: 0.875rem;color: #606167;background: #e8e8e8;text-align: center;line-height: 2.75rem;}
.home>.d1>.shift_img>.navigation div.hover{color: #e8e8e8;background: #36AB87;}
.home>.d1>.right{width: 11.625rem;height: 100%;}
.home>.d1>.right .right_1,.home>.d1>.right .right_2{width: 11.625rem;height: 5.1875rem;color: #D6C7B8;font-size: 1.375rem;text-align: center;line-height: 5.1875rem;}
.home>.d1>.right .right_1{background: url(../assets/img/index/home_navico.png) -0.375rem -18.875rem no-repeat;padding-left: 1.5rem;}
.home>.d1>.right .right_2{background: url(../assets/img/index/home_navico.png) -0.375rem -29.75rem no-repeat;padding-left: 1.5rem;}
.home>.d1>.right .right_1:hover{background-position: -0.3125rem -24.25rem;}
.home>.d1>.right .right_2:hover{background-position: -0.3125rem -35.1875rem;}
.home>.d1>.right .right_3{width: 11.625rem;height: 13rem;padding-top: 2rem;text-align: center;background: url(../assets/img/index/home_navico.png) -0.3125rem -0.25rem no-repeat;}
.home>.d1>.right>.right_3>img{width: 8rem;}
.home>.d2{width: 100%;height: 52.625rem;display: flex;margin-bottom: 2.5rem;}
.home>.d2>.left{width: 59.5rem;height: 100%;padding: 0rem 1.15625rem;margin-right: 0.625rem;background: #fafbfc;}
.home>.d2>.left>.left_d1{width: 100%;height: 3.0625rem;display: flex;justify-content: space-between;line-height: 3rem;border-bottom: 0.125rem solid #eee;}
.home>.d2>.left>.left_d1>.left_d1_title{width: 80%;height: 100%;display: flex;}
.home>.d2>.left>.left_d1>.left_d1_title>a>div{width: 6rem;height: 3.0625rem;color: #b8b8b8;font-size: 1.0625rem;font-weight: 500;justify-content: center;line-height: 2.9375rem;display: flex;}
.home>.d2>.left>.left_d1>.left_d1_title>a.oneProp>div{color: #555555;font-size: 1.125rem;font-weight: 700;border-bottom: 0.125rem solid #36ab87;}
.home>.d2>.left>.left_d1>div:last-child>a,.home>.d3>.p1>div>a,.home>.d4>.p1>div>a{color: #1994eb;font-size: 0.875rem;}
.home>.d2>.left>.left_d2{width: 58.375rem;height: 48.625rem;overflow: hidden;}
.home>.d2>.left>.left_d2>.prop_center{width: 100%;display: flex;flex-wrap: wrap;}
.home>.d2>.left>.left_d2>.prop_center>div{width: 12.625rem;height: 23.125rem;margin: 0rem 0.8125rem 1.1875rem;text-align: center;background: url(../assets/img/index/home_navico.png) -14.8125rem -0.3125rem no-repeat;}
.home>.d2>.left>.left_d2>.prop_center>div:hover{background: url(../assets/img/index/home_navico.png) -14.8125rem -24.0625rem no-repeat;}
.home>.d2>.left>.left_d2>.prop_center>.prop img{width: 7.25rem;margin: 1.4375rem 2.6875rem 0.5rem;}
.home>.d2>.left>.left_d2>.prop_center>.prop p{color: #000;font-weight: 700;font-size: 0.875rem;}
.home>.d2>.left>.left_d2>.prop_center>.prop>p{color: #606060;font-size: 0.625rem;margin-bottom: 0.25rem;}
.home>.d2>.left>.left_d2>.prop_center>.prop>p>span{color: #ff5900;font-weight: 700;font-size: 0.875rem;}
.home>.d2>.left>.left_d2>.prop_center>.prop button{width: 60%;height: 2rem;color: #ffffff;font-size: 0.875rem;line-height: 2rem;background: #36ab87;border: 0;border-radius: 0.0625rem;}
.home>.d2>.right{width: 14.25rem;height: 100%;}
.home>.d2>.right>div{width: 100%;height: 25.9375rem;background: #fafbfc;padding: 0rem 1.125rem 0.5rem;}
.home>.d2>.right>.prop_hot{margin-bottom: 0.625rem;}
.home>.d2>.right .right_title{width: 100%;height: 3rem;display: flex;border-bottom: 0.125rem solid #eee;}
.home>.d2>.right .right_title>div{width: 5rem;height: 100%;color: #555555;font-size: 1rem;font-weight: 700;text-align: center;line-height: 3rem;border-bottom: 0.125rem solid #36ab87;margin-top: 0.125rem;}
.home>.d2>.right a>div{width: 100%;height: 5.5625rem;padding-top: 1rem;display: flex;}
.home>.d2>.right a+a>div{border-top: 0.0625rem dashed #ddd;}
.home>.d2>.right a>div>div:first-child{width: 4.75rem;height: 3.375rem;margin-right: 0.5rem;}
.home>.d2>.right a>div>div>img{width: 4.75rem;}
.home>.d2>.right a>div>div>p{font-size: 0.5rem;color: #000;}
.home>.d2>.right a>div>div>p:last-child>span{font-weight: 700;}
.home>.d2>.right a>div>div>p:first-child{font-weight: 700;margin-bottom: 0.375rem;}
.home>.d2>.right a>div:hover>div>p:first-child{color: #36ab87;text-decoration: underline;}
.home>.d2>.right a>div:hover>div>p:last-child{color: #ff5900;}
.home>.d3{width: 100%;height: 23.5rem;background: #fff;padding: 0rem 1.15625rem;margin-bottom: 2.5rem;}
.home>.d3>.p1,.home>.d4>.p1{width: 100%;height: 3.0625rem;display: flex;justify-content: space-between;line-height: 3rem;border-bottom: 0.125rem solid #eee;}
.home>.d3>.p1>div:first-child,.home>.d4>.p1>div:first-child{width: 5.8125rem;height: 100%;color: #555555;font-size: 1.125rem;font-weight: 700;text-align: center;line-height: 2.9375rem;border-bottom: 0.125rem solid #36ab87;margin-top: 0.125rem;}
.home>.d3>.p2,.home>.d4>.p2{width: 100%;margin: 0.625rem 0rem 0rem;display: flex;}
.home>.d3>.p2{height: 19.6875rem;}
.home>.d3>.p2>a{width: 25%;}
.home>.d3>.p2>a>div{width: 100%;display: flex;flex-wrap: wrap;justify-content: center;}
.home>.d3>.p2>a>div>img{width: 16.625rem;height: 15.875rem;border: 0.0625rem solid #eee;}
.home>.d3>.p2>a>div>div{width: 16.625rem;color: #555555;font-size: 0.875rem;display: flex;justify-content: space-between;}
.home>.d3>.p2>a>div>div>span+span{color: #ff5900;font-weight: 700;}
.home>.d4{width: 100%;height: 18.8125rem;background: #fff;padding: 0rem 1.15625rem;}
.home>.d4>.p2{height: 15rem;padding: 0rem 0.75rem;justify-content: space-between;}
.home>.d4>.p2>a{width: 33%;}
.home>.d4>.p2>a>div{height: 13.6875rem;border: 0.0625rem solid #ddd;}
.home>.d4>.p2>a>div>img{width: 100%;height: 9.25rem;}
.home>.d4>.p2>a>div>p{margin: 0.375rem 1rem;color: #f74a4a;font-size: 0.875rem;font-weight: 700;}
.home>.d4>.p2>a>div>p:last-child{color: #000;font-size: 0.75rem;font-weight: 500;}
.recharge>.close{width: 2.9375rem;height: 1.25rem;background: url(../assets/img/index/home_navico2.png) -13.9375rem -7.875rem no-repeat;position: relative;left: 100%;margin:0 0 1.875rem -2.9375rem;border-left: 0.0625rem solid #ddd;}
.recharge>.close:hover{background: url(../assets/img/index/home_navico2.png) -13.9375rem -9.4375rem no-repeat;}
.recharge>.close>a{width: 2.9375rem;height: 1.25rem;display: block;}
.recharge{width: 20rem;height: 15rem;background: #fff;position: fixed;text-align: center;top: 50%;left: 50%;margin: -11.4375rem 0rem 0rem -10rem;padding: 0.125rem;overflow: hidden;border-radius: 0.25rem;padding-top: 0.25rem;}
.recharge>div>input,.recharge>button{width: 16.9375rem;height: 2.5rem;border: 0;}
.recharge>div+div{margin-bottom: 1rem;}
.recharge>div>input{padding: 0.625rem 0rem 0.625rem 0.625rem;background: url(../assets/img/index/home_navico2.png) -0.0625rem -0.125rem no-repeat;}
.recharge>button{font-size: 1rem;color: #fff;background: #86ce2f;border-radius: 0.125rem;}
</style>