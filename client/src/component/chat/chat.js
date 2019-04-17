import React, { Component } from 'react'
import { List, InputItem, Button, NavBar, Icon, Grid } from "antd-mobile"
import { connect } from "react-redux"
import { getMsgList,sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../utils'
import { emojies } from "./emoji"
import './chat.css'
import QueueAnim from "rc-queue-anim"

const Item = List.Item

@connect(
    state => state,
    {sendMsg, getMsgList, recvMsg, readMsg }
)
class Chat extends Component{
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            showEmoji: false
        }
    }

    componentDidMount() {
        if (!this.props.chat.msgList.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    componentWillUnmount() {
        const currentId = this.props.match.params.user
        this.props.readMsg(currentId)
    }

    fixcarousel(){
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleSubmit(){
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({
            text: ''
        })
    }

    render() {
        const targetid = this.props.match.params.user
        const currentid = this.props.user._id
        const msgList = this.props.chat.msgList
        const users = this.props.chat.users
        if (!users[targetid]){
            return null
        }
        const chatid = getChatId(currentid, targetid)
        const chatMsgs = msgList.filter(item => item.chatId === chatid)
        const emoji = emojies.map(item => ({ text: item }))
        return (
        <div id='chat-page'>
            <NavBar
                mode='dark'
                icon={<Icon type="left" />}
                onLeftClick={ () => this.props.history.goBack() }
            >
                { users[targetid].name }
            </NavBar>

            <QueueAnim delay={ 100 }>
                { chatMsgs.map((item, index) => {
                    const avatar = require(`../../images/${ users[item.from].avatar }.png`)
                    return item.from === targetid ?
                        (<List key={index}>
                            <Item
                                thumb={ avatar }
                            >{item.content}</Item>
                        </List>)
                        :
                        <List key={index}>
                            <Item
                                extra={<img src={ avatar } alt="" />}
                                className='chat-me'
                            >{item.content}</Item>
                        </List>
                })}
            </QueueAnim>

            <div className='stick-footer'>
                <List>
                    <InputItem
                        placeholder='请输入...'
                        value={ this.state.text }
                        onChange={ v => {
                            this.setState({ text: v })
                        }}
                        extra={
                            <div className='input-right'>
                                <p
                                    onClick={ () => {
                                        this.setState({
                                            showEmoji: !this.state.showEmoji
                                        })
                                        this.fixcarousel()
                                    }}
                                ><span role='img' aria-label='😃'>😃</span></p>
                                <p>
                                    <Button type='primary' size='small' onClick={() => this.handleSubmit() }>发送</Button>
                                </p>
                            </div>
                        }
                    ></InputItem>
                </List>
                {
                    this.state.showEmoji?
                        <Grid
                            data={ emoji }
                            columnNum={ 8 }
                            isCarousel
                            carouselMaxRow={ 4 }
                            onClick={ (emoji) => {this.setState({ text: this.state.text + emoji.text })} }
                        /> : null
                }
            </div>
        </div>
        )
    }

}

export default Chat