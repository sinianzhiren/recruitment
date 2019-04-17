import { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { userInfo } from '../../redux/user.redux'
import { connect } from "react-redux"

@withRouter
@connect(
    null,
    { userInfo }
)
class AuthRoute extends Component{
    componentDidMount() {
        const publicPaths = ['/login', '/register']
        const nowPath = this.props.location.pathname
        if (publicPaths.indexOf(nowPath) > -1){
            return null
        }
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200){
                    if (res.data.code === 0){
                        // 有登陆信息
                        this.props.userInfo(res.data.data)
                    }else {
                        this.props.history.push('/login')
                    }
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        return null
    }
}

export default AuthRoute