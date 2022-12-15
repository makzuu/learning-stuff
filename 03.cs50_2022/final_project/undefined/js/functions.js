function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function randomInt(min, max) {
    return Math.random() * (max - min + 1) + min
}

function randomAngle() {
    return randomInt(Math.PI, Math.PI * 2)
}
