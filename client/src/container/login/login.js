import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from "react-redux"
import { login, initData } from "../../redux/user.redux"
import { imoocForm } from '../../component/imooc-form/imooc-form'

@connect(
    state => state.user,
    { login, initData }
)
@imoocForm
class Login extends Component{
    constructor(props) {
        super(props)

        this.toRegister = this.toRegister.bind(this)
        this.logins = this.logins.bind(this)
    }
    componentDidMount() {
        this.props.initData()
    }

    logins(){
        this.props.login(this.props.state)
    }

    toRegister(){
        this.props.history.push('/register')
    }

    render() {
        return (
            <div>
                { (this.props.redirectTo && this.props.redirectTo !== '/login')? <Redirect to={ this.props.redirectTo }/> : null }
               <Logo></Logo>
                <WingBlank>
                    <List>
                        { this.props.msg? <p className='error-msg'>{ this.props.msg }</p> : null }
                        <InputItem
                            onChange={ v => this.props.handleChange('user', v) }
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            onChange={ v => this.props.handleChange('pwd', v) }
                        >密码</InputItem>
                    </List>
                    <WingBlank/>
                    <Button type='primary' onClick={ this.logins }>登陆</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={ this.toRegister }>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login