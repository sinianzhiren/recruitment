import React, { Component } from 'react'
import { connect } from "react-redux"
import { List } from "antd-mobile"
import Badge from "antd-mobile/lib/badge"

const Item = List.Item
const Brief = Item.Brief
@connect(
    state => state
)
class Msg extends Component{
    getLastMsg(arr){
        return arr[arr.length - 1]
    }
    render() {
        // 消息按照个人分组
        let msgGroup = {}
        this.props.chat.msgList.forEach(item => {
            msgGroup[item.chatId] = msgGroup[item.chatId] || []
            msgGroup[item.chatId].push(item)
        })
        const msgGroupVal = Object.values(msgGroup).sort((a, b) => {
            const a_time = this.getLastMsg(a).createTime
            const b_time = this.getLastMsg(b).createTime
            return b_time - a_time
        })

        const currentId = this.props.user._id
        const userInfo = this.props.chat.users
        return (
            <div>
                {
                    msgGroupVal.map(item => {
                        const lastMsg = this.getLastMsg(item)
                        const targetId = item[0].from === currentId? item[0].to : item[0].from
                        const unReadNum = item.filter(v => !v.read && v.to === currentId).length
                        return (<List key={ lastMsg._id }>
                            <Item
                                extra={ <Badge text={ unReadNum }></Badge> }
                                thumb={ require(`../../images/${ userInfo[targetId].avatar }.png`) }
                                arrow='horizontal'
                                onClick={ () => {
                                    this.props.history.push(`/chat/${ targetId }`)
                                }}
                        >
                                { lastMsg.content }
                            <Brief>{ userInfo[targetId].name }</Brief>
                        </Item>
                            </List>)
                    })
                }
            </div>
        )
    }
}

export default Msg