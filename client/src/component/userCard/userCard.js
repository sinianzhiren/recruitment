import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank} from "antd-mobile"
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    handleChat(item){
        this.props.history.push(`/chat/${ item._id }`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                {
                    this.props.userList.map(item => (
                        item.avatar ?
                            (<Card
                                style={{marginBottom: 5}}
                                key={item.user}
                                onClick={ () => this.handleChat(item) }
                            >
                                <Header
                                    title={item.user}
                                    thumb={require(`../../images/${item.avatar}.png`)}
                                    extra={<span>{item.title}</span>}
                                ></Header>
                                <Body>
                                    {
                                        item.type === 'boss'? <div>公司：{ item.company }</div> : null
                                    }
                                    {
                                    item.desc.split('\n').map((it, index) => (
                                        <p key={index}>{it}</p>
                                    ))
                                }
                                    {
                                        item.type === 'boss'? <div>薪资：{ item.money }</div> : null
                                    }
                                </Body>
                            </Card>) : null
                    ))
                }

            </WingBlank>
        )
    }
}

export default UserCard