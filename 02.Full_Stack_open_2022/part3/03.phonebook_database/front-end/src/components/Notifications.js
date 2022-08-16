export const Notification = ({ message }) => {
    if (message === null) return null

    return (
        <div className='notification'>
            {message}
        </div>
    )
}

export const Error = ({ error }) => {
    if (error === null) return null

    return (
        <div className='error'>
            {error}
        </div>
    )
}
