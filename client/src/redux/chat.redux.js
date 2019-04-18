import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://127.0.0.1:4400')
// 消息列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = "MSG_READ"

// 初始化数据
const initState = {
    msgList: [],
    users: {},
    unRead: 0
}

// reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                users: action.payLoad.users,
                msgList: action.payLoad.msgs,
                unRead: action.payLoad.msgs.filter(item => !item.read && item.to === action.payLoad.currentid).length
            }
        case MSG_RECV:
            const n = action.payLoad.msgs.to === action.payLoad.currentid ? 1 : 0
            return {...state, msgList: [...state.msgList, action.payLoad.msgs], unRead: state.unRead + n}
        case MSG_READ:
            const { from, num } = action.payLoad
            return {
                ...state,
                msgList: state.msgList.map(item => ({...item, read: item.from === from? true: item.read })),
                unRead: (state.unRead - num > 0)? state.unRead - num : 0
            }
        default:
            return state
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const currentid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, currentid))
                }
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg', {from, to, msg})
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('broadcast', data => {
            const currentid = getState().user._id
            dispatch(msgRecv(data, currentid))
        })
    }
}

export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/read', {from})
            .then(res => {
                const currentId = getState().user._id
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead({from, currentId, num: res.data.num}))
                }
            })
    }
}

// actions
function msgList(msgs, users, currentid) {
    return {type: MSG_LIST, payLoad: {msgs, users, currentid}}
}

function msgRecv(msgs, currentid) {
    return {type: MSG_RECV, payLoad: {msgs, currentid}}
}

function msgRead({from, currentId, num}) {
    return {type: MSG_READ, payLoad: {from, currentId, num}}
}