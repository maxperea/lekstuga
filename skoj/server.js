// Dependencies
let movement = require('./movement')
let express = require('express')
let http = require('http')
let path = require('path')
let socketIO = require('socket.io')

let app = express()
let server = http.Server(app)
let io = socketIO(server)

let port = 5000
let refreshRate = 1000 / 60

app.set('port', port)
app.use('/static', express.static(__dirname + '/static'))

// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Starts the server.
server.listen(port, () => {
    console.log(`Starting server on ${port}`)
})

// Add the WebSocket handlers

let players = {}
let world = {}
let bounds = {
    left: 10,
    up: 10,
    right: 790,
    down: 590
}
let state = {
    players: players,
    world: world
}


world.box1 = {
    left: 200,
    up: 520,
    right: 250,
    down:570
}

world.box2 = {
    left: 400,
    up: 540,
    right: 450,
    down:600
}



io.on('connection', socket => {
    socket.on('new player', () => {
        players[socket.id] = {
            x:300,
            y:300,
            yspeed: 0,
            xspeed: 0,
            radius: 10,
            onground: true
        }
    })
    socket.on('movement', data => {
        let player = players[socket.id] || {};
        movement.movePlayer(player, data, 5, bounds)
    })
    socket.on('disconnect', function() {
        delete players[socket.id]
    });
})

setInterval(() => {
    for (var i in players) {
        let player = players[i]
        movement.forces(player)
        movement.confine(player, bounds)
        for (var id in world) {
            let item = world[id]
            movement.collisionWThing(player, item)
        }
    }
    io.sockets.emit('state', state)
}, refreshRate)