
# webpack+eslint搭建一个promise场景练习

## Usage

1. npm运行
``` 
npm install
npm run json-server
npm start
```
2. npm运行
``` 
npm install
npm start
```

## Record

* webpack不打包静态资源并且独立出来放到dist指定文件上，两种方法1.CopyWebpackPlugin插件指定，2.在入口文件引用指定路径文件夹（未测试）
* 有.babelrc配置文件,就无须在webpack上配置插件,仅需配好加载器babel-loader即可
* .eslintrc配合vscode或其他编辑工具插件使用，用于代码检测（如：es6）
* 使用json-server模拟后端api，做延时操作

## Optimize

* 代码乱糟糟，需要class管理

## Link

* [webpack配置常用loader加载器](https://www.cnblogs.com/hughes5135/p/6891784.html?utm_source=itdadao&utm_medium=referral) 
* [eslint配置说明](https://www.cnblogs.com/lsgxeva/p/7994474.html) 
* [json-server](https://github.com/typicode/json-server) 
* [bowser代码语法高亮（非官网）](https://c7sky.com/syntax-highlighting-with-prismjs.html) 