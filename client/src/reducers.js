// 专门合并所有的 reducer 并且返回
import { combineReducers } from "redux"

import { user } from "./redux/user.redux"
import { chatUser } from './redux/chatuser.redux'
import { chat } from "./redux/chat.redux"


export default combineReducers({ user, chatUser, chat })