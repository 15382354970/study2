import React, {Component} from 'react'
import {Button,
    WingBlank,
    WhiteSpace,
    InputItem,
    List,
    NavBar
} from "antd-mobile";
import {connect} from "react-redux";
import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
const ListItem = List.Item
 class Login extends Component{
    state={
        username:'',
        password:''
    }

    handleChange=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    login=()=>{
        this.props.login(this.state)
    }
    toRegister=()=>{
        this.props.history.replace('/register')
    }
    render() {
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {msg?<div style={{color:'red',fontSize:18,textAlign:'center'}}>{msg}</div>:null}
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={(val)=>this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password" onChange={(val)=>this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.login}>登录</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>({user: state.user}),
    {login}
)(Login)