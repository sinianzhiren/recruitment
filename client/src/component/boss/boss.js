import React, {Component} from 'react'
import {connect} from "react-redux"
import {getUserTypeList} from '../../redux/chatuser.redux'
import UserCard from '../userCard/userCard'

@connect(
    state => state.chatUser,
    {getUserTypeList}
)
class Boss extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: 'genius'
        }
    }

    componentDidMount() {
        this.props.getUserTypeList(this.state.type)
    }

    render() {
        return <UserCard userList={ this.props.userList }></UserCard>
    }
}

export default Boss