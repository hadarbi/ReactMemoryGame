function NameInput({ name, setName, setErrors }) {
    const onChange = (e) => {
        setErrors(prevState => ({ ...prevState, textInput: '' }));
        const value = e.target.value.trim().toLowerCase();
        if (value.length === 0) {
            setErrors(prevState => ({ ...prevState, textInput: 'Name must be filled.' }));
        }
        const isOnlyAlphanumeric = /^[a-zA-Z0-9]+$/.test(value);
        if (!isOnlyAlphanumeric) {
            setErrors(prevState => ({ ...prevState, textInput: 'Name must contain only leters or numbers.' }));
        }

        setName(value);
    }

    return (
        <div className="container pt-3 text-center">
            <form>
                <div className="form-group">
                    <label for="nameInput" className="h4">Your name:</label> <br />
                    <input value={name} onChange={onChange} type="name" class="form-control-lg" id="nameInput" placeholder="Enter name" maxLength="12" />
                </div>
            </form>
        </div >
    );
}

export default NameInput;
