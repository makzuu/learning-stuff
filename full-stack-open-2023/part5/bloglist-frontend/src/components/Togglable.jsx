import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

    if (visible) {
        return (
            <>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </>
        )
    }

    return (
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
    )

})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
