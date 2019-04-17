import React, { Component } from 'react'
import { connect } from "react-redux"
import { NavBar } from "antd-mobile"
import NavLinkBar from '../navlink/navlink'
import { Switch, Route } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'


@connect(
    state=> state,
    { getMsgList, recvMsg }
)
class Dashboard extends Component{
    componentDidMount() {
        let msgList = this.props.chat.msgList
        let unRead = msgList.filter(item => !item.read)
        if (!msgList.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }else if (unRead.length > 0){
            this.props.getMsgList()
        }
    }

    render() {
        const pathname = this.props.location.pathname
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: 'genius',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'genius',
                title: 'BOSS首页',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
       return (
           <div>
               <NavBar className='fix-header' mode='dark'>{ navList.find(v => v.path === pathname).title }</NavBar>
                    <div style={{ marginTop: 20}}>
                        <Switch>
                            { navList.map(item => (
                                <Route key={ item.path } path={ item.path } component={ item.component }></Route>
                                )
                            )}
                        </Switch>
                    </div>
               <NavLinkBar data={ navList }></NavLinkBar>
           </div>
       )
    }

}

export default Dashboard