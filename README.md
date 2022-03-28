# PivotStudio-internship-2022Spring-XuQiao
PivotStudio-internship-2022Spring-XuQiao

### Babel计算器的实现

## 运行方式
./test/index.js 内是测试用例，可以随意写相关的代码，然后打命令`npm run test`执行编译，编译后的文件存放在 ./test/compiled/index.js 中。

目前实现了：
- 两个数低精度下精准的四则运算操作（使用了自定义的方法）；
- 箭头函数编译为普通函数
- let编译为var
- 一些数组方法的polyfill（forEach, fliter, find）

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