import { Controller, Get, Header, HostParam, HttpCode, Next, Redirect, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// curl http://127.0.0.1:3009/host/foo
// 这样指定 controller 的生效路径
// controller 除了可以指定某些 path 生效外，还可以指定 host：
// 这时候你会发现只有 host 满足 xx.0.0.1 的时候才会路由到这个 controller。
// host 里的参数就可以通过 @HostParam 取出来：
//
@Controller({ host: ':host.0.0.1', path: 'host' })
export class HostController {
  @Get('foo')
  host(@HostParam('host') host) {
    console.log('host--->', host);
    return host;
  }

  @Get('ccc')
  ccc(@Req() req: Request, @Res() res: Response) {
    console.log('hostname', req.hostname);
    console.log('url', req.url);
    // console.log('res-->', res);
    // return req.hostname;
    res.end('ccc')
  }

  @Get('eee')
  eee(@Next() next: NextFunction) {
    console.log('hangdle1-->eeee')
    next()
    return 'eee1' // Nest 不会处理注入 @Next 的 handler 的返回值。
  }

  @Get('eee')
  eee2() {
    console.log('hangdle2-->eeee')
    return 'eee2'
  }

  @Get('fff')
  @HttpCode(222)
  @Header('aaa', 'bbb')
  fff() {
    return 'fff';
  }

  @Get('juejin')
  @Redirect('https://juejin.cn') // 重定向
  juejin() {
  }

  @Get('juejin2')
  @Redirect()
  juejin2() {
    return {
      url: 'https://juejin.cn', // 重定向
      statusCode: 302
    }
  }
}
