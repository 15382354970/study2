/*
* 包含n个接口请求函数的模块
* */
import ajax from './ajax'

// 用户注册请求
export const reqRegister = (user)=>ajax('/register',user,"POST")
//用户登录请求
export const reqLogin = ({username,password})=>ajax('/login',{username,password},"POST")
// 用户信息更新请求
export const reqUpdateUser = (user)=>ajax('/update',user,'POST')