/*
* 包含n个reducer函数，根据老的state和action返回新的state
*
* 一般从后台返回的数据都要存起来
* */
import {combineReducers} from "redux";
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'
const initUser = {
    username:'',
    type:'',
    msg:'',// 请求错误信息
    redirectTo:''  //需要自动重定向的路由路径
}


function user(state=initUser,action) {
   switch (action.type) {
       case AUTH_SUCCESS:
           return { ...action.data,redirectTo: '/'};
       case ERROR_MSG:
           return {...state, msg:action.data};
       default:
           return state
   }
}



export default combineReducers({
    user
})
/*
* 向外暴露的状态结构{ user}
* */