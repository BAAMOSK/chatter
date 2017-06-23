const express = require('express');
const app = express();
const port = 3000;
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const users = [];
const connections = [];

server.listen(process.env.PORT || port, () => console.log(`Running server on port ${port}`));

app.get('/', (req, res) => {
  console.log('File is sending');
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', socket => {
  connections.push(socket);
  console.log(`Connected: %s sockets connected ${connections.length}`);

  socket.on('disconnect', data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: %s sockets connected ${connections.length}`);
  });

  //data is what gets passed to client
  socket.on('send message', data => {
    io.sockets.emit('new message', {msg: data});
  });
});