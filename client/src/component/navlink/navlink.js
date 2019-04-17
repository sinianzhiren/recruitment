import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from "antd-mobile"
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"

const TabItem = TabBar.Item

@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends Component{
static propTypes = {
    data: PropTypes.array.isRequired
}

constructor(props){
    super(props)

    this.unRead = 0
}
componentDidMount() {

}

    render() {
    const navList = this.props.data.filter(item => !item.hide )
    const pathname = this.props.location.pathname
        return (
            <TabBar>
                { navList.map(it => (
                    <TabItem
                        badge={ it.path === '/msg'? this.props.unRead : 0 }
                        key={ it.path }
                        title={ it.title }
                        icon={{ uri: require(`./tabIcon/${ it.icon }.png`) }}
                        selectedIcon={{ uri: require(`./tabIcon/${ it.icon }-active.png`) }}
                        selected={ it.path === pathname }
                        onPress={
                            () => this.props.history.push(it.path)
                        }
                    ></TabItem>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar