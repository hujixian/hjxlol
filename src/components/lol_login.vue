<template>
    <div class="login">
<!-- 登录窗口背景 -->
        <div class="login_bg" v-show="showit"></div>
<!-- 登录窗口 -->
        <div class="login_window" v-show="showit">
<!-- 关闭按钮 -->
            <div class="close"><a href="javascript:;" @click="close"></a></div>
<!-- 快速登录窗口 -->
            <div class="login_fast" v-if="fastLogin">
                <p>快速安全登录</p>
                <p>请使用<a href="javascript:;">QQ手机版</a>扫描二维码，</p>
                <p>安全登录,防止盗号。</p>
                <div class="erweima"><img src="../assets/img/login/zhifubao.jpg" alt=""></div>
                <div class="other_chose"><a href="javascript:;" @click="login_uname">账号密码登陆</a><span>|</span><router-link to="/reg">注册新账号</router-link><span>|</span><a href="javascript:;">意见反馈</a></div>
            </div>
<!-- 账号密码登录窗口 -->
            <div class="login_uname" v-else>
                <p>账号密码登录</p>
                <p>推荐使用<a href="javascript:;" @click="login_fast">快速安全登录</a>，防止盗号。</p>
                <div class="danger">{{danger_msg}}</div>
                <div class="uname"><input type="text" v-model="uname" :placeholder="uname_prompt" @click="uanme_getit" @blur="uname_loseit"></div>
                <div class="upwd"><input type="password" v-model="upwd" :placeholder="upwd_prompt" @click="upwd_getit" @blur="upwd_loseit"></div>
                <button class="login_btn" @click="login_btn">登 录</button>
                <div class="other_chose"><a href="javascript:;">忘了密码？</a><span>|</span><router-link to="/reg">注册新账号</router-link><span>|</span><a href="javascript:;">意见反馈</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import {baseURL} from "../assets/js/config.js"
import qs from "qs"
export default {
    data(){
        return{
            fastLogin:1,
            uname_prompt:"支持用户名/邮箱/手机号登录",
            upwd_prompt:"密码",
            uname:"",
            upwd:"",
            danger_msg:""
        }
    },
    props:{
        showit:{default:"0"}
    },
    methods:{
        close(){this.$emit("toLogin",0);this.fastLogin=1;this.upwd=""},
        login_uname(){this.fastLogin=0;},
        login_fast(){this.fastLogin=1;},
        uanme_getit(){this.uname_prompt="";this.danger_msg="";},
        upwd_getit(){this.upwd_prompt="";this.danger_msg="";},
        uname_loseit(){this.uname_prompt="支持用户名/邮箱/手机号登录";},
        upwd_loseit(){this.upwd_prompt="密码";},
        login_btn(){
            if ( this.uname == "" ) {this.danger_msg="用户名不能为空";return;}
            else if ( this.upwd == "" ) {this.danger_msg="密码不能为空";return;}
            else {
                axios.post(baseURL+"/lol/login",qs.stringify({uname:this.uname,upwd:this.upwd}))
                .then(result=>{
                    if ( result.data.length ) {
                        this.close();
                        this.$emit("isLogin",result.data[0]);
                        sessionStorage.setItem("uid",result.data[0].uid);
                        alert("登陆成功");
                    } else {
                        this.danger_msg="用户名或密码错误"
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
.login_bg{width: 100%;height: 60rem;min-width: 74.1875rem;background: rgba(256,256,256,.6);position: fixed;top: 0;left: 0;}
.login_window{width: 38.75rem;height: 22.875rem;background: #fff;position: fixed;text-align: center;top: 50%;left: 50%;margin: -11.4375rem 0rem 0rem -19.375rem;padding: 0.125rem;overflow: hidden;border-radius: 0.25rem;padding-top: 0.25rem;}
.login_window>.close{width: 2.9375rem;height: 1.25rem;background: url(../assets/img/index/home_navico2.png) -13.9375rem -7.875rem no-repeat;position: relative;left: 100%;margin-left: -2.9375rem;border-left: 0.0625rem solid #ddd;}
.login_window>.close:hover{background: url(../assets/img/index/home_navico2.png) -13.9375rem -9.4375rem no-repeat;}
.login_window>.close>a{width: 2.9375rem;height: 1.25rem;display: block;}
.login_window>div+div{width: 100%;height: 100%;position: relative;top: -1.25rem;}
.login_window>div+div>p:first-child{color: #333333;font-size: 1.375rem;font-weight: 300;margin: 1.25rem 0rem 0.875rem 0rem;}
.login_window>div+div>p+p{color: #666666;font-size: 0.9325rem;}
.login_window>.login_fast>p+p{margin: 0.125rem 0rem;}
.login_window>div+div>p>a{color: #3481cf;}
.login_window a:hover{text-decoration: underline;}
.login_window>.login_fast>.erweima{width: 8.375rem;height: 8.375rem;margin: 2rem auto 0rem;padding: 0.25rem;border: 0.0625rem solid #ddd;}
.login_window>.login_fast>.erweima>img{width: 7.625rem;}
.login_window>div+div>.other_chose{position: absolute;top: 19rem;left: 20rem;}
.login_window>div+div>.other_chose>a{font-size: 0.875rem;color: #666666;}
.login_window>div+div>.other_chose>span{font-size: 0.875rem;color: #999999;margin: 0rem 0.5rem 0rem;}
.login_window>.login_uname>p+p{margin: 0.125rem 0rem 1rem 0rem;}
.login_window>.login_uname>.danger{width: 17rem;height: 1.25rem;margin: 0rem auto 0.25rem;color: #f00;font-size: 0.75rem;text-align: left;}
.login_window>.login_uname>div+div{width: 17rem;height: 2.5rem;margin: 0rem auto 1rem;}
.login_window>.login_uname>div>input,.login_window>.login_uname>button{width: 16.9375rem;height: 2.5rem;border: 0;}
.login_window>.login_uname>div>input{padding: 0.625rem 0rem 0.625rem 0.625rem;background: url(../assets/img/index/home_navico2.png) -0.0625rem -0.125rem no-repeat;}
.login_window>.login_uname>button{font-size: 1rem;color: #fff;background: #86ce2f;border-radius: 0.125rem;}
</style>

