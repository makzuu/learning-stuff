const canvas = document.querySelector('#game')
const c = canvas.getContext('2d')

resizeCanvas()

const GAME_STATE = Object.freeze({
    PAUSE: 0,
    GAMEOVER: 2
})
const game = new Game()


let previousTimestamp

function frame(timestamp) {
    window.requestAnimationFrame(frame)
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (previousTimestamp === undefined) previousTimestamp = timestamp

    const dt = (timestamp - previousTimestamp) * 0.001
    previousTimestamp = timestamp

    game.updateState()
    switch (game.state) {
        case GAME_STATE.PAUSE:
        game.draw()
            c.font = '100px Source Code Pro'
            c.fillStyle = '#ccc'
            c.textAlign = 'center'
            c.textBaseline = 'bottom'
            c.fillText('PAUSE', canvas.width / 2, canvas.height / 2) 
        break

        case GAME_STATE.GAMEOVER:
            game.draw()
            c.font = '100px Source Code Pro'
            c.fillStyle = '#ccc'
            c.textAlign = 'center'
            c.textBaseline = 'bottom'
            c.fillText('GAME OVER', canvas.width / 2, canvas.height / 2) 
        break

        default:
        game.draw()
        game.update(dt)
    }
}

window.requestAnimationFrame(frame)
