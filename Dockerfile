FROM node:18-alpine3.16

RUN mkdir src

WORKDIR /src

COPY . .

RUN npm i
# RUN npm i nodemon -g
# 
CMD node server.js


# ENTRYPOINT [ "executable" ]