const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

function clearScreen() {
  c.fillStyle = '#181818'
  c.fillRect(0, 0, canvas.width, canvas.height)
}

const GRAVITY = 1
const FRICTION = .6

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    setUp()
})

addEventListener('click', () => {
    setUp()
})

class Ball {
    constructor({ x, y, dx, dy, radius, color }) {
        this.x = x
        this.y = y
        this.dy = dy
        this.dx = dx
        this.radius = radius
        this.color = color
    }

    draw() {
        c.fillStyle = this.color
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.closePath()
        c.fill()
        c.stroke()
    }

    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * FRICTION
        } else {
            this.dy += GRAVITY
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx
        }
        this.x += this.dx
        this.y += this.dy
    }
}

let balls

function setUp() {
    balls = []
    for (let i = 0; i < 400; i++) {
        const radius = randomInt(8, 20)
        balls.push(new Ball({
            x: randomInt(radius, canvas.width - radius),
            y: randomInt(0, canvas.height - radius),
            dx: randomInt(-2, 2),
            dy: randomInt(-2, 2),
            radius,
            color: randomColor(),
        }))
    }
}

setUp()

function draw() {
    requestAnimationFrame(draw)

    clearScreen()
    for (const ball of balls) {
        ball.update()
        ball.draw()
    }
}
requestAnimationFrame(draw)
