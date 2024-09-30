# 装饰器

Nest 的功能都是大多通过装饰器来使用的

Nest 提供了一套模块系统，通过 @Module声明模块：

通过 @Controller、@Injectable 分别声明其中的 controller 和 provider：

注入的方式可以是构造器注入：
或者属性注入：
属性注入要指定注入的 token，可能是 class 也可能是 string。

你可以通过 useFactory、useValue 等方式声明 provider：

这时候也需要通过 @Inject 指定注入的 token：

这些注入的依赖如果没有的话，创建对象时会报错。但如果它是可选的，你可以用 @Optional 声明一下，这样没有对应的 provider 也能正常创建这个对象。

如果模块被很多地方都引用，为了方便，可以用 @Global 把它声明为全局的，这样它 exports 的 provider 就可以直接注入了：

filter 是处理抛出的未捕获异常的，通过 @Catch 来指定处理的异常：
然后通过 @UseFilters 应用到 handler 上：
除了 filter 之外，interceptor、guard、pipe 也是这样用：

当然，pipe 更多还是单独在某个参数的位置应用：
<!-- http://localhost:3009/ccc/111？bbb=true -->
这里的 @Query 是取 url 后的 ?bbb=true，而 @Param 是取路径中的参数，比如 /xxx/111 种的 111

此外，如果是 @Post 请求，可以通过 @Body 取到 body 部分：

我们一般用 dto 的 class 来接受请求体里的参数：
nest 会实例化一个 dto 对象：
用 postman 发个 post 请求：

除了 @Get、@Post 外，还可以用 @Put、@Delete、@Patch、@Options、@Head 装饰器分别接受 put、delete、patch、options、head 请求：

handler 和 class 可以通过 @SetMetadata 指定 metadata：
然后在 guard 或者 interceptor 里取出来：

你可以通过 @Headers 装饰器取某个请求头 或者全部请求头：

通过 @Ip 拿到请求的 ip：

通过 @Session 拿到 session 对象：
yarn add express-session
会返回 set-cookie 的响应头，设置了 cookie，包含 sid 也就是 sesssionid。
之后每次请求都会自动带上这个 cookie：
这样就可以在 session 对象里存储信息了。

通过 @Req 或者 @Request 装饰器，这俩是同一个东西：

当然，也可以 @Res 或者 @Response 注入 response 对象，只不过 response 对象有点特殊：
当你注入 response 对象之后，服务器会一直没有响应：
因为这时候 Nest 就不会再把 handler 返回值作为响应内容了。

Nest 这么设计是为了避免你自己返回的响应和 Nest 返回的响应的冲突。
如果你不会自己返回响应，可以通过 passthrough 参数告诉 Nest：

除了注入 @Res 不会返回响应外，注入 @Next 也不会：
当你有两个 handler 来处理同一个路由的时候，可以在第一个 handler 里注入 next，调用它来把请求转发到第二个 handler：

handler 默认返回的是 200 的状态码，你可以通过 @HttpCode 修改它：
当然，你也可以修改 response header，通过 @Header 装饰器：

此外，你还可以通过 @Redirect 装饰器来指定路由重定向的 url：
