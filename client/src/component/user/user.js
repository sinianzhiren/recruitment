import React, {Component} from 'react'
import {connect} from "react-redux"
import {Result, List, WhiteSpace, Modal } from "antd-mobile"
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

const Item = List.Item
const Brief = Item.Brief


@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends Component {
    constructor(props){
        super(props)

        this.cancelBtn = { marginBottom: 50 }
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(){
        // 退出登录
        const alert = Modal.alert
        const alertText = [
    { text: '取消', onPress: () => console.log('取消') },
    { text: '确认', onPress: () => {
            browserCookie.erase('userid')
            this.props.history.push('/login')
            this.props.logoutSubmit()
        } }
    ]
        alert('退出', '确认退出登录吗?', alertText)
    }

    render() {
        const props = this.props
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../../images/${props.avatar}.png`)} alt={props.user}/>}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                >
                </Result>

                <List renderHeader={ () => '个人简介' }>
                    <Item multipleLine>
                        { props.title }
                        { props.desc.split('\n').map((item, index) => (
                            <Brief key={ index }>{ item }</Brief>
                        ))}
                        { props.money? <Brief>薪资：{ props.money }</Brief> : null }
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List style={ this.cancelBtn }>
                    <Item onClick={ this.handleLogout }>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={this.props.redirectTo } />
    }
}

export default User