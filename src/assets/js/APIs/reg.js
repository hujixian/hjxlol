import axios from "axios"
import {baseURL} from "../config.js"
import qs from "qs"

/************************************************************************************/
/** ------------------------------- 正则验证表达式 ------------------------------- **/
/************************************************************************************/
/** --------------------------------- 用户名验证 --------------------------------- **/
function reg_uname(uname){var reg=/^[a-z\d_]{5,19}$/i;return reg.test(uname);}
/** ---------------------------------- 密码验证 ---------------------------------- **/
function reg_upwd(upwd){var reg=/^[a-zA-Z0-9]\w{5,17}$/;return reg.test(upwd);}
/** ---------------------------------- 邮箱验证 ---------------------------------- **/
function reg_email(email){var reg=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;return reg.test(email);}
/** -------------------------------- 手机号码验证 -------------------------------- **/
function reg_phone(phone){var reg=/^1[34578]\d{9}$/;return reg.test(phone);}
/** -------------------------------- 真实姓名验证 -------------------------------- **/
function reg_user_name(user_name){var reg=/^[\u4e00-\u9fa5]{2,6}$/;return reg.test(user_name);}
	
export{reg_uname,reg_upwd,reg_email,reg_phone,reg_user_name}