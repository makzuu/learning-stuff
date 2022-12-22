function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function randomInt(min, max) {
    return Math.random() * (max - min + 1) + min
}

function randomAngle() {
    return randomInt(0, Math.PI * 2)
}

function isAlpha(letter) {
    if (letter.length > 1) return false
    return letter >= 'A' && letter <= 'Z' || letter >= 'a' && letter <= 'z'
}

function isInsideCanvas(pos) {
    return pos.x > 0 && pos.x < canvas.width && pos.y > 0 && pos.y < canvas.height
}
