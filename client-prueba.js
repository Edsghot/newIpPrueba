const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
  query: { username: 'Erick' }
});

socket.on('connect', () => {
  console.log('webSocket conectado');
  
  socket.emit('sendMessage', 'Hola como estas newIp');
});

socket.on('newMessage', (message) => {
  console.log('mensaje recibido:', message);
});

socket.on('errorMessage', (error) => {
  console.log('Error al recibir:', error);
});
