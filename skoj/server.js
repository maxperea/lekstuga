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

/*
world.box1 = {
    left: 0,
    up: 550,
    right: 450,
    down:600
}

world.box2 = {
    left: 550,
    up: 550,
    right: 800,
    down:600
}
*/

let counter = 0
let speed = -0.2

let makeRow = () => {
    x = Math.floor(Math.random()*700)
    world[counter] = {
        left: 0,
        up: 600,
        right: x,
        down: 650
    }
    counter++
    world[counter] = {
        left: x + 100,
        up: 600,
        right: 800,
        down: 650
    }
    counter++
}



io.on('connection', socket => {
    socket.on('new player', () => {
        players[socket.id] = {
            x:300,
            y:300,
            yspeed: 0,
            xspeed: 0,
            radius: 10,
            onground: false,
            score: 0,
            lost: false
        }
        console.log(state.players[socket.id].score)
    })
    socket.on('movement', data => {
        let player = players[socket.id] || {};
        movement.movePlayer(player, data, 5, bounds)
        socket.emit('score', player.score)
    })
    socket.on('disconnect', function() {
        delete players[socket.id]
    });
})


let trigger = 0

setInterval(() => {
    for (var i in players) {
        let player = players[i]
        movement.checkLoss(player, bounds)
        movement.forces(player)
        movement.confine(player, bounds)
        for (var id in world) {
            let item = world[id]
            movement.collisionWThing(player, item)
        }
    }
    for (var id in world) {
        let item = world[id]
        movement.moveItemUp(speed, item)
    }

    trigger += -speed
    if (trigger > 100) {
        trigger = 0
        makeRow()
        //speed -= 0.05
        for (var id in players) {
            let player = players[id]
            if(!player.lost) {
                player.score -= 100 * speed
            }
        }
    }

    io.sockets.emit('state', state)
}, refreshRate)
