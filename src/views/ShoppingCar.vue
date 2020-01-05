<template>
<!-- 页面底层 -->
	<div class="outside">
<!-- 内容区域 -->
		<div class="inside">
<!-- 头部区域 -->
			<lol-header :showit="IsLogin.user_name" :page="Page" @toLogin="to_login" @logOut="logout"></lol-header>
<!-- 主体区域 -->
			<div class="place">您现在的位置： 购物车</div>
			<div class="home">
				<p class="title">收货人信息</p>
				<hr>
				<p class="whocar">当前用户：<span>胡际显</span></p>
				<p class="title">商品信息</p>
				<hr>
				<div class="prop">
					<div class="protitle"><ul><li class="checkit"><input type="checkbox" v-model="buyall" value="全选" @click="choseall">全选</li><li class="pname">商品名称</li><li class="ptype">类型</li><li class="price">单价</li><li	class="ptime">期限</li><li class="pnum">数量</li><li class="discount">优惠</li><li class="oneprice">小计</li><li class="dowhat">操作</li></ul></div>
					<div class="promsg">
						<ul v-for="(msg,i) of car" :key="i">
							<li class="checkit"><input type="checkbox" v-model="wantbuy" :value="{pri:msg.q_price*num[i],pid:msg.pid}"></li>
							<li class="pname"><router-link :to="`/detail/${msg.pid}`"><img :src="msg.det_way" alt=""></router-link><router-link :to="`/detail/${msg.pid}`"><span>{{msg.title}}</span></router-link></li>
							<li class="ptype">{{msg.type}}</li>
							<li class="price">{{msg.q_price.toFixed(2)}}球币</li>
							<li	class="ptime">{{msg.term}}</li>
							<li class="pnum"><a href="javascript:;" @click="dropone(msg.pid,i)">-</a><input type="text" v-model="num[i]"><a href="javascript:;" @click="getone(msg.pid,i)">+</a></li>
							<li class="discount">{{msg.is_discount?"促销中":"无优惠"}}</li>
							<li class="oneprice">{{oneprice(msg.q_price,i).toFixed(2)}}球币</li>
							<li class="dowhat"><a href="javascript:;" @click="dropit(msg.pid)">删除</a></li>
						</ul>
					</div>
				</div>
				<div class="buy"><div>商品件数/最大件数({{wantbuy.length}}/{{car.length}})</div><div><span>实付款：<span class="howmuch">{{allprice.toFixed(2)}}</span>球币</span><button @click="buyit(wantbuy[0])">提交订单</button></div></div>
				<p class="title">温馨提示</p>
				<hr>
				<p class="danmsg">"LOL优惠券使用规则：[道具包]分类道具全场无法使用，每张优惠券的信息，请仔细核对以下信息：订单满减的金额是否符合要求、优惠券限定可用的道具范围。"</p>
				<p class="danmsg">"购买成功后系统会自动发货，如发货失败24小时内会自动补发。"</p>
				<p class="danmsg">"请确认游戏中是否存在购物车中的英雄或皮肤，如果存在，请勿重复购买。"</p>
				<p class="danmsg">"请重新登录游戏查收物品。"</p>
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
		Page:"shoppingcar",
		allpro:[],
        car:[],
		num:[],
		wantbuy:[],
		buyall:[],
		whologin:sessionStorage.getItem('uid'),
	}},
	watch:{
		wantbuy(){
			if(this.car.length==this.wantbuy.length){
				this.buyall[0]="全选"
			}else{
				this.buyall=[];
			}
		}
	},
	computed:{
		allprice(){
			var price=0;
			for(var p of this.wantbuy){
				price+=p.pri;
			}
			return price;
		}
	},
    methods:{
		tologin(){this.ToLogin=1;},
		to_login(show){this.ToLogin=show;},
		is_login(msg){this.IsLogin=msg;},
		logout(){this.IsLogin={user_name:"",money:0};sessionStorage.clear();},
		oneprice(price,i){return price*this.num[i]},
		getcar(uid){
			axios.get(baseURL+"/lol/car"+uid).then(result=>{
				this.car=[];
				var i=0;
				for (var msg of result.data) {
					this.num[i]=msg.count;
					for (var pro of this.allpro){
						if (pro.pid==msg.pid){
							this.car[i]=pro;i++;
						}
					}
				}
				this.car=JSON.parse(JSON.stringify(this.car));
			})
		},
		putnum(pid,i){
			axios.put(baseURL+"/lol/putnum",qs.stringify({uid:this.whologin,pid,i}))
			.then(result=>{this.getcar(this.whologin);})
		},
		dropit(pid){
			if (confirm("确认删除该商品?")){
				for(var i=0;i<this.wantbuy.length;i++){
					if (this.wantbuy[i].pid==pid){this.wantbuy.splice(i,1)}
				}
				for(var i=0;i<this.car.length;i++){
					if (this.car[i].pid==pid){this.car.splice(i,1)}
				}
				axios.delete(baseURL+"/lol/dropcar/"+pid+"&"+this.whologin).then(result=>{
					alert(result.data.msg);
					this.getcar(this.whologin);
				})
			}      
		},
		probg(i){return {background:"url("+this.car[i].det_way+") no-repeat"}},
		dropone(pid,i){
			if (this.num[i]>1){
				this.num[i]-=1;
				for(var msg of this.wantbuy){
					if(msg.pid==pid){
						for(var res of this.car){
							if(res.pid==pid){
								msg.pri=res.q_price*this.num[i]
							}
						}
					}
				}
				this.putnum(pid,this.num[i])
			}else{
				alert("不能再少啦！")
			}
		},
		getone(pid,i){
			if (this.num[i]<1){
				this.num[i]+=1;
				for(var msg of this.wantbuy){
					if(msg.pid==pid){
						for(var res of this.car){
							if(res.pid==pid){
								msg.pri=res.q_price*this.num[i]
							}
						}
					}
				}
				this.putnum(pid,this.num[i])
			}else{
				alert("该商品最多可购买1件！")
			}
		},
		buyit(pro){
			if(this.wantbuy.length){
				axios.post(baseURL+"/lol/whologin",qs.stringify({uid:this.whologin})).then(result=>{
					if(result.data[0].balance<this.allprice){
						alert("余额不足，请先充值！")
					}else{
						var price=0,count=0;
						for (var onepri of this.allpro){
							if (onepri.pid==pro.pid){
								price=onepri.q_price;
								count=onepri.count;
							}
						}
						axios.put(baseURL+"/lol/usemoney",qs.stringify({uid:this.whologin,price})).then(result=>{
							axios.post(baseURL+"/lol/getpro",qs.stringify({uid:this.whologin,pid:pro.pid,count})).then(result=>{
								axios.delete(baseURL+"/lol/dropcar/"+pro.pid+"&"+this.whologin).then(result=>{
									for(var i=0;i<this.wantbuy.length;i++){
										if (this.wantbuy[i].pid==pro.pid){this.wantbuy.splice(i,1)}
									}
									for(var i=0;i<this.car.length;i++){
										if (this.car[i].pid==pro.pid){this.car.splice(i,1)}
									}
									if(this.wantbuy.length){return this.buyit(this.wantbuy[0])}
									else{alert("购买完成！");}
								})
							})
						});
					}
				})
			}
		},
		choseall(){
			if(this.buyall.length){
				this.wantbuy=[]
			}else{
				var arr=[];
				for (var i=0; i<this.car.length; i++){
					arr[i]={pri:this.car[i].q_price*this.num[i],pid:this.car[i].pid}
				}
				this.wantbuy=arr;
			}
		}
	},
    mounted(){
        document.documentElement.scrollTop=0;
		if(this.whologin){
			axios.post(baseURL+"/lol/whologin",qs.stringify({uid:this.whologin}))
			.then(result=>{this.is_login(result.data[0])})
		}
		axios.get(baseURL+"/lol/list").then(result=>{
			this.allpro=result.data;
			this.getcar(this.whologin);
		})
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
.place{height: 1.125rem;margin: 1.5rem 0rem 0.5rem;color: #606060;font-size: 0.5rem;}
.home{padding: 1.375rem;background: #fafbfc;}
.home>.title{font-weight: 700;font-size: 0.875rem;color: #000;margin-bottom: 0.25rem;}
.home>.whocar{font-size: 0.8125rem;margin: 1.5rem 0 2rem;}
.home>.whocar>span{font-weight: 700;font-size: 0.875rem;padding-left: 0.5rem;}
.home>.prop{background: #f3f4f6;margin: 1rem 0;padding: 0rem 1rem 0.5rem;}
ul{display: flex;justify-content: space-between;text-align: center;height: 2.5rem;padding: 0.25rem 0;line-height: 2rem;font-size: 0.875rem;color: #333333;}
.promsg>ul{border-top: #ccc solid 0.0625rem;}
.promsg>ul:hover{background: #fffeee;}
ul>li.checkit{width: 5rem;}
ul>li.pname{width: 20rem;padding-left: 1rem;}
.promsg>ul>li.pname{display: flex;}
.promsg>ul>li.pname>a{color: #333333;}
ul>li.pname img{width: 3rem;height: 2rem;margin-right: 0.5rem;}
ul>li.ptype{width: 8rem;}
ul>li.price{width: 7rem;}
ul>li.ptime{width: 3rem;}
ul>li.pnum{width: 8rem;}
.promsg>ul>li.pnum{display: flex;justify-content:center;padding: 0.25rem 0}
.promsg>ul>li.pnum>a{width: 1.25rem;height: 1.5rem;line-height: 1.5rem;color: #333333;}
.promsg>ul>li.pnum>a:hover{color: #f74a4a;border: #f74a4a solid 0.0625rem;line-height: 1.375rem;}
.promsg>ul>li.pnum>input{width: 2rem;height: 1.5rem;text-align: center;margin: 0 0.375rem;outline: none;color: #333333;}
ul>li.discount{width: 4rem;}
ul>li.oneprice{width: 7rem;}
ul>li.dowhat{width: 6rem;}
ul>li.dowhat>a{color: #1c8bde;}
.buy{height: 3.25rem;background: #fffeee;display: flex;justify-content: space-between;line-height: 3rem;padding-left: 1rem;font-size: 0.875rem;color: #333333;margin-bottom: 1rem;border: #ccc solid 0.0625rem;}
.buy>div>span>.howmuch{color: #f74a4a;font-size: 1.5rem;font-weight: 700;margin: 0 0.5rem;}
.buy>div>button{height: 3.125rem;width: 10rem;background: #f74a4a;color: #fff;font-size: 1.25rem;font-weight: 700;margin-left:2rem;border: 0;}
.buy>div>button:hover{background: #e84747;}
.danmsg{color: #333333;font-size: 0.875rem;}
</style>