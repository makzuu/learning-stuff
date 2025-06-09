const PersonForm = ({ submitHandler, changeNameHandler, changeNumberHandler, nameState, numberState }) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
            name: <input value={nameState} onChange={changeNameHandler} />
            </div>
            <div>
            number: <input value={numberState} onChange={changeNumberHandler} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
