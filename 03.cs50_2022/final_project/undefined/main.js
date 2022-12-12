const canvas = document.querySelector('#game')
const c = canvas.getContext('2d')

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

resizeCanvas()

window.addEventListener('resize', () => {
    resizeCanvas()
})

let key = ''
window.addEventListener('keydown', evt => {
    key = evt.key.toUpperCase()
})

window.addEventListener('keyup', evt => {
    key = evt.key.toUpperCase()
})

class Player {
    constructor() {
        this.radius = 50
        this.x = canvas.width / 2
        this.y = canvas.height / 2 + canvas.height / 3
        this.color = 'red'
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.closePath()

        c.fillStyle = this.color
        c.fill()
    }
}

class Enemy {
    constructor({ letter, x, y }) {
        this.radius = 25
        this.x = x
        this.y = y
        this.fontSize = 30
        this.arcColor = '#ccc'
        this.textColor = '#181818'
        this.textAlign = 'center'
        this.textBaseline = 'middle'
        this.letter = letter
        this.dx = 2
        this.dy = 2
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.closePath()
        c.fillStyle = this.arcColor
        c.fill()

        c.font = `${this.fontSize}px Source Code Pro`
        c.fillStyle = this.textColor
        c.textAlign = this.textAlign
        c.textBaseline = this.textBaseline
        c.fillText(this.letter, this.x, this.y) 
    }

    update() {
        if (this.x !== player.x || this.y !== player.y) {
            if (this.x > player.x) {
                this.x -= this.dx
            }
            if (this.x < player.x) {
                this.x += this.dx
            }
            if (this.y > player.y) {
                this.y -= this.dy
            }
            if (this.y < player.y) {
                this.y += this.dy
            }
        }

        // let v = add({ x: this.x, y: this.y }, { x: player.x, y: player.y })
        // console.log(v)
        // v = scale(v, 0.2)

        // console.log(v)

        // this.x = v.x
        // this.y = v.y
    }
}

function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y }
}

function scale(a, scalar) {
    return { x: a.x * scalar, y: a.y * scalar }
}

class Particle {
    constructor({ x, y }) {
        this.x = x
        this.y = y
        this.dx = Math.random() * (2 - (-2) + 1) + (-2)
        this.dy = Math.random() * (2 - (-2) + 1) + (-2)
        this.radius = Math.random() * (3 - 2 + 1) + 2
        this.lifeTime = Math.random() * (20 - 10 + 1) + 10
        this.ticks = 0
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.closePath()
        c.fillStyle = '#ccc'
        c.fill()
    }

    update() {
        this.x += this.dx
        this.y += this.dy
        this.ticks++
        if (this.ticks % 3 === 0) this.lifeTime--
    }
}

// test
function randomNumber(max, min) {
    return Math.random() * (max - min) + min
}

function randomAngle() {
    return randomNumber(Math.PI * 2, Math.PI)
}

const player = new Player()
const enemies = []

for (let i = 0; i < 10; i++) {
    const radians = randomAngle()
    enemies.push(new Enemy({
        letter: String.fromCharCode(randomNumber(65, 90)),
        x: Math.cos(radians) * 600 + player.x,
        y: Math.sin(radians) * 600 + player.y,
    }))
}

let particles = []

function draw() {
    window.requestAnimationFrame(draw)

    c.clearRect(0, 0, canvas.width, canvas.height)

    player.draw();
    for (enemy of enemies) {
         enemy.draw();
         enemy.update();
    }

    deleteEnemies()
    for (p of particles) {
        p.draw()
        p.update()
    }
    deleteParticles()
    return
}
draw()

function deleteEnemies() {
    const index = enemies.findIndex((e) => key === e.letter)
    if (index !== -1) {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle({ x: enemies[index].x, y: enemies[index].y }))
        }
        enemies.splice(index, 1)
    }
    key = ''
}

function deleteParticles() {
    const newParticles = []
    for (p of particles) {
        if (p.lifeTime > 0) {
            newParticles.push(p)
        }
    }
    particles = newParticles
}
