# dockerfile 多阶段构建语法
#
# 1 build stage
FROM node:20-alpine3.19 as build-stage

WORKDIR /app

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
