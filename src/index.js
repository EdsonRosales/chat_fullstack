const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//DataBase Connection
mongoose.connect('mongodb://localhost/chat-database')
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));

//Settings del puerto
app.set('port', process.env.PORT || 3000);

//Importamos función de sockets y le damos de parametro "io"
require('./sockets')(io);

//Static files(Archivos que no cambian)
app.use(express.static(path.join(__dirname, 'Public')));

//Starting the server
server.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});