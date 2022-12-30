const canvas = document.querySelector('#cube')
const ctx = canvas.getContext('2d')

canvas.width = W; canvas.height = H

ctx.translate(W/2, H/2)

const cube = [
    { x: -50, y: -50, z: 50 },
    { x: 50, y: -50, z: 50 },
    { x: 50, y: 50, z: 50 },
    { x: -50, y: 50, z: 50 },

    { x: -50, y: -50, z: -50 },
    { x: 50, y: -50, z: -50 },
    { x: 50, y: 50, z: -50 },
    { x: -50, y: 50, z: -50 },
]
shape = 'cube'

function frame() {
    window.requestAnimationFrame(frame)
    ctx.clearRect(-W/2, -H/2, W, H)

    drawCube()
    rotate1d(RX, cube)
    rotate1d(RY, cube)
    rotate1d(RZ, cube)
}
window.requestAnimationFrame(frame)

function drawCube() {
    ctx.beginPath()
    let i
    for (i = 0; i < cube.length/2 - 1; i++) {
        ctx.moveTo(cube[i].x, cube[i].y)
        ctx.lineTo(cube[i+1].x, cube[i+1].y)

        ctx.moveTo(cube[i+4].x, cube[i+4].y)
        ctx.lineTo(cube[i+4+1].x, cube[i+4+1].y)

        ctx.moveTo(cube[i].x, cube[i].y)
        ctx.lineTo(cube[i+4].x, cube[i+4].y)
    }
    ctx.moveTo(cube[i].x, cube[i].y)
    ctx.lineTo(cube[0].x, cube[0].y)

    ctx.moveTo(cube[i+4].x, cube[i+4].y)
    ctx.lineTo(cube[0+4].x, cube[0+4].y)

    ctx.moveTo(cube[i].x, cube[i].y)
    ctx.lineTo(cube[i+4].x, cube[i+4].y)

    ctx.closePath()
    ctx.strokeStyle = 'lightblue'
    ctx.stroke()
}
