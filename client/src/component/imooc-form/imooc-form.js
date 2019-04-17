import React, { Component } from 'react'

export function imoocForm(Comp) {
    return class WrapperCom extends Component{
        constructor(props){
            super(props)

            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }

        handleChange(key, value){
            this.setState({
                [key]: value
            })
        }

        render() {
            return <Comp state={ this.state } handleChange={ this.handleChange } { ...this.props }></Comp>
        }
    }
}