const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


http.listen(3000, () => {
  console.log('listening on *:3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });



io.emit('connection', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets


io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});