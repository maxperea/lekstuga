
exports.movePlayer = (player, movement, distance, bounds) => {
    if (movement.left) moveLeft(player, distance, bounds.left)
    //if (movement.up) moveUp(player, distance, bounds.up)
    if (movement.up) jump(player)
    if (movement.right) moveRight(player, distance, bounds.right)
    //if (movement.down) moveDown(player, distance, bounds.down)
}

exports.gravity = (player, bounds) => {
    if (player.y !== bounds.down || player.yspeed < 0) {
        player.yspeed += 0.1
    } else {
        player.yspeed = -player.yspeed * 0.5
    }
    moveDown(player, player.yspeed, bounds.down)
}

let moveLeft = (player, distance, bound) => {
    if (player.x - distance > bound) {
        player.x -= distance
    } else {
        player.x = bound
    }
}
let moveUp = (player, distance, bound) => {
    if (player.y - distance > bound) {
        player.y -= distance
    } else {
        player.y = bound
    }
}
let moveRight = (player, distance, bound) => {
    if (player.x + distance < bound) {
        player.x += distance
    } else {
        player.x = bound
    }
}
let moveDown = (player, distance, bound) => {
    if (player.y + distance < bound) {
        player.y += distance
    } else {
        player.y = bound
    }
}
let jump = (player) => {
    if (player.y > 595) player.yspeed -= 5
}
