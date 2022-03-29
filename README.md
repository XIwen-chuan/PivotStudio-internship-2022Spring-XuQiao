# PivotStudio-internship-2022Spring-XuQiao
PivotStudio-internship-2022Spring-XuQiao

### Babel计算器的实现

## 运行方式
`./test/index.js` 内是测试用例，可以随意写相关的代码，然后打命令`npm run test`执行编译，编译后的文件存放在`./test/compiled/index.js `中。

## 主要功能
- 两个数低精度下精准的四则运算操作。（自定义方法，重复计算时只声明一次自定义方法）
- 箭头函数编译为普通函数（考虑了`this`的情形，方案是在箭头函数所在的作用域中声明`var _this = this`，箭头函数内部的`this`用`_this`代替）
- let编译为var。（使用匿名自执行函数来模拟块级作用域，特殊的for循环内的小括号里由`let`声明的变量编译后为了防止重名，会将其及其在内部的引用全部改名）
- 一些数组方法的polyfill（`forEach`、`find`、`filter`）

## 文件结构
```
---node_modules
|
|
---src:其中的index.js为插件源码
|
|
---test:放置测试用例和编译后的结果
|
|
---babel.config.json: babel配置文件
|
|
---package.json
|
|
---DailyReport.md: 日志
|
|
...
```