<template>
<!-- 头部区域 -->
	<div class="header">
<!-- 头部一楼 -->
		<div class="d1">
            <div class="navigation">
                <ul>
                    <li v-if="showit==''"><span>您还未登录，请</span><a href="javascript:;" @click="toLogin">登录</a></li>
                    <li v-else><span>欢迎您！</span><span>{{showit}}</span><a href="javascript:;" @click="logout">退出</a></li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><a href="javascript:;">个人中心</a></li>
                    <li><a href="javascript:;">官方论坛</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                </ul>
            </div>
        </div>
<!-- 头部二楼 -->
        <div class="d2">
            <!-- LOL_LOGO -->
            <a href="https://lol.qq.com" target="_blank"><div class="logo"></div></a>
            <!-- 搜索栏 -->
            <div class="search"><input type="text" placeholder="输入道具进行搜索"><div class="search_img"><a href="javascript:;"></a></div></div>
        </div>
<!-- 头部三楼 -->
        <div class="d3">
<!-- 导航栏 -->
            <div class="navigation">
                <router-link class="alltitle" to="/index"><div :class="{page:page=='index'}">首页</div></router-link>
                <router-link class="alltitle" to="/productlist"><div :class="{page:page=='list'}">商品列表</div></router-link>
                <router-link class="alltitle" to="/activity"><div :class="{page:page=='activity'}">活动专区</div></router-link>
                <router-link class="alltitle" to="/discount"><div :class="{page:page=='discount'}">限时折扣</div></router-link>
                <router-link class="alltitle" to="/paradise"><div :class="{page:page=='paradise'}">聚豆乐园</div></router-link>
                <router-link class="alltitle" to="/surround"><div :class="{page:page=='surround'}">周边商城</div></router-link>
                <a href="javascript:;" class="alltitle" v-if="showit==''" @click="toLogin"><div>个人中心</div></a>
                <router-link class="alltitle" :to="`/personal/${whologin}`" v-else><div :class="{page:page=='personal'}">个人中心</div></router-link>
            </div>
<!-- 购物车按钮 -->
            <div class="shop_car">
                <a href="javascript:;" class="cartitle" @click="toLogin" v-if="showit==''"><div></div><p>购物车</p></a>
                <router-link class="cartitle" :to="`/shoppingcar/${whologin}`" v-else><div></div><p>购物车</p></router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){return{
		whologin:sessionStorage.getItem('uid')
	}},
    methods:{
        toLogin(){this.$emit("toLogin",1)},
        logout(){this.$router.push("/index");this.$emit("logOut",1)}
    },
    props:{
        showit:{default:""},
        page:{default:"index"}
    }
}
</script>

<style scoped>
.header{height: 12.625rem;}
.header .d1{max-width: 74.375rem;height: 1.875rem;padding: 0.35rem 2rem 0.35rem 0rem;}
.header .d1>.navigation{width: 30rem;float: right;}
.header .navigation>ul{display: flex;list-style: none;}
.header .d1>.navigation>ul>li{color: #9F9F9F;font-size: 0.75rem;flex: 1 1 auto;padding-left: 1rem;text-align: center;}
.header .d1>.navigation>ul>li>span{margin-right: 0.25rem;}
.header .d1>.navigation>ul>li>a{color: #9F9F9F;}
.header .d1>.navigation>ul>li+li>a{margin-left: 1rem;}
.header .d1>.navigation>ul a:hover{text-decoration: underline;}
.header .d1>.navigation>ul>li+li::before{content:"|";}
.header .d2{max-width: 74.375rem;height: 6rem;display: flex;}
.header .d2>a>.logo{width: 11rem;height: 6rem;margin-left: 2rem;background: url(../assets/img/header/header_navico.png) no-repeat -28rem 0.75rem;}
.header .d2>.search{margin: 1.35rem 0rem 0rem 10rem;}
.header .d2>.search>input{width: 32.5rem;height: 3.25rem;color: #bbb;font-size: 0.875rem;padding: 0rem 0.5rem 0rem 1rem;background: rgba(0,0,0,0) url(../assets/img/header/header_navico.png) no-repeat -62.5rem 0rem;border:none;outline: 0rem;float: left;}
.header .d2>.search>.search_img{width: 3rem;height: 3rem;background: url(../assets/img/header/header_navico.png) no-repeat -97.5rem 0rem;float: left;margin-left: -3rem;margin-top: 0.125rem;}
.header .d2>.search>.search_img>a{display: block;width: 3rem;height: 3rem;}
.header .d3{width: 100%;max-width: 74.375rem;height: 4.75rem;display: flex;}
.header .d3>.navigation{width: 60rem;height: 100%;display: flex;align-items: center;justify-content: space-between;}
.header .d3>.navigation>.alltitle>div{width: 8.375rem;height: 4.75rem;color: #9F9F9F;font-size: 1.125rem;text-align: center;line-height: 4.1875;color: #9F9F9F;font-weight: 500;}
.header .d3>.navigation>.alltitle>div:hover{color: #FF5900;}
.header .d3>.navigation>.alltitle>div.page{color :#fef7ec;font-weight: 700;background: url(../assets/img/header/header_navico.png) no-repeat -18rem -0.3125rem;}
.header .d3>.navigation>.alltitle>div.page:hover{color: #fef7ec;}
.header .d3>.shop_car{padding-top: 1rem;margin-left: 6rem;width: 12rem;height: 4.75rem;}
.header .d3>.shop_car>.cartitle{line-height: 2.625rem;display: flex;}
.header .d3>.shop_car>.cartitle>div{width: 2.5rem;height: 2.5rem;background: url(../assets/img/header/header_navico.png) no-repeat -14.5rem 0.25rem;}
.header .d3>.shop_car>.cartitle>p{font-weight: 600;font-size: 18px;color: #FF5900;padding-left: 0.5rem;}
</style>



