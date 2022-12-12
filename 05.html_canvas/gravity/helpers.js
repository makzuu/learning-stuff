const colors = ['#87CEFA', '#ff7f66', '#9932CC', '#1E90FF', '#8B7B8B']

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor() {
    return colors[randomInt(0, colors.length)]
}
