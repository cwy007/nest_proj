# dockerfile 多阶段构建语法
#
# 1 build stage
FROM node:20-alpine3.19 as build-stage

WORKDIR /app

# docker 是分层存储的，dockerfile 里的每一行指令是一层，会做缓存。
# 每次 docker build 的时候，只会从变化的层开始重新构建，没变的层会直接复用。
# 也就说现在这种写法，如果 package.json 没变，那么就不会执行 npm install，直接复用之前的。
#
COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# 2 production stage
FROM node:20-alpine3.19 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD [ "node", "/app/main.js" ]

# 提升Dockerfile的5个技巧：
# 1.使用alpine镜像而不是默认的linux镜像
# 2.多阶段构建
# 3.使用 ARG 增加构建的灵活性
# 4.CMD 结合 ENTRYPOINT
# 5.COPY vs ADD
