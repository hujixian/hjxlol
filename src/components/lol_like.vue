<template>
    <div class="prop_like">
        <div class="right_title"><div>猜你喜欢</div></div>
        <router-link class="everypro" :to="`/details/${msg.pid}`" v-for="(msg,i) of like_pro" :key="i">
            <div class="prop">
                <div><img :src="msg.pic_way" alt="" class="img"></div>
                <div>
                    <p class="title">{{msg.title}}</p>
                    <p class="q_price">球币价：{{msg.q_price.toFixed(2)}}球币</p>
                    <p class="v_price">微信价：<span>¥{{msg.v_price.toFixed(2)}}</span></p>
                </div>
            </div>
        </router-link>
    </div>
</template><script>
import axios from "axios"
import qs from "qs"
import {baseURL} from "../assets/js/config.js"

export default {
    data(){return{
		like_pro:[]
	}},
    mounted(){
		axios.get(baseURL+"/lol/index_pro").then(result=>{
        	var n=0;
			for(var item of result.data){
				if (item.prop_place=="like"){this.like_pro[n]=item;n++;}
			} 
			this.like_pro=JSON.parse(JSON.stringify(this.like_pro))
		})
    }
}
</script>
<style scoped>
.prop_like{width: 100%;height: 25.9375rem;background: #fafbfc;padding: 0rem 1.125rem 0.5rem;margin-bottom: 0.625rem;}
.right_title{width: 100%;height: 3rem;display: flex;border-bottom: 0.125rem solid #eee;}
.right_title>div{width: 5rem;height: 100%;color: #555555;font-size: 1rem;font-weight: 700;text-align: center;line-height: 3rem;border-bottom: 0.125rem solid #36ab87;margin-top: 0.125rem;}
.everypro>div{width: 100%;height: 5.5625rem;padding-top: 1rem;display: flex;}
.everypro+.everypro>div{border-top: 0.0625rem dashed #ddd;}
.everypro>div>div:first-child{width: 4.75rem;height: 3.375rem;margin-right: 0.5rem;}
.everypro>div>div>img{width: 4.75rem;}
.everypro>div>div>p{font-size: 0.5rem;color: #000;}
.everypro>div>div>p:last-child>span{font-weight: 700;}
.everypro>div>div>p:first-child{font-weight: 700;margin-bottom: 0.375rem;}
.everypro>div:hover>div>p:first-child{color: #36ab87;text-decoration: underline;}
.everypro>div:hover>div>p:last-child{color: #ff5900;}
</style>