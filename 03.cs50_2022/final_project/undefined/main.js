const canvas = document.querySelector('#game')
const c = canvas.getContext('2d')

resizeCanvas()

const player = new Player()
const enemies = []
let particles = []

const key = {
    value: '',
}

let enemy_cooldown = 1
let enemy_spawnrate = 1
const enemy_spawnrate_decrement = 1.01

let previousTimestamp

function frame(timestamp) {
    window.requestAnimationFrame(frame)
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (previousTimestamp === undefined) previousTimestamp = timestamp

    const dt = (timestamp - previousTimestamp) * 0.001
    previousTimestamp = timestamp

    enemy_cooldown -= dt
    if (enemy_cooldown <= 0) {
        addEnemy()
        enemy_cooldown = enemy_spawnrate
        enemy_spawnrate /= enemy_spawnrate_decrement
    }

    player.draw();
    for (enemy of enemies) {
         enemy.draw();
         enemy.seek(player.pos);
    }

    deleteEnemies()
    for (p of particles) {
        p.draw()
        p.update()
    }
    deleteParticles()
}

window.requestAnimationFrame(frame)
