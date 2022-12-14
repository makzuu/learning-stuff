window.addEventListener('resize', () => {
    resizeCanvas()
})

window.addEventListener('keydown', evt => {
    key.value = evt.key.toUpperCase()
})
