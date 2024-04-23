const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const url = require('url');

const port = 3000;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST',"PATCH","DELETE"]
    }
});

app.use(cors());
app.use(bodyParser.json());

let sql;

const db = new sqlite.Database('./users.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err)
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

// io.on('connection', (socket) => {
//     console.log('user is connected', socket.id)


//     socket.on('join_room',(data)=>{
//         console.log('joining room',data)
//         socket.join(data)
//     })

//     socket.on('send_message', (data) => {
//         socket.broadcast.emit('receive_message',data)
//     })

// })


app.post('/register', (req, res) => {
    try {

        const { name, email, password } = req.body;
        sql = `INSERT INTO users(name,email,password) VALUES(?,?,?)`;
        db.run(sql, [name, email, password], (err) => {

            if (err) {
                return res.json({
                    status: 300,
                    success: false,
                    error: err
                })
            }
            console.log('user created', name, email, password)
        })

    } catch (error) {
        return res.json({
            status: 400,
            success: false
        })
    }
})

app.patch('/users',(req,res)=>{
    console.log(req)
})


app.get('/users', (req, res) => {
    sql = `SELECT id,name,email FROM users`
    try {
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.json({
                    status: 300,
                    success: false,
                    error: err
                })
            }

            if (rows.length < 1) {
                return res.json({
                    status: 300,
                    success: false,
                    error: 'No match'
                })
            }

            return res.json({
                status: 200,
                success: true,
                data: rows
            })

        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
            error: error
        })
    }
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});