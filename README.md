# vke-mobile

## 项目介绍

本项目是知识猫的手机端产品，第一期的版本是直播版，用来完成英语的图文直播教学。

本项目需要注意以下几点：
* 项目的打包大小<700K；
* 与服务器的请求数据的次数、大小要合适；
* 适配移动端的微信浏览器和系统浏览器，同时也要适配电脑浏览器，做到一些元素的响应式；
* 代码的质量要高，需要有清晰的注释和说明；

## 参考链接
- ESLint
  - ESLint规则：http://eslint.cn/docs/rules/
  - ESLint配置：http://eslint.cn/docs/user-guide/configuring
- JSDOC
  - 官方网站（js代码格式规范）：http://usejsdoc.org/
  - JSODC中文文档：http://www.css88.com/doc/jsdoc/index.html
- 前端样式库文档
  - 微信开发样式库：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455784134
  - Ant Design Mobile样式库：https://mobile.ant.design/index-cn

## 语义化版本号
https://semver.org/lang/zh-CN/

##技术栈
1. Webpack
2. React
3. Router
4. Redux
5. Immutable.js
6. Less

## 项目用到的第三方服务
1. 微信JS-SDK；https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
2. 微信支付；
  - 公众号支付：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1
  - H5支付：https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1
3. WebIM（腾讯云通信），考虑灾备问题，考虑一下其他第三方IM（即时通信）服务，例如网易云信、云巴、阿里云等；https://www.qcloud.com/document/product/269/1594
4. CI（万象优图），考虑灾备问题；https://www.qcloud.com/document/product/275
5. COS（对象存储），考虑灾备问题；https://www.qcloud.com/document/product/436

## 考虑优化代码结构和质量
1. 注重每一段代码编辑的负责人；
2. 更新的日志，函数更新日志，组件更新日志；
3. 增加测试；mocha jest vconsole
4. 配置先行（配置可变的参数）
5. 便于开发调试
6. 单一原则
7. 可扩展性

##项目学习路线：
1. 微信公众号开发；
2. WebIM（云通信）接口的使用；
3. COS（对象存储服务）的使用；
4. CloudImage（万象优图）的使用；
5. 常用的浏览器和时间的工具类；
6. React的使用，组件和纯组件的不同；
7. React Router
8. Redux及Redux tools
9. Immutable.js
10. Less

## 如何创建一个知识猫的前端项目
1. 在码云上创建一个git，然后`git clone 仓储链接`到本地；
2. 编写README.md，也可以增加docs目录用来梳理项目需要的文档；
3. `npm init`初始化项目；
4. 增加`.gitignore`文件，减少非必要的目录和文件上传到git仓储
```
.idea
.vscode
.DS_Store
node_modules
build
package-lock.json
```
5. (非必要，知识猫产品必要)安装eslint来检测代码的格式，`npm install eslint --save-dev`，增加`.eslintrc.json`配置文件
6. (非必要，知识猫产品必要)安装jsdoc自动生成js开发的前端API文档 `npm install --save-dev jsdoc`
7. 安装webpack，`npm install webpack --save-dev`，配置`webpack.conf.js`，详见`docs/webpack3配置`


##目录结构说明：
```
|--dist Webpack打包的最终可部署的文件
|--docs 与项目相关的文档
|--node_modules 项目依赖的第三方模块，依据package.json文件，使用npm install安装和下载
|--src 项目文件夹
|--|--actions
|--|--components 
|--|--config
|--|--constants
|--|--containers
|--|--lang
|--|--plugins
|--|--public
|--|--reducers
|--|--routers
|--|--store
|--|--template
|--|--util
|--|--index.jsx
|--test 与测试相关的输出文件夹
|--.babelrc babel模块的配置文件，用来将ES6编译成浏览器可支持的代码
|--.eslintrc.json ESLint的配置文件， 用来约束和检查代码的编写，提高代码的质量
|--.gitignore git上传忽略的文件夹和文件
|--package-lock.json
|--package.json NPM项目的配置文件
|--README.md
|--webpack.config.js Webpack配置文件
```