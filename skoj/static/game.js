let socket = io()

socket.on('message', data => {
    console.log(data)
})

let movement = {
    left: false,
    up: false,
    right: false,
    down: false
}

document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true
            break
        case 87: // W
            movement.up = true
            break
        case 68: // D
            movement.right = true
            break
        case 83: // S
            movement.down = true
            break
    }
})
document.addEventListener('keyup', event => {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false
            break
        case 87: // W
            movement.up = false
            break
        case 68: // D
            movement.right = false
            break
        case 83: // S
            movement.down = false
            break
    }
})

socket.emit('new player')

setInterval( ()=> {
    socket.emit('movement', movement)
}, 1000 / 60)

let canvas = document.getElementById('canvas')
canvas.width = 800
canvas.height = 600
var context = canvas.getContext('2d')
socket.on('state', state => {
    context.clearRect(0, 0, 800, 600)
    context.fillStyle = 'green'
    for(let id in state.players) {
        let player = state.players[id]
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI)
        context.fill()
    }
    for(let id in state.world) {
        let item = state.world[id]
        context.fillStyle = 'blue'
        context.beginPath();
        context.rect(item.left, item.up, item.right - item.left, item.down - item.up)
        context.fill()
    }
})
