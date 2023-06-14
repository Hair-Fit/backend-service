# FROM node:18-alpine3.16
# tfjs cannot use alpine sadly :(

FROM node:18

# RUN mkdir src

# WORKDIR /src

# COPY package.json .
COPY . .

RUN npm install
# RUN node initMLModel.js
# RUN npm i nodemon -g
# 
EXPOSE 5000
CMD node server.js


# ENTRYPOINT [ "executable" ]