import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// 自定义参数装饰器
export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc'; // 返回值就是参数的值
  }
)
