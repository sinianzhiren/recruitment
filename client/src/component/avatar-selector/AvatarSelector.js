import React, {Component} from 'react'
import {Grid, List} from "antd-mobile"
import PropTypes from 'prop-types'

const avatars = 'girl1,girl2,girl3,girl4,girl5,boy1,boy2,boy3,boy4,boy5,animal1,animal2,animal3,animal4,animal5'.split(',')

class AvatarSelector extends Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)

        this.state = {

        }
    }
    render() {
        const avatarArr = avatars.map(item => ({
            icon: require(`../../images/${item}.png`),
            text: item
        }))

        const selectedAvatar = this.state.icon?
            <div>
                <span>已选择头像</span>
                <img src={ this.state.icon } alt={ this.state.text } style={{ width: 24+'px' }} />
            </div> : '请选择头像'
        return (
            <div>
                <List renderHeader={ () => selectedAvatar }>
                    <Grid
                        data={avatarArr}
                        columnNum={5}
                        onClick={ele => {
                            this.setState(ele)
                            this.props.selectAvatar(ele.text)
                        }
                        }
                    ></Grid>
                </List>
            </div>
        )
    }

}

export default AvatarSelector