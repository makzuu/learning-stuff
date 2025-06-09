const canvas = document.querySelector('#sphere')
const ctx = canvas.getContext('2d')

canvas.width = W; canvas.height = H

const radius = 100; const definition = 24

ctx.translate(W/2, H/2)
const sphere = createSphere()
shape = 'sphere'

function frame() {
    window.requestAnimationFrame(frame)
    ctx.clearRect(-W/2, -H/2, W, H)

    drawSphere()
    rotate2d(RX, sphere)
    rotate2d(RY, sphere)
    rotate2d(RZ, sphere)
}
window.requestAnimationFrame(frame)

function createSphere() {
    const sphere = []
    for (let i = 0; i <= definition; i++) {
        sphere[i] = []
        const lat = map(i, 0, definition, 0, PI)
        for (let j = 0; j <= definition; j++) {
            const lon = map(j, 0, definition, 0, PI2)
            sphere[i][j] = { 
                x: radius * sin(lat) * cos(lon),
                y: radius * sin(lat) * sin(lon),
                z: radius * cos(lat)
            }
        }
    }

    return sphere
}

function drawSphere() {
    ctx.beginPath()
    for (let i = 0; i < definition; i++) {
        for (let j = 0; j < definition; j++) {
            ctx.moveTo(sphere[i][j].x, sphere[i][j].y)
            ctx.lineTo(sphere[i+1][j].x, sphere[i+1][j].y)

            ctx.moveTo(sphere[i+1][j].x, sphere[i+1][j].y)
            ctx.lineTo(sphere[i][j+1].x, sphere[i][j+1].y)

            ctx.moveTo(sphere[i][j+1].x, sphere[i][j+1].y)
            ctx.lineTo(sphere[i][j].x, sphere[i][j].y)
        }
    }
    ctx.closePath()
    ctx.strokeStyle = 'lightblue'
    ctx.stroke()
}
