const canvas = document.querySelector('#game')
const c = canvas.getContext('2d')

resizeCanvas()

const GAME_STATE = Object.freeze({
    UNDEFINED: 'undefined',
    PAUSE: 'pause',
    PLAYING: 'playing',
    GAMEOVER: 'gameover',
})

let game = new Game()

let previousTimestamp
function frame(timestamp) {
    window.requestAnimationFrame(frame)
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (previousTimestamp === undefined) previousTimestamp = timestamp

    const dt = (timestamp - previousTimestamp) * 0.001
    previousTimestamp = timestamp

    game.update(dt)
    game.draw()
}

window.requestAnimationFrame(frame)
