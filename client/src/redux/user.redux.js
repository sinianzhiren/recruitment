import axios from 'axios'
import { getRedirectPath } from '../utils'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

// reducer
export function user(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payLoad), ...action.payLoad }
        case LOAD_DATA:
            return { ...state, ...action.payLoad }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        case LOGOUT:
            return { ...initState, redirectTo: action.redirectTo }
        default:
            return state
    }
}

export function initData() {
    return async () => {
        await axios.get('/user/logout')
    }
}

export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !repeatpwd){
        return errorMsg('用户名和密码必须输入')
    }
    if (pwd !== repeatpwd){
        return errorMsg('两次输出的密码不一致')
    }

    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(errorMsg(error))
            })
    }
}

export function login({ user, pwd }) {
    if (!user || !pwd){
        return errorMsg("用户名和密码必须输入")
    }

    return dispatch => {
        axios.post('/user/login', { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(errorMsg(err))
            })
    }
}

export function userInfo(userInfo) {
    return { type: LOAD_DATA, payLoad: userInfo }
}

export function update(userInfo) {
    return dispatch => {
        axios.post('/user/update', userInfo)
            .then(res => {
                if (res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess({...res.data.data, ...userInfo }))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch(error => {
                dispatch(errorMsg(error))
            })
    }
}

export function logoutSubmit() {
    return { type: LOGOUT, redirectTo: '' }
}

// action
function authSuccess(data) {
    return { type: AUTH_SUCCESS, payLoad: data }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}



