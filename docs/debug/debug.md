# debug

然后我们用调试客户端连上它，比如用 Chrome DevTools。

打开 chrome://inspect/，可以看到可以调试的目标：

如果没有，就配置下 network target，加上 localhost:9229

node --inspect-brk /Users/chanweiyan/github/nest_proj/docs/debug/debug.js

yarn start:debug

vscode
stopOnEntry 是在首行断住，和 --inspect-brk 一样的效果。

这里的 runtimeExecutable 代表执行什么命令，args 传参数。

要指定 console 为 integratedTerminal，也就是用 vscode 的内置终端来打印日志，不然默认会用 debug console 跑，那个没有颜色

[专栏文章](https://juejin.cn/book/7226988578700525605/section/7227409511152091191)

有的时候只想打印日志，不想断住，又不想加 console.log 污染代码，这时候可以用 logpoint：
guang: {this}
输入打印的信息，变量用 {} 包裹。

再就是条件断点：

再就是异常断点，可以在没有处理的异常处自动断住：

>nest 项目最方便的调试方式还是在 VSCode 里添加 npm run start:dev 的调试配置。
>此外，我们还理解了 logpoint、条件断点、异常断点等断点类型。
