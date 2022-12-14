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
    constructor({ x, y }) {
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

