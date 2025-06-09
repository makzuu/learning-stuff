function alert(placeholder, addEventTo, msg) {
    addEventTo.addEventListener('click', () => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = `<div class="alert alert-dark alert-dismissible" role="alert">${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`

        placeholder.append(wrapper)
    })
}

if (shape === 'cube') {
    const target = document.querySelector('#cube')
    const bootstrapMagicPlaceHolder = document.querySelector('#bootstrap-magic-placeholder')

    alert(bootstrapMagicPlaceHolder, target, "I'm Mr.Cube. Look at me!")
}

if (shape === 'sphere') {
    const target = document.querySelector('#sphere')
    const bootstrapMagicPlaceHolder = document.querySelector('#bootstrap-magic-placeholder')

    alert(bootstrapMagicPlaceHolder, target, "I'm Mr.Sphere. Look at me!")
}
