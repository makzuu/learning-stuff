window.addEventListener('resize', () => {
    resizeCanvas()
})

window.addEventListener('keydown', evt => {
    game.keyPressed = evt.key.toUpperCase()
})
