# 问题

## @Module({})

装饰器语法是如何实现的？
  作用
    IOC
    DI
    依赖注入

js原生应该并不支持？

nest 中有没有快速查看可用接口地址的命令行方式？在server日志中会打印出来。
有没有类似 rails routes 的方法？

如何查看上传到server的图片信息？

```tsx
// 直接在server打印对应的文件
// files-->
[
  {
    fieldname: 'file1',
    originalname: '5337bc538500e0654ac01fd6bc2f922a (2).jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'uploads/',
    filename: '5bc15181ed4b22b4e7c859c9c36fe54e',
    path: 'uploads/5bc15181ed4b22b4e7c859c9c36fe54e',
    size: 2958948
  },
  {
    fieldname: 'files',
    originalname: '5337bc538500e0654ac01fd6bc2f922a (3).jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'uploads/',
    filename: '2cc237301c93559a960ed7f9c41df5db',
    path: 'uploads/2cc237301c93559a960ed7f9c41df5db',
    size: 2958948
  }
]
```
