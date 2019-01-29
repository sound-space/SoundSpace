import createClientSocket from 'socket.io-client';

const clientSocket = createClientSocket(window.location.origin);

clientSocket.on('connect', () => {
  console.log('Connected to sockets on the server!');
//   clientSocket.emit('some-event', payload);
});

export default clientSocket
