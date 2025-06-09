const W = 200; const H = 200
const aX = 0.001; const aY = 0.002; const aZ = 0.003
const PI = Math.PI; const PI2 = Math.PI * 2
let shape = undefined

const RX = [
    [ 1, 0, 0 ],
    [ 0, cos(aX), -sin(aX) ],
    [ 0, sin(aX), cos(aX) ],
]

const RY = [
    [ cos(aY), 0, sin(aY) ],
    [ 0, 1, 0 ],
    [ -sin(aY), 0, cos(aY) ],
]

const RZ = [
    [ cos(aZ), -sin(aZ), 0 ],
    [ sin(aZ), cos(aZ), 0 ],
    [ 0, 0, 1 ],
]


function rotate1d(rm, shape) {
    for (let i = 0; i < shape.length; i++) {
        shape[i] = mMul(shape[i], rm)
    }
}

function rotate2d(rm, shape) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape.length; j++) {
            shape[i][j] = mMul(shape[i][j], rm)
        }
    }
}

function mMul(v, rm) {
    const result = { }; let i = 0;

    result.x = v.x * rm[i][0] + v.y * rm[i][1] + v.z * rm[i++][2]
    result.y = v.x * rm[i][0] + v.y * rm[i][1] + v.z * rm[i++][2]
    result.z = v.x * rm[i][0] + v.y * rm[i][1] + v.z * rm[i++][2]

    return result
}

function cos(angle) {
    return Math.cos(angle)
}

function sin(angle) {
    return Math.sin(angle)
}

function map(n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
}
