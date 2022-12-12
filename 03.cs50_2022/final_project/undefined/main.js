const canvas = document.querySelector('#game')
const c = canvas.getContext('2d')

resizeCanvas()

const player = new Player()
const enemies = []
let particles = []
key = ''

for (let i = 0; i < 10; i++) {
    const radians = randomAngle()
    enemies.push(new Enemy({
        letter: String.fromCharCode(randomNumber(65, 90)),
        x: Math.cos(radians) * 600 + player.pos.x,
        y: Math.sin(radians) * 600 + player.pos.y,
    }))
}


function draw() {
    window.requestAnimationFrame(draw)

    c.clearRect(0, 0, canvas.width, canvas.height)

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
window.requestAnimationFrame(draw)
