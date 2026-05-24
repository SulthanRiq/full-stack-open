const PersonForm = ({ onSubmit, value, onChange }) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={value.newName} onChange={onChange.handleAddName} />
                </div>
                <div>
                    number: <input value={value.newNumber} onChange={onChange.handleAddNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm