function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function random(min, max) {
  return Math.random() * (max - min + 1) + min
}

function randomNotInclusive(min, max) {
    return Math.random() * (max - min) + min
}

function randomAngle() {
    return randomNotInclusive(-Math.PI, 0)
}

function isAlpha(letter) {
    if (letter.length > 1) return false
    return letter >= 'A' && letter <= 'Z' || letter >= 'a' && letter <= 'z'
}

function isInsideCanvas(pos) {
    return pos.x > -canvas.width/2 && pos.x < canvas.width/2 && pos.y > -canvas.height/2 && pos.y < canvas.height/2
}
