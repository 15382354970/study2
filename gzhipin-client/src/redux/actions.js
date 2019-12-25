/*
* 包含n个action creator
* 异步action
* 同步action
* */
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'
import {reqRegister,reqLogin} from '../api/index'

/*同步消息*/
const authSuccess = (user)=>({type:AUTH_SUCCESS,data:user})
const errorMsg = (msg)=>({type: ERROR_MSG,data: msg})

/*异步注册action*/
export const register=(user)=>{
    const {username,password,password1,type} = user;
    // 表单的前台验证，如果不通过，返回一个errorMsg的同步action
    if(!username){
        return errorMsg('用户名必须指定！')
    }else if(password!==password1){
        return errorMsg('两次密码要一致！')
    }
    // 表单数据合法，返回一个发Ajax请求的异步action函数
    return async dispatch=>{
        // 发送异步请求
        /*const promise = reqRegister(user)
        promise.then(response=>{
            const result = response.data //{code:0,data:user,msg:''}
        })*/
        const response = await reqRegister({username,password,type})
        const result = response.data
        if(result.code===0){
            // 分发成功的action
            dispatch(authSuccess(result.data))
        }else {
            // 分发失败的action
            dispatch(errorMsg(result.msg))
        }
    }
}
/*异步登录*/
export const login= (user)=>{
    const {username,password} = user;
    // 表单的前台验证，如果不通过，返回一个errorMsg的同步action
    if(!username){
        return errorMsg('用户名必须指定！')
    }else if(!password){
        return errorMsg('密码必须指定！')
    }
    return async dispatch=>{
        const response = await reqLogin(user);
        const result = response.data
        if(result.code===0){
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}