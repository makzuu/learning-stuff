function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function randomInt(min, max) {
    return Math.random() * (max - min + 1) + min
}

function randomAngle() {
    return randomInt(Math.PI, Math.PI * 2)
}

function deleteEnemies() {
    const index = enemies.findIndex((e) => { 
        if (key.value === e.letter) {
            key.value = ''
            return true
        }
        return false
    })
    if (index !== -1) {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle({ x: enemies[index].pos.x, y: enemies[index].pos.y }))
        }
        enemies.splice(index, 1)
    }
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

function addEnemy() {
    const radians = randomAngle()
    enemies.push(new Enemy({
        letter: String.fromCharCode(randomInt(65, 90)),
        x: Math.cos(radians) * 1000 + player.pos.x,
        y: Math.sin(radians) * 1000 + player.pos.y,
    }))
}
