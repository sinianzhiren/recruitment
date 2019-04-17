This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### `react router`的四个组件：
1. BrowserRouter, 放于所有的路由最外层
```javascript
<Provider store={ store }>
    <BrowserRouter>
   
   </BrowserRouter>
</Provider>            
```
2. Link 跳转链接，属性 to=url地址
```javascript
<ul>
   <li>
       <Link to='/'>一营</Link>
   </li>
   <li>
       <Link to='erying'>二营</Link>
   </li>
   <li>
       <Link to='qibinglian'>骑兵连</Link>
   </li>
</ul>
```
3. Route是, Link链接，对应每一个需要渲染的组件, 属性，
path=url地址, component=组件名字
```javascript
<Route path='/' component={ App }></Route>
<Route path='/erying' component={ Erying }></Route>
```
4. Redirect, 设置默认的跳转链接，常用于权限验证
属性，to=url地址
```javascript
<Redirect to='/erying'></Redirect>
```
5. Switch, 只渲染一个子组件，命中一个子组件(exact是设置完全匹配)
```javascript
<Switch>
    <Route path='/' exact component={ App }></Route>
    <Route path='/erying' component={ Erying }></Route>
    <Route path='/qibinglian' component={ Qibinglian }></Route>
    <Route path='/:notFound' component={ Test }></Route>
</Switch>
```