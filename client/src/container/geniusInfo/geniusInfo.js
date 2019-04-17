import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile"
import AvatarSelector from '../../component/avatar-selector/AvatarSelector'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends Component{
    constructor(props){
        super(props)

        this.state = {
            title: '',
            desc: ''
        }
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    render(){
        const path = this.props.location.pathname
        const redirectTo = this.props.redirectTo
        return (
            <div>
                { redirectTo && redirectTo !== path? <Redirect to={ redirectTo }></Redirect> : null }
                <NavBar mode='dark'>牛人完善页面</NavBar>
                <AvatarSelector selectAvatar={ (imageName) => {
                    this.setState({
                        avatar: imageName
                    })
                }}/>

                <InputItem onChange={ v => this.handleChange('title', v) }>求职岗位</InputItem>
                <TextareaItem
                    onChange={ v => this.handleChange('desc', v) }
                    autoHeight
                    rows={ 3 }
                    title="个人简介"
                ></TextareaItem>
                <Button
                    type="primary"
                    onClick={ () => this.props.update(this.state) }
                >保存</Button>
            </div>
        )
    }
}

export default GeniusInfo