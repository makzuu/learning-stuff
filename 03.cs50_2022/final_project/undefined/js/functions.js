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

function display() {
    const fontSize = 48
    c.fillStyle = '#ccc'
    c.textAlign = 'center'
    c.font = `${fontSize}px Source Code Pro`

    switch (game.state) {
        case GAME_STATE.UNDEFINED:
            c.fillText('Press \'Space\' to start the game', 0, 0)
            break

        case GAME_STATE.PLAYING:
            c.fillText(`score: ${game.killedEnemies}`, 0, -canvas.height/2 + fontSize)
            break

        case GAME_STATE.PAUSE:
            c.fillText(`score: ${game.killedEnemies}`, 0, -canvas.height/2 + fontSize)
            c.fillText('Pause', 0, 0)
            break

        case GAME_STATE.GAMEOVER:
            c.fillText(`score: ${game.killedEnemies}`, 0, -canvas.height/2 + fontSize)
            c.fillText('Game Over', 0, 0)
            break
    }
}
