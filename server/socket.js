module.exports = io =>
  io.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    console.log('Connecting to socket', socket.id);
    socket.on('room', function(room) {
      console.log('Client joining room', room);
      socket.join(room);
    });
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left`);
    });
  });
