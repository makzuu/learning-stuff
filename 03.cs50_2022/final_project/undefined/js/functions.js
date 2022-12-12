function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function randomNumber(max, min) {
    return Math.random() * (max - min + 1) + min
}

function randomAngle() {
    return randomNumber(Math.PI * 2, Math.PI)
}

function deleteEnemies() {
    const index = enemies.findIndex((e) => key === e.letter)
    if (index !== -1) {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle({ x: enemies[index].pos.x, y: enemies[index].pos.y }))
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

