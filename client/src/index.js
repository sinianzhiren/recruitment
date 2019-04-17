import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk'
import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import * as serviceWorker from './serviceWorker';

import reducers from './reducers'
import './axiosConf'
import './index.css'

import AuthRoute from './component/authRoute/authRoute'
import Login from "./container/login/login"
import Register from "./container/register/register"
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './component/dashboard/Dashboard'
import Chat from './component/chat/chat'

const windowDevTools = window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

const store = createStore(reducers,
    compose(
        applyMiddleware(thunk),
        windowDevTools
    )
)


ReactDOM.render(
    (
        <Provider store={ store }>
            <BrowserRouter>
                <AuthRoute></AuthRoute>
                <div>
                    <Switch>
                        <Route exact path='/' render={
                            () => (<Redirect to='/login' />)
                        }></Route>
                        <Route path='/bossinfo' component={ BossInfo }></Route>
                        <Route path='/geniusinfo' component={ GeniusInfo }></Route>
                        <Route path='/login' component={ Login }></Route>
                        <Route path='/register' component={ Register }></Route>
                        <Route path='/chat/:user' component={ Chat }></Route>

                        <Route component={ Dashboard }></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

