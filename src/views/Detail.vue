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
					<div class="title">您现在的位置：<router-link to="/productlist">全部商品</router-link>&gt;道具详情</div>
					<div class="user" v-if="IsLogin.user_name==''">召唤师信息：<a href="javascript:;" class="login" @click="tologin">未登录</a></div>
					<div class="user" v-else>召唤师信息：{{IsLogin.user_name}}</div>
				</div>
				<div class="d2">
					<div class="d2_left">
<!-- 热门商品窗口 -->
						<lol-hot></lol-hot>
<!-- 喜欢商品窗口 -->
						<lol-like></lol-like>
					</div>
<!-- 商品详情窗口 -->
					<div class="d2_right">
                        <div class="right_d1">
                            <div class="pic">
                                <img :src="det.det_way" alt="">
                                <div class="lookwhere" :style="lookwhere" v-show="showbig"></div>
                                <div class="topdiv" @mousemove="moveit" @mouseenter="lookbig" @mouseleave="closebig"></div>
                            </div>
                            <div class="msg">
                                <p class="title">{{det.title}}</p>
                                <div class="price">
                                    <p>Q币价：{{det.q_price}} Q币</p>
                                    <p>微信价：<span>¥{{det.v_price}}</span></p>
                                </div>
                                <p class="term">期限：{{det.term}}</p>
                                <div class="btn">
                                    <button class="toCar" @click="tocar(det.pid)" v-if="canbuy(det.pid)">加入购物车</button>
                                    <button class="cannottoCar" @click="cannotbuy" v-else>已拥有</button>
                                    <button class="give">赠送</button>
                                </div>
                            </div>
                            <div class="bigpic" :style="bigimg" v-show="showbig"></div>
                        </div>
                        <div class="right_d2">
                            <p class="title">商品详情</p>
                            <p class="msg">
                                <span>商品名称：{{det.title}}</span>
                                <span>商品类型：{{det.type}}</span>
                            </p>
                            <div class="phone_pay">
                                <div>
                                    <p>手机购买</p>
                                    <div></div>
                                </div>
                                <div class="erweima"><img src="../assets/img/detail/wechat.jpg" alt=""></div>
                            </div>
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
    props:["pid"],
    watch:{pid(){this.getdetail(this.pid);}},
    data(){return{
		IsLogin:{user_name:"",money:0},
		ToLogin:0,
        Page:"detail",
        det:{q_price:0,v_price:0},
        whologin:sessionStorage.getItem('uid'),
        bigimg:{backgroundImage:"",backgroundSize:"68rem 40rem",backgroundPosition:"0px 0px"},
        lookwhere:{top:"46px",left:"0px"},
        showbig:0,
        havepro:[],
	}},
    methods:{
		tologin(){this.ToLogin=1;},
		to_login(show){this.ToLogin=show;},
		is_login(msg){this.IsLogin=msg;},
        logout(){this.IsLogin={user_name:"",money:0};sessionStorage.clear();},
        getdetail(pid){
            axios.get(baseURL+"/lol/detail"+pid)
            .then(result=>{
                this.det=result.data[0];
                this.bigimg.backgroundImage="url("+this.det.det_way+")"
            });
        },
        moveit(event){
            if ( event.offsetX<48 ) {  this.lookwhere.left="0px" }
            else if ( event.offsetX>224 ){ this.lookwhere.left="176px" }
            else{this.lookwhere.left=(event.offsetX-48)+"px"}
            if ( event.offsetY<32 ) {  this.lookwhere.top="46px" }
            else if ( event.offsetY>128 ){ this.lookwhere.top="142px" }
            else{this.lookwhere.top=(event.offsetY+14)+"px"}
            this.bigimg.backgroundPosition=(parseInt(this.lookwhere.left)*-4)+"px "+((parseInt(this.lookwhere.top)-46)*-4)+"px"
        },
        lookbig(){this.showbig=1},
        closebig(){this.showbig=0},
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
					if (msg.pid==pid){return false}
				}
				return true;
			}else{return true}
		}
	},
    mounted(){
        document.documentElement.scrollTop=0;
        this.getdetail(this.pid)
		if(this.whologin){
			axios.post(baseURL+"/lol/whologin",qs.stringify({uid:this.whologin}))
			.then(result=>{this.is_login(result.data[0]);});
			axios.get(baseURL+"/lol/havepro"+this.whologin).then(result=>{
                this.havepro=result.data;
            });
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
.home>.d1{display: flex;justify-content: space-between;height: 1.125rem;margin: 1.5rem 0rem 0.5rem;}
.home>.d1>div{color: #606060;font-size: 0.5rem;}
.home>.d1>.title>a{color: #3a3f4a;}
.home>.d1>div>a:hover{color: #000;text-decoration: underline;}
.home>.d1>.user>a{color: #3a3f4a;font-size: 0.875rem;font-weight: 700;}
.home>.d2{display: flex;justify-content: space-between;}
.home>.d2>.d2_left{width: 14.25rem;height: 52.625rem;}
.home>.d2>.d2_left>div{width: 100%;height: 25.9375rem;background: #fafbfc;padding: 0rem 1.125rem 0.5rem;}
.home>.d2>.d2_left>.prop_hot{margin-bottom: 0.625rem;}
.home>.d2>.d2_left .right_title{width: 100%;height: 3rem;display: flex;border-bottom: 0.125rem solid #eee;}
.home>.d2>.d2_left .right_title>div{width: 5rem;height: 100%;color: #555555;font-size: 1rem;font-weight: 700;text-align: center;line-height: 3rem;border-bottom: 0.125rem solid #36ab87;margin-top: 0.125rem;}
.home>.d2>.d2_left a>div{width: 100%;height: 5.5625rem;padding-top: 1rem;display: flex;}
.home>.d2>.d2_left a+a>div{border-top: 0.0625rem dashed #ddd;}
.home>.d2>.d2_left a>div>div:first-child{width: 4.75rem;height: 3.375rem;margin-right: 0.5rem;}
.home>.d2>.d2_left a>div>div>img{width: 4.75rem;}
.home>.d2>.d2_left a>div>div>p{font-size: 0.5rem;color: #000;}
.home>.d2>.d2_left a>div>div>p:last-child>span{font-weight: 700;}
.home>.d2>.d2_left a>div>div>p:first-child{font-weight: 700;margin-bottom: 0.375rem;}
.home>.d2>.d2_left a>div:hover>div>p:first-child{color: #36ab87;text-decoration: underline;}
.home>.d2>.d2_left a>div:hover>div>p:last-child{color: #ff5900;}
.home>.d2>.d2_right{width: 59.5rem;height: 35.0625rem;padding: 1.875rem 0rem 0.875rem;background: #fff;}
.home>.d2>.d2_right>.right_d1{width: 55.5rem;height: 22.5rem;margin-left: 3.625rem;display: flex;position: relative;}
.home>.d2>.d2_right>.right_d1>.pic{text-align: center;line-height: 25rem;position: relative;}
.home>.d2>.d2_right>.right_d1>.pic>img{width: 17rem;height: 10rem;}
.home>.d2>.d2_right>.right_d1>.pic>.lookwhere{width: 6rem;height: 4rem;background: #555;position: absolute;opacity: .5;}
.home>.d2>.d2_right>.right_d1>.pic>.topdiv{width: 17rem;height: 10rem;position: absolute;top:2.875rem;}
.home>.d2>.d2_right>.right_d1>.msg{width: 28.5rem;height: 13.875rem;margin-left: 1.4375rem;}
.home>.d2>.d2_right>.right_d1>.msg>.title{margin-top: 0.625rem;padding: 0rem 1rem;font-size: 1.5rem;font-weight: 700;}
.home>.d2>.d2_right>.right_d1>.msg>.price{width: 28.5rem;height: 4.75rem;margin-top: 2rem;background: url(../assets/img/detail/prop_msg.png) -0.3125rem -8.9375rem no-repeat;}
.home>.d2>.d2_right>.right_d1>.msg>.price>p,.home>.d2>.d2_right>.right_d1>.msg>.term{padding: 0.5rem 1rem 0rem;color: #606060;font-size: 0.875rem;}
.home>.d2>.d2_right>.right_d1>.msg>.price>p>span{color: #ff5900;font-size: 1.25rem;font-weight: 700;padding-left: 0.5rem;}
.home>.d2>.d2_right>.right_d1>.msg>.btn{margin-top: 4rem;padding: 1rem;}
.home>.d2>.d2_right>.right_d1>.msg>.btn>button{width: 11rem;height: 3rem;color: #fff;font-size: 1.25rem;margin: 0.625rem 0.5626rem 0rem 0.9375rem;border: 0;}
.home>.d2>.d2_right>.right_d1>.msg>.btn>.toCar{background: #ff5900;}
.home>.d2>.d2_right>.right_d1>.msg>.btn>.cannottoCar{background: #666;}
.home>.d2>.d2_right>.right_d1>.msg>.btn>.toCar:hover{background: #ff4a00;}
.home>.d2>.d2_right>.right_d1>.msg>.btn>.give{background: #259afe;}
.home>.d2>.d2_right>.right_d1>.msg>.btn>.give:hover{background: #258ffe;}
.home>.d2>.d2_right>.right_d1>.bigpic{width: 24rem;height: 16rem;position: absolute;top: 0.5rem;left: 18rem;}
.home>.d2>.d2_right>.right_d2{width: 57rem;height: 6.3125rem;padding: 0.5rem 1rem;margin: 2.25rem auto 1.25rem;border: #ddd solid 0.0625rem;position: relative;}
.home>.d2>.d2_right>.right_d2>.title{font-weight: 700;font-size: 0.9375rem;}
.home>.d2>.d2_right>.right_d2>.msg{font-size: 0.875rem;text-align: center;}
.home>.d2>.d2_right>.right_d2>.msg>span+span{padding-left: 2rem;}
.home>.d2>.d2_right>.right_d2>.phone_pay{width: 10rem;height: 3rem;display: flex;flex-wrap: wrap;position: absolute;left: 100%;top: 0;margin-left: -10rem;overflow: hidden;}
.home>.d2>.d2_right>.right_d2>.phone_pay:hover{overflow: visible;}
.home>.d2>.d2_right>.right_d2>.phone_pay:hover>div:first-child>div{background: url(../assets/img/detail/prop_msg.png) -8.875rem -21.6875rem no-repeat;}
.home>.d2>.d2_right>.right_d2>.phone_pay>div:first-child{width: 100%;height: 100%;display: flex;justify-content: space-between;padding: 1rem;}
.home>.d2>.d2_right>.right_d2>.phone_pay>div:first-child>p{color: #606060;font-size: 0.875rem;line-height: 2rem;}
.home>.d2>.d2_right>.right_d2>.phone_pay>div:first-child>div{width: 2.8125rem;height: 1.75rem;background: url(../assets/img/detail/prop_msg.png) -0.3125rem -21.6875rem no-repeat;}
.home>.d2>.d2_right>.right_d2>.phone_pay>.erweima{width: 10rem;height: 10rem;}
.home>.d2>.d2_right>.right_d2>.phone_pay>.erweima>img{width: 10rem;}
</style>