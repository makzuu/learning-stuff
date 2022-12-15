class Game {
    constructor() {
        this.player = new Player()
        this.enemies = []
        this.particles = []
        this.state = '' 
        this.keyPressed = ''

        this.enemyCooldown = 1
        this.enemySpawnrate = 1
        this.enemySpawrateDecrement = 1.01
    }

    draw() {
        this.player.draw()
        this.#enemiesDraw()
        this.#particlesDraw()
    }

    update(dt) {
        this.player.update()
        this.#enemiesUpdate(dt)
        this.#particlesUpdate()
    }

    updateState() {
        if (this.keyPressed === 'ESCAPE') {
            this.keyPressed = ''
            if (this.state === GAME_STATE.PAUSE) {
                this.state = ''
            } else {
                this.state = GAME_STATE.PAUSE
            }
        }
    }

    #newEnemy() {
        const radians = randomAngle()
        this.enemies.push(new Enemy({
            letter: String.fromCharCode(randomInt(65, 90)),
            x: Math.cos(radians) * 1000 + this.player.pos.x,
            y: Math.sin(radians) * 1000 + this.player.pos.y,
        }))
    }

    #createParticles(pos) {
        for (let i = 0; i < 20; i++) {
            this.particles.push(new Particle(pos.x, pos.y))
        }
    }

    #enemiesUpdate(dt) {
        const enemies = []
        for (const e of this.enemies) {
            if (this.keyPressed === e.letter && e.pos.x > 0 && e.pos.x < canvas.width && e.pos.y > 0 && e.pos.y < canvas.height) {
                this.keyPressed = ''
                this.#createParticles({ x: e.pos.x, y: e.pos.y })
            } else {
                enemies.push(e)
                e.seek(this.player.pos)
            }
        }
        this.enemies = enemies

        this.enemyCooldown -= dt
        if (this.enemyCooldown <= 0) {
            this.#newEnemy()
            this.enemyCooldown = this.enemySpawnrate
            this.enemySpawnrate /= this.enemySpawrateDecrement
        }
    }

    #particlesUpdate() {
        const particles = []
        for (const p of this.particles) {
            if (p.lifeTime > 0) {
                particles.push(p)
                p.update()
            }
        }
        this.particles = particles
    }

    #enemiesDraw() {
        for (const e of this.enemies) {
            e.draw()
        }
    }

    #particlesDraw() {
        for (const p of this.particles) {
            p.draw()
        }
    }

}

class Player {
    constructor() {
        this.radius = 50
        this.pos = new Vector(canvas.width / 2, canvas.height / 2)
        this.color = 'red'
    }

    draw() {
        c.beginPath()
        c.arc(this.pos.x, this.pos.y, this.radius, Math.PI * 2, false)
        c.closePath()

        c.fillStyle = this.color
        c.fill()
    }

    update() {
        // todo: collision detection
    }
}

class Enemy {
    constructor({ letter, x, y }) {
        this.radius = 25
        this.pos = new Vector(x, y)
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
        c.arc(this.pos.x, this.pos.y, this.radius, Math.PI * 2, false)
        c.closePath()
        c.fillStyle = this.arcColor
        c.fill()

        c.font = `${this.fontSize}px Source Code Pro`
        c.fillStyle = this.textColor
        c.textAlign = this.textAlign
        c.textBaseline = this.textBaseline
        c.fillText(this.letter, this.pos.x, this.pos.y) 
    }

    seek(v) {
        const velocity = Vector.sub(v, this.pos)
        velocity.normalize()
        velocity.scale(2)

        this.pos.add(velocity)
    }
}

class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(v) {
        this.x += v.x
        this.y += v.y
    }

    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y)
    }

    scale(scalar) {
        this.x *= scalar
        this.y *= scalar
    }

    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    normalize() {
        const mag = this.magnitude()
        if (mag !== 0) {
            this.x /= mag
            this.y /= mag
        }
    }

}

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.dx = randomInt(-2, 2)
        this.dy = randomInt(-2, 2)
        this.radius = randomInt(2 ,3)
        this.lifeTime = randomInt(10, 20)
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

