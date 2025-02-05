const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

let members = []

const app = express()
const httpServer = createServer(app)

let io = new Server(httpServer, {
  // 允许跨域访问
  cors: {
    origin: '*',
  },
})

// 建立连接
io.on('connection', (socket) => {
  const { query } = socket.handshake
  // 获取socket连接参数 username和room
  const { username, room, userId } = query
  // 连接管理
  const user = { userId, username }
  members.push(user)
  // 房间管理
  socket.join(room)
  // 每次连接向房间发送用户列表
  io.to(room).emit('userList', members)

  // 断开链接
  socket.on('disconnect', () => {
    members = members.filter((m) => m.userId !== user.userId)
    // 断开连接发送用户列表
    io.to(room).emit('userList', members)
  })
})

io.listen(3333)
