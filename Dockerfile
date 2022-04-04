FROM node:16-alpine

RUN apk add --no-cache bash git openssh

WORKDIR /usr/src

# EXPOSE 8000

CMD ["yarn", "gatsby", "develop", "-H", "0.0.0.0" ]
