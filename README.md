# ReduxChat
Redux+React+Express+Socket.io构建实时聊天应用



redux.createStore   创建一个store

Store.getState()          获取状态数据
Store.dispatch( action )  发送一个action
Store.subscribe( listener )  监听store是否发生变化，如果发生变化就调用listener


// jsdom 在nodejs里面跑dom
// react-addons-test-utils 是测试插件
npm install --save-dev jsdom  react-addons-test-utils
