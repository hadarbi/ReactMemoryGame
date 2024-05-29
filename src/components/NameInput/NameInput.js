import React from 'react';

/**
 * NameInput component renders an input field for the user to enter their name.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The current value of the name input.
 * @param {Function} props.setName - Function to update the name state.
 * @returns {JSX.Element} The rendered name input field.
 */
function NameInput({ name, setName }) {
    /**
     * Handles the change event for the name input field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     */
    const onChange = (e) => {
        const value = e.target.value.trim().toLowerCase();
        setName(value);
    };

    return (
        <div className="container pt-3 text-center">
            <form>
                <div className="form-group">
                    <label htmlFor="nameInput" className="h4">Your name:</label> <br />
                    <input
                        value={name}
                        onChange={onChange}
                        type="text"
                        className="form-control-lg"
                        id="nameInput"
                        placeholder="Enter name"
                        maxLength="12"
                    />
                </div>
            </form>
        </div>
    );
}

export default NameInput;
