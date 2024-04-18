const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5174',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('user is connected', socket.id)

    socket.on('send_message', (data) => {
        console.log({ data })
    })

})

server.listen(3000, () => {
    console.log('listening on *:3000');
});