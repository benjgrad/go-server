# syntax=docker/dockerfile:1

FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download


COPY . ./

RUN go build -o /go-server

EXPOSE 8459

CMD [ "/go-server" ]
