import React, {Component} from 'react'
import {Button,
    WingBlank,
    WhiteSpace,
    InputItem,
    List,
    Radio,
    NavBar
} from "antd-mobile";
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
const ListItem = List.Item

class Register extends Component{
    state={
        username:'',
        password:'',
        password1:'',
        type: 'laoban'
    }

    handleChange=(name,val)=>{
        this.setState({
            [name]:val
        })
}
// 点击注册调用
    register=()=>{
        console.log(this.state,this.props.msg)
        // debugger
        this.props.register(this.state)
    }
    toLogin=()=>{
        this.props.history.replace('/login')
    }
    render() {
        const {type} = this.state
        const {msg,redirectTo} = this.props.user
        // 如果redirectTo有值则重定向到redirectTo去
        if (redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {msg ? <div style={{color:'red',fontSize:18,textAlign:'center'}}>{msg}</div>:null}
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={(val)=>this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password" onChange={(val)=>this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password" onChange={(val)=>this.handleChange('password1',val)}>确认密码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <ListItem>
                            <span>用户类型：</span>&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'} onChange={()=>this.handleChange('type','dashen')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type ==='laoban'} onChange={()=>this.handleChange('type','laoban')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.register}>注册</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state =>({user:state.user}), //传数据
    {register} // 传函数
)(Register)