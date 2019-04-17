import axios from 'axios'

const USER_LIST = 'USER_LIST'
const initState = {
    userList: []
}

// reducer
export function chatUser(state=initState, action) {
    switch (action.type) {
        case USER_LIST:
            return { ...state, userList: action.payLoad }
        default:
            return state
    }
}

function userList(data) {
    return { type: USER_LIST, payLoad: data }
}

export function getUserTypeList(type) {
    return dispatch => {
        axios.get('/user/list?type='+type)
            .then(res => {
                if (res.status === 200 && res.data.code === 0){
                    dispatch(userList(res.data.data))
                }
            })
    }
}

