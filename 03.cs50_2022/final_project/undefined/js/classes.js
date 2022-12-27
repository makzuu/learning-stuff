class Game {
    constructor() {
        this.player = new Player()
        this.enemies = []
        this.particles = []
        this.state = GAME_STATE.UNDEFINED
        this.enemyCooldown = 1
        this.enemySpawnrate = 1
        this.enemySpawnrateDecrement = 1.01
        this.keyPressed = ''
        this.killedEnemies = 0
        this.keyStrokes = 0
    }

    draw() {
        this.player.draw()
        this.#enemiesDraw()
        this.#particlesDraw()
        display()
    }

    update(dt) {
        this.player.update(this.enemies)
        this.#enemiesUpdate(dt)
        this.#particlesUpdate()
    }

    #enemiesUpdate(dt) {
        if (this.state === GAME_STATE.PLAYING) {
            const enemies = []
            for (const e of this.enemies) {
                if (this.keyPressed === e.letter && isInsideCanvas(e.pos)) {
                    this.killedEnemies++
                    this.#createParticles({ x: e.pos.x, y: e.pos.y })
                    this.keyPressed = ''
                } else {
                    enemies.push(e)
                    e.seek(this.player.pos)
                }
            }
            this.keyPressed = ''
            this.enemies = enemies

            this.enemyCooldown -= dt
            if (this.enemyCooldown <= 0) {
                this.#newEnemy()
                this.enemyCooldown = this.enemySpawnrate
                this.enemySpawnrate /= this.enemySpawnrateDecrement
            }
        }
    }

    #particlesUpdate() {
        if (this.state === GAME_STATE.PLAYING) {
            const particles = []
            for (const p of this.particles) {
                if (p.lifeTime > 0) {
                    particles.push(p)
                    p.update()
                }
            }
            this.particles = particles
        }
    }

    #enemiesDraw() {
        if (this.state !== GAME_STATE.UNDEFINED) {
            for (const e of this.enemies) {
                e.draw()
            }
        }
    }

    #particlesDraw() {
        if (this.state !== GAME_STATE.UNDEFINED) {
            for (const p of this.particles) {
                p.draw()
            }
        }
    }

    #newEnemy() {
        const radians = randomAngle()
        let letter
        if (Math.round(Math.random()) === 0)
            letter = String.fromCharCode(Math.floor(random(65,90)))
        else
            letter = String.fromCharCode(Math.floor(random(97,122)))

        this.enemies.push(new Enemy({
            letter,
            x: Math.cos(radians) * 1000,
            y: Math.sin(radians) * 1000,
        }))
    }

    #createParticles(pos) {
        for (let i = 0; i < 20; i++) {
            this.particles.push(new Particle(pos.x, pos.y))
        }
    }

}

class Player {
    constructor() {
        this.radius = 80
        this.pos = new Vector(0, canvas.height/2 - this.radius * 2)
        this.color = 'red'
    }

    draw() {
        if (game.state !== GAME_STATE.UNDEFINED) {
            c.beginPath()
            c.arc(this.pos.x, this.pos.y, this.radius, Math.PI * 2, false)
            c.closePath()

            c.fillStyle = this.color
            c.fill()
        }
    }

    update(enemies) {
        if (game.state === GAME_STATE.PLAYING) {
            for (const e of enemies) {
                const d = Math.sqrt(Math.pow(e.pos.x - this.pos.x, 2) + Math.pow(e.pos.y - this.pos.y, 2))
                const radiusSum = e.radius + this.radius

                if (d < radiusSum) {
                    game.state = GAME_STATE.GAMEOVER
                }
            }
        }
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
        this.dx = random(-2, 2)
        this.dy = random(-2, 2)
        this.radius = random(2, 5)
        this.lifeTime = random(10, 20)
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
