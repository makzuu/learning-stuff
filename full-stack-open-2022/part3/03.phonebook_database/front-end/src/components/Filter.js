const Filter = ({ inputValue, onChange }) => {
    return (
        <>
            filter shown with 
            <input value={inputValue} onChange={onChange} />
        </>
    )
}

export default Filter
